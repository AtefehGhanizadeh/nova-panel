function requireUrl(name: string, rawValue: string | undefined): string {
  const value = rawValue?.trim()

  if (!value) {
    throw new Error(`Missing environment variable ${name}. Copy .env.example to .env and set it.`)
  }
  if (!URL.canParse(value)) {
    throw new Error(`Environment variable ${name} must be an absolute URL, received "${value}".`)
  }

  return value
}

export const env = {
  apiBaseUrl: requireUrl('VITE_API_BASE_URL', import.meta.env.VITE_API_BASE_URL),
} as const
