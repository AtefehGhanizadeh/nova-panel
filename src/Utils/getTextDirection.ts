import { Language } from '@/types/Enums/Language'

export type TextDirection = 'rtl' | 'ltr'

export function getTextDirection(language: Language): TextDirection {
  return language === Language.Fa ? 'rtl' : 'ltr'
}
