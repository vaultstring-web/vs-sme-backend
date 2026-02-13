// test-rate-limit.js
// Run with: node test-rate-limit.js

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const ENDPOINT = '/api/auth/login';

// Dummy credentials – failed attempts count toward the limit
const FAIL_PAYLOAD = {
  email: 'nonexistent@example.com',
  password: 'wrongpassword'
};

// Replace with a real user in your DB to test skipSuccessfulRequests
const SUCCESS_PAYLOAD = {
  email: 'test@example.com',
  password: 'correctpassword'
};

/**
 * Send a login request with a specific client IP (via X-Forwarded-For).
 */
async function sendRequest(clientIp, payload = FAIL_PAYLOAD) {
  try {
    const response = await fetch(`${BASE_URL}${ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Forwarded-For': clientIp,
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => ({}));
    return { status: response.status, data };
  } catch (error) {
    return { status: 0, error: error.message };
  }
}

/**
 * Test 1: Same IP – should be blocked after 10 failed attempts.
 */
async function testSingleIp() {
  console.log('\n🧪 Test 1: Same IP – expect block after 10 failed attempts');
  const ip = '192.168.1.100';

  for (let i = 1; i <= 12; i++) {
    const start = performance.now();
    const result = await sendRequest(ip);
    const duration = (performance.now() - start).toFixed(0);

    if (result.status === 429) {
      console.log(`  ❌ Request ${i}: 429 Too Many Requests (${duration}ms) - BLOCKED`);
      console.log(`     Message: ${result.data.error || JSON.stringify(result.data)}`);
      break;
    } else {
      console.log(`  ✅ Request ${i}: ${result.status} (${duration}ms) - allowed`);
    }

    if (i === 12) {
      console.log('  ⚠️  Never rate limited – check limit or keyGenerator');
    }

    await new Promise(resolve => setTimeout(resolve, 50));
  }
}

/**
 * Test 2: Different IPs – each should have its own counter.
 */
async function testDifferentIps() {
  console.log('\n🧪 Test 2: Different IPs – independent counters');
  const ip1 = '10.0.0.1';
  const ip2 = '10.0.0.2';

  // Exhaust ip1
  console.log(`  IP ${ip1} – sending 10 failed requests ...`);
  for (let i = 0; i < 10; i++) {
    await sendRequest(ip1);
    await new Promise(resolve => setTimeout(resolve, 20));
  }

  const resultIp1 = await sendRequest(ip1);
  console.log(`  IP ${ip1} 11th request: ${resultIp1.status} ${resultIp1.status === 429 ? '✅ blocked' : '❌ NOT blocked'}`);

  const resultIp2 = await sendRequest(ip2);
  console.log(`  IP ${ip2} 1st request: ${resultIp2.status} ${resultIp2.status === 200 ? '✅ allowed' : '❌ NOT allowed'}`);
}

/**
 * Test 3: Successful requests should NOT increase the counter.
 * (Requires a valid user in SUCCESS_PAYLOAD)
 */
async function testSuccessfulSkipped() {
  console.log('\n🧪 Test 3: Successful requests should NOT count');
  const ip = '192.168.1.200';

  // 9 failed requests – should have 1 remaining slot
  console.log(`  Sending 9 failed requests ...`);
  for (let i = 0; i < 9; i++) {
    await sendRequest(ip, FAIL_PAYLOAD);
    await new Promise(resolve => setTimeout(resolve, 20));
  }

  // One successful request – should be allowed and not consume a slot
  console.log(`  Sending 1 successful request ...`);
  const successResult = await sendRequest(ip, SUCCESS_PAYLOAD);
  console.log(`  Successful request: ${successResult.status} ${successResult.status === 200 ? '✅ allowed' : '❌ failed'}`);

  // One more failed request – should now be blocked (10th failed attempt)
  const finalResult = await sendRequest(ip, FAIL_PAYLOAD);
  console.log(`  Final failed request: ${finalResult.status} ${finalResult.status === 429 ? '✅ blocked (counter worked)' : '❌ NOT blocked'}`);
}

async function runAllTests() {
  console.log(`🔍 Testing rate limiter on ${BASE_URL}${ENDPOINT}\n`);

  // Health check
  try {
    const ping = await fetch(`${BASE_URL}/api/_ping`);
    if (ping.ok) console.log('✅ Server is reachable.\n');
    else throw new Error('Ping failed');
  } catch {
    console.error('❌ Cannot reach server. Make sure it is running and BASE_URL is correct.');
    process.exit(1);
  }

  await testSingleIp();
  await testDifferentIps();
  await testSuccessfulSkipped();

  console.log('\n🏁 Rate limit tests finished.');
}

runAllTests().catch(console.error);