import type { Location } from 'react-router'
import { DEFAULT_PRIVATE_ROUTE, ROUTES } from '@/Routes/paths'

export interface RedirectState {
  from: string
}

export function createRedirectState(location: Location): RedirectState {
  return { from: `${location.pathname}${location.search}` }
}

export function getRedirectPath(state: unknown): string {
  if (typeof state === 'object' && state !== null && 'from' in state) {
    const { from } = state

    if (typeof from === 'string' && from.startsWith('/') && !from.startsWith(ROUTES.login)) {
      return from
    }
  }
  return DEFAULT_PRIVATE_ROUTE
}
