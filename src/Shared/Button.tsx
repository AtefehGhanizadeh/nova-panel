import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { type ButtonSize, type ButtonVariant, StyledButton } from '@/Shared/Button.styles'
import { Spinner } from '@/Shared/Spinner'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  fullWidth?: boolean
  iconOnly?: boolean
  startIcon?: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  iconOnly = false,
  startIcon,
  type = 'button',
  disabled,
  children,
  ...rest
}: ButtonProps) {
  return (
    <StyledButton
      type={type}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $iconOnly={iconOnly}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...rest}
    >
      {isLoading ? <Spinner size={16} /> : startIcon}
      {children}
    </StyledButton>
  )
}
