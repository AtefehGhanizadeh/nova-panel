import type { Language } from '@/types/Enums/Language'

export function formatNumber(value: number, language: Language): string {
  return new Intl.NumberFormat(language).format(value)
}
