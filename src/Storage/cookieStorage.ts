import type { StorageKey } from '@/types/Enums/StorageKey'

const SAME_SITE = 'Strict'

function getSecureAttribute(): string {
  return window.location.protocol === 'https:' ? '; Secure' : ''
}

export const cookieStorage = {
  get(name: StorageKey): string | null {
    const prefix = `${name}=`
    const cookie = document.cookie.split('; ').find((entry) => entry.startsWith(prefix))
    return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : null
  },

  set(name: StorageKey, value: string): void {
    document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; SameSite=${SAME_SITE}${getSecureAttribute()}`
  },

  remove(name: StorageKey): void {
    document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=${SAME_SITE}${getSecureAttribute()}`
  },
}