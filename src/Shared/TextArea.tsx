import type { TextareaHTMLAttributes } from 'react'
import styled from 'styled-components'
import { controlStyles } from '@/Shared/controlStyles'

const StyledTextArea = styled.textarea`
  ${controlStyles}
  min-height: 96px;
  resize: vertical;
  line-height: 1.7;
`

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <StyledTextArea rows={4} {...props} />
}
