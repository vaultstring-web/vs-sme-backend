import 'dotenv/config'
import tls from 'node:tls'
import fs from 'node:fs'
import path from 'node:path'

function wrap64(s: string) {
  return s.replace(/(.{64})/g, '$1\n').trim()
}

function certToPem(raw: Buffer) {
  const b64 = raw.toString('base64')
  return `-----BEGIN CERTIFICATE-----\n${wrap64(b64)}\n-----END CERTIFICATE-----\n`
}

type PeerCert = tls.PeerCertificate & { issuerCertificate?: any; raw?: Buffer }

function getChain(cert: PeerCert): PeerCert[] {
  const out: PeerCert[] = []
  const seen = new Set<string>()
  let cur: PeerCert | undefined = cert
  while (cur && cur.raw) {
    const fp = String((cur as any).fingerprint256 || (cur as any).fingerprint || '')
    const key = fp || String(cur.subject?.CN || '') + '|' + String(cur.issuer?.CN || '')
    if (seen.has(key)) break
    seen.add(key)
    out.push(cur)
    const next: PeerCert | undefined = (cur as any).issuerCertificate as PeerCert | undefined
    if (!next || next === cur) break
    cur = next
  }
  return out
}

async function main() {
  const host = process.env.SMTP_HOST
  if (!host) throw new Error('SMTP_HOST is required')

  const port = process.env.SMTP_TLS_CERT_PORT ? Number(process.env.SMTP_TLS_CERT_PORT) : Number(process.env.SMTP_PORT || 465)
  if (!Number.isFinite(port) || port <= 0) throw new Error('Invalid port')

  const servername = process.env.SMTP_TLS_SERVERNAME || host
  const outFile = process.env.SMTP_TLS_CA_FILE || path.resolve(process.cwd(), 'certs', 'smtp-ca.pem')

  const socket = tls.connect({
    host,
    port,
    servername,
    rejectUnauthorized: false,
  })

  await new Promise<void>((resolve, reject) => {
    socket.once('secureConnect', resolve)
    socket.once('error', reject)
  })

  const peer = socket.getPeerCertificate(true) as PeerCert
  if (!peer || !peer.raw) throw new Error('No peer certificate received')

  const chain = getChain(peer)
  const pem = chain.map(c => certToPem(c.raw as Buffer)).join('\n')

  fs.mkdirSync(path.dirname(outFile), { recursive: true })
  fs.writeFileSync(outFile, pem, 'utf8')

  process.stdout.write(`Wrote ${chain.length} certificate(s) to ${outFile}\n`)
  socket.end()
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    const msg = err instanceof Error ? err.message : String(err)
    process.stderr.write(`Fetch SMTP CA failed: ${msg}\n`)
    process.exit(1)
  })
