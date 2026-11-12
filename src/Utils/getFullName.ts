import type { User } from '@/types/User'

export function getFullName(user: Pick<User, 'firstName' | 'lastName'>): string {
  return `${user.firstName} ${user.lastName}`.trim()
}
