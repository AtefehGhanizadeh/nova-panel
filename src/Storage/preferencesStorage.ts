import { Language } from '@/types/Enums/Language'
import { StorageKey } from '@/types/Enums/StorageKey'
import { ThemeMode } from '@/types/Enums/ThemeMode'
import { isEnumValue } from '@/Utils/isEnumValue'

const DEFAULT_LANGUAGE = Language.Fa
const DEFAULT_THEME = ThemeMode.Light


function read(key: StorageKey): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function write(key: StorageKey, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Ignored on purpose: the preference simply won't survive a reload.
  }
}

export const preferencesStorage = {
  getLanguage(): Language {
    const value = read(StorageKey.Language)
    return isEnumValue(Language, value) ? value : DEFAULT_LANGUAGE
  },
  setLanguage(language: Language): void {
    write(StorageKey.Language, language)
  },
  getTheme(): ThemeMode {
    const value = read(StorageKey.Theme)
    return isEnumValue(ThemeMode, value) ? value : DEFAULT_THEME
  },
  setTheme(theme: ThemeMode): void {
    write(StorageKey.Theme, theme)
  },
}
