import { useTranslation } from '@/Dictionary/useTranslation'

export function ProductsPage() {
  const { t } = useTranslation()

  return <h1>{t.products.title}</h1>
}
