import type { Language } from '@/types/Enums/Language'

const PRICE_CURRENCY = 'USD'

export function formatPrice(value: number, language: Language): string {
  return new Intl.NumberFormat(language, {
    style: 'currency',
    currency: PRICE_CURRENCY,
  }).format(value)
}
