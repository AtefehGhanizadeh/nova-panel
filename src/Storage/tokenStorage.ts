import type { AuthSession } from '@/types/Auth'
import { StorageKey } from '@/types/Enums/StorageKey'

function isAuthSession(value: unknown): value is AuthSession {
  return (
    typeof value === 'object' &&
    value !== null &&
    'token' in value &&
    typeof value.token === 'string' &&
    value.token !== '' &&
    'username' in value &&
    typeof value.username === 'string'
  )
}

export const tokenStorage = {
  getSession(): AuthSession | null {
    try {
      const raw = sessionStorage.getItem(StorageKey.Auth)
      if (!raw) return null
      const parsed: unknown = JSON.parse(raw)
      return isAuthSession(parsed) ? parsed : null
    } catch {
      return null
    }
  },

  getToken(): string | null {
    return tokenStorage.getSession()?.token ?? null
  },

  setSession(session: AuthSession): void {
    try {
      sessionStorage.setItem(StorageKey.Auth, JSON.stringify(session))
    } catch {
      // The session still works in memory; it just will not survive a refresh.
    }
  },

  clearSession(): void {
    try {
      sessionStorage.removeItem(StorageKey.Auth)
    } catch {
      // Nothing to clear when storage is unavailable.
    }
  },
}
