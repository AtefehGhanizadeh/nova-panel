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

const EndAdornment = styled.span`
  position: absolute;
  inset-inline-end: ${({ theme }) => theme.space.xxs};
  display: inline-flex;
`

const StyledInput = styled.input<{ $hasStartIcon: boolean; $hasEndAdornment: boolean }>`
  ${controlStyles}

  ${({ $hasStartIcon, theme }) =>
    $hasStartIcon &&
    css`
      padding-inline-start: calc(${theme.space.sm} + 28px);
    `}

  ${({ $hasEndAdornment, theme }) =>
    $hasEndAdornment &&
    css`
      padding-inline-end: calc(${theme.space.xs} + 36px);
    `}
`

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  startIcon?: ReactNode
  endAdornment?: ReactNode
}

export function Input({ startIcon, endAdornment, ...rest }: InputProps) {
  return (
    <Wrapper>
      {startIcon && <StartIcon>{startIcon}</StartIcon>}
      <StyledInput
        $hasStartIcon={Boolean(startIcon)}
        $hasEndAdornment={Boolean(endAdornment)}
        {...rest}
      />
      {endAdornment && <EndAdornment>{endAdornment}</EndAdornment>}
    </Wrapper>
  )
}
