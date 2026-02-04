// src/lib/api.ts
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `/api/proxy${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    });

    const json = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: json.error || json.message || `HTTP ${res.status}`,
      };
    }

    return {
      success: true,
      data: json as T,
      message: json.message,
    };
  } catch (err) {
    console.error('[apiFetch]', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Network error',
    };
  }
}

// ─────────────────────────────────────────────
// Specific typed helpers
// ─────────────────────────────────────────────

export type UserProfile = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  role: 'applicant' | 'admin' | 'staff';
  createdAt?: string;
  // add more fields when backend is ready
};

export const profileApi = {
  async getProfile(): Promise<ApiResponse<UserProfile>> {
    return apiFetch<UserProfile>('/profile', { method: 'GET' });
  },

  async updateProfile(data: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    return apiFetch<UserProfile>('/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },
};