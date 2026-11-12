import type { InputHTMLAttributes, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import { controlStyles } from '@/Shared/controlStyles'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const StartIcon = styled.span`
  position: absolute;
  inset-inline-start: ${({ theme }) => theme.space.sm};
  display: inline-flex;
  color: ${({ theme }) => theme.colors.textMuted};
  pointer-events: none;
`

const EndAdornment = styled.span<{ $dir?: 'ltr' | 'rtl' }>`
  position: absolute;
  right: ${({ $dir }) => ($dir === 'rtl' ? 'auto' : '8px')};
  left: ${({ $dir }) => ($dir === 'rtl' ? '8px' : 'auto')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`

const StyledInput = styled.input<{ $hasStartIcon: boolean; $hasEndAdornment: boolean }>`
  ${controlStyles}

  ${({ $hasStartIcon, theme }) =>
    $hasStartIcon &&
    css`
      padding-inline-start: calc(${theme.space.sm} + 28px);
    `}

    ${({ $hasEndAdornment }) =>
    $hasEndAdornment &&
    css`
      padding-inline-end: 44px;
    `}
`

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  startIcon?: ReactNode
  endAdornment?: ReactNode
   dir?: 'ltr' | 'rtl'
}

export function Input({ startIcon, endAdornment,dir, ...rest }: InputProps) {
  return (
    <Wrapper>
      {startIcon && <StartIcon>{startIcon}</StartIcon>}
      <StyledInput
        dir={dir}
        $hasStartIcon={Boolean(startIcon)}
        $hasEndAdornment={Boolean(endAdornment)}
        {...rest}
      />
      {endAdornment && <EndAdornment $dir={dir}>{endAdornment}</EndAdornment>}
    </Wrapper>
  )
}
