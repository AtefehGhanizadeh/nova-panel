import { useId } from 'react'
import styled from 'styled-components'
import { SearchIcon } from '@/assets/Icons/SearchIcon'
import { Input } from '@/Shared/Input'
import { VisuallyHidden } from '@/Shared/VisuallyHidden'

const Wrapper = styled.div`
  width: 100%;
  max-width: 360px;
`

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  label: string
  placeholder: string
}

export function SearchInput({ value, onChange, label, placeholder }: SearchInputProps) {
  const id = useId()

  return (
    <Wrapper role="search">
      <VisuallyHidden as="label" htmlFor={id}>
        {label}
      </VisuallyHidden>
      <Input
        id={id}
        type="search"
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        startIcon={<SearchIcon size={18} />}
        onChange={(event) => onChange(event.target.value)}
      />
    </Wrapper>
  )
}
