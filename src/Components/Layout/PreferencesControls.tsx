import { useId } from 'react'
import styled from 'styled-components'
import { GlobeIcon } from '@/assets/Icons/GlobeIcon'
import { MoonIcon } from '@/assets/Icons/MoonIcon'
import { SunIcon } from '@/assets/Icons/SunIcon'
import { useTranslation } from '@/Dictionary/useTranslation'
import { useAppDispatch, useAppSelector } from '@/Redux/hooks'
import { setLanguage, toggleTheme } from '@/Redux/slices/settingsSlice'
import { Button } from '@/Shared/Button'
import { VisuallyHidden } from '@/Shared/VisuallyHidden'
import { Language } from '@/types/Enums/Language'
import { ThemeMode } from '@/types/Enums/ThemeMode'
import { isEnumValue } from '@/Utils/isEnumValue'

const Group = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  color: ${({ theme }) => theme.colors.sidebarText};
`

const LanguageField = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
`

const LanguageIcon = styled.span`
  position: absolute;
  inset-inline-start: ${({ theme }) => theme.space.xs};
  display: inline-flex;
  pointer-events: none;
`

const LanguageSelect = styled.select`
  width: 100%;
  height: 36px;
  padding-inline-start: calc(${({ theme }) => theme.space.xs} + 24px);
  padding-inline-end: ${({ theme }) => theme.space.xs};
  background: ${({ theme }) => theme.colors.sidebarHover};
  color: inherit;
  border: 1px solid ${({ theme }) => theme.colors.sidebarBorder};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.fontSize.sm};
  cursor: pointer;

  /* Native dropdown lists use light system colors, so options need explicit colors. */
  option {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surface};
  }
`

const ThemeButton = styled(Button)`
  flex-shrink: 0;
  border-color: ${({ theme }) => theme.colors.sidebarBorder};
`

const LANGUAGE_OPTIONS = [Language.Fa, Language.En]


export function PreferencesControls() {
  const dispatch = useAppDispatch()
  const { t, language } = useTranslation()
  const theme = useAppSelector((state) => state.settings.theme)
  const selectId = useId()
  const isDark = theme === ThemeMode.Dark

  return (
    <Group role="group" aria-label={t.layout.preferences}>
      <LanguageField>
        <VisuallyHidden as="label" htmlFor={selectId}>
          {t.common.languageLabel}
        </VisuallyHidden>
        <LanguageIcon>
          <GlobeIcon size={16} />
        </LanguageIcon>
        <LanguageSelect
          id={selectId}
          value={language}
          onChange={(event) => {
            if (isEnumValue(Language, event.target.value)) {
              dispatch(setLanguage(event.target.value))
            }
          }}
        >
          {LANGUAGE_OPTIONS.map((option) => (
            <option key={option} value={option} lang={option}>
              {t.common.languages[option]}
            </option>
          ))}
        </LanguageSelect>
      </LanguageField>
      <ThemeButton
        variant="ghost"
        iconOnly
        size="sm"
        onClick={() => dispatch(toggleTheme())}
        aria-label={isDark ? t.common.switchToLight : t.common.switchToDark}
      >
        {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
      </ThemeButton>
    </Group>
  )
}
