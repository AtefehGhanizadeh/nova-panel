import { useTranslation } from '@/Dictionary/useTranslation'

export function UsersPage() {
  const { t } = useTranslation()

  return <h1>{t.users.title}</h1>
}
