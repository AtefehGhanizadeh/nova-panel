import type { SelectHTMLAttributes } from 'react'
import styled from 'styled-components'
import { controlStyles } from '@/Shared/controlStyles'

export interface SelectOption {
  value: string
  label: string
}

const StyledSelect = styled.select`
  ${controlStyles}
  cursor: pointer;
`

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: readonly SelectOption[]
  /** Rendered as an empty, non-selectable first option. */
  placeholder?: string
}

export function Select({ options, placeholder, ...rest }: SelectProps) {
  return (
    <StyledSelect {...rest}>
      {placeholder !== undefined && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  )
}
