import type { DefaultTheme } from 'styled-components'
import { ThemeMode } from '@/types/Enums/ThemeMode'

type ThemeTokens = Omit<DefaultTheme, 'mode' | 'colors'>

const tokens: ThemeTokens = {
  space: {
    xxs: '4px',
    xs: '8px',
    sm: '12px',
    md: '16px',
    lg: '20px',
    xl: '24px',
    xxl: '32px',
  },
  radius: {
    sm: '6px',
    md: '8px',
    lg: '12px',
    pill: '999px',
  },
  fontSize: {
    xs: '12px',
    sm: '13px',
    md: '14px',
    lg: '16px',
    xl: '20px',
    xxl: '24px',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  shadow: {
    sm: '0 1px 2px rgba(15, 27, 51, 0.06)',
    md: '0 4px 16px rgba(15, 27, 51, 0.08)',
    lg: '0 24px 48px rgba(15, 27, 51, 0.18)',
  },
  zIndex: {
    header: 10,
    sidebar: 20,
    modal: 1000,
  },
  layout: {
    sidebarWidth: '248px',
    headerHeight: '68px',
  },
  transition: '150ms ease',
}

export const lightTheme: DefaultTheme = {
  ...tokens,
  mode: ThemeMode.Light,
  colors: {
    sidebarBg: '#0F1B33',
    sidebarText: '#E6EAF2',
    sidebarTextMuted: '#A7B0C3',
    sidebarHover: 'rgba(255, 255, 255, 0.06)',
    sidebarActiveBg: '#2563EB',
    sidebarBorder: 'rgba(255, 255, 255, 0.08)',
    primary: '#2563EB',
    primaryButtonBg: '#2563EB',
    primaryButtonHover: '#1D4ED8',
    onPrimary: '#FFFFFF',
    accent: '#F97316',
    bg: '#F5F6FA',
    surface: '#FFFFFF',
    surfaceMuted: '#F8F9FC',
    surfaceHover: '#F3F5FA',
    border: '#E8E8EC',
    inputBg: '#FFFFFF',
    text: '#0F1B33',
    textMuted: '#6B7280',
    success: '#15803D',
    successBg: '#F0FDF4',
    danger: '#DC2626',
    dangerBg: '#FFF7F7',
    badgeBg: '#EEF2FF',
    badgeText: '#1E40AF',
    skeleton: '#ECEEF3',
    overlay: 'rgba(15, 27, 51, 0.55)',
    focusRing: 'rgba(37, 99, 235, 0.45)',
  },
}

export const darkTheme: DefaultTheme = {
  ...tokens,
  mode: ThemeMode.Dark,
  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.3)',
    md: '0 4px 16px rgba(0, 0, 0, 0.35)',
    lg: '0 24px 48px rgba(0, 0, 0, 0.5)',
  },
  colors: {
    sidebarBg: '#0A1222',
    sidebarText: '#E6EAF2',
    sidebarTextMuted: '#9AA4B8',
    sidebarHover: 'rgba(255, 255, 255, 0.05)',
    sidebarActiveBg: '#2563EB',
    sidebarBorder: 'rgba(255, 255, 255, 0.06)',
    primary: '#3B82F6',
    primaryButtonBg: '#2563EB',
    primaryButtonHover: '#1D4ED8',
    onPrimary: '#FFFFFF',
    accent: '#FB8A3C',
    bg: '#0B1220',
    surface: '#131C2E',
    surfaceMuted: '#0F1828',
    surfaceHover: '#1A2540',
    border: '#24304A',
    inputBg: '#0F1828',
    text: '#E6EAF2',
    textMuted: '#9AA4B8',
    success: '#4ADE80',
    successBg: '#12301F',
    danger: '#F87171',
    dangerBg: '#3A1A1F',
    badgeBg: '#1E2A44',
    badgeText: '#BFD3FF',
    skeleton: '#1F2A40',
    overlay: 'rgba(0, 0, 0, 0.65)',
    focusRing: 'rgba(59, 130, 246, 0.6)',
  },
}

export const themes: Record<ThemeMode, DefaultTheme> = {
  [ThemeMode.Light]: lightTheme,
  [ThemeMode.Dark]: darkTheme,
}
