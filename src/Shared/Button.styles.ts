import styled, { css } from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface StyledButtonProps {
  $variant: ButtonVariant
  $size: ButtonSize
  $fullWidth: boolean
  $iconOnly: boolean
}

const sizeStyles = {
  sm: css`
    height: 32px;
    padding-inline: ${({ theme }) => theme.space.sm};
    font-size: ${({ theme }) => theme.fontSize.sm};
  `,
  md: css`
    height: 40px;
    padding-inline: ${({ theme }) => theme.space.md};
    font-size: ${({ theme }) => theme.fontSize.md};
  `,
  lg: css`
    height: 46px;
    padding-inline: ${({ theme }) => theme.space.xl};
    font-size: ${({ theme }) => theme.fontSize.lg};
  `,
}

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.primaryButtonBg};
    color: ${({ theme }) => theme.colors.onPrimary};
    border-color: transparent;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primaryButtonHover};
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.border};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.surfaceHover};
    }
  `,
  ghost: css`
    background: transparent;
    color: inherit;
    border-color: transparent;

    &:hover:not(:disabled) {
      background: rgba(127, 127, 127, 0.14);
    }
  `,
}

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.xs};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  white-space: nowrap;
  transition:
    background-color ${({ theme }) => theme.transition},
    opacity ${({ theme }) => theme.transition};

  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  ${({ $iconOnly }) =>
    $iconOnly &&
    css`
      padding-inline: 0;
      aspect-ratio: 1;
    `}

  &:disabled {
    opacity: 0.65;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`
