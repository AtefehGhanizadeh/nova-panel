import { en } from '@/Dictionary/en'
import { fa } from '@/Dictionary/fa'
import { Language } from '@/types/Enums/Language'

type Widen<T> = T extends string
  ? string
  : T extends (...args: infer Args) => string
    ? (...args: Args) => string
    : { readonly [Key in keyof T]: Widen<T[Key]> }

export type Dictionary = Widen<typeof fa>

export const dictionaries: Record<Language, Dictionary> = {
  [Language.Fa]: fa,
  [Language.En]: en,
}
