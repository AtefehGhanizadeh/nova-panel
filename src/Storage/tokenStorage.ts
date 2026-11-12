import { cookieStorage } from '@/Storage/cookieStorage'
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
      const raw = cookieStorage.get(StorageKey.Auth)
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
    cookieStorage.set(StorageKey.Auth, JSON.stringify(session))
  },

  clearSession(): void {
    cookieStorage.remove(StorageKey.Auth)
  },
}