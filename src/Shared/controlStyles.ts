import { css } from 'styled-components'

/** Shared look for input, select and textarea; errors are driven by `aria-invalid`. */
export const controlStyles = css`
  width: 100%;
  min-height: 42px;
  padding-block: ${({ theme }) => theme.space.xs};
  padding-inline: ${({ theme }) => theme.space.sm};
  background: ${({ theme }) => theme.colors.inputBg};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.fontSize.md};
  text-align: start;
  transition:
    border-color ${({ theme }) => theme.transition},
    box-shadow ${({ theme }) => theme.transition};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
    opacity: 1;
  }

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.focusRing};
  }

  &[aria-invalid='true'] {
    border-color: ${({ theme }) => theme.colors.danger};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`
