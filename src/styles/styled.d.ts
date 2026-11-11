import 'styled-components'
import type { ThemeMode } from '@/types/Enums/ThemeMode'

declare module 'styled-components' {
  export interface DefaultTheme {
    mode: ThemeMode
    colors: {
      sidebarBg: string
      sidebarText: string
      sidebarTextMuted: string
      sidebarHover: string
      sidebarActiveBg: string
      sidebarBorder: string
      primary: string
      primaryButtonBg: string
      primaryButtonHover: string
      onPrimary: string
      accent: string
      bg: string
      surface: string
      surfaceMuted: string
      surfaceHover: string
      border: string
      inputBg: string
      text: string
      textMuted: string
      success: string
      successBg: string
      danger: string
      dangerBg: string
      badgeBg: string
      badgeText: string
      skeleton: string
      overlay: string
      focusRing: string
    }
    space: {
      xxs: string
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      xxl: string
    }
    radius: {
      sm: string
      md: string
      lg: string
      pill: string
    }
    fontSize: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      xxl: string
    }
    fontWeight: {
      regular: number
      medium: number
      semibold: number
      bold: number
    }
    shadow: {
      sm: string
      md: string
      lg: string
    }
    zIndex: {
      header: number
      sidebar: number
      modal: number
    }
    layout: {
      sidebarWidth: string
      headerHeight: string
    }
    transition: string
  }
}
