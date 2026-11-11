import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { preferencesStorage } from '@/Storage/preferencesStorage'
import type { Language } from '@/types/Enums/Language'
import { ThemeMode } from '@/types/Enums/ThemeMode'

export interface SettingsState {
  language: Language
  theme: ThemeMode
}

const initialState: SettingsState = {
  language: preferencesStorage.getLanguage(),
  theme: preferencesStorage.getTheme(),
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<Language>) {
      state.language = action.payload
    },
    toggleTheme(state) {
      state.theme = state.theme === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light
    },
  },
})

export const { setLanguage, toggleTheme } = settingsSlice.actions
export default settingsSlice.reducer
