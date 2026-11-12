import { useField } from 'formik'
import { type HTMLInputTypeAttribute, type ReactNode, useId, useState } from 'react'
import styled from 'styled-components'
import { EyeIcon } from '@/assets/Icons/EyeIcon'
import { EyeOffIcon } from '@/assets/Icons/EyeOffIcon'
import { useTranslation } from '@/Dictionary/useTranslation'
import { Button } from '@/Shared/Button'
import { Input } from '@/Shared/Input'
import { Select, type SelectOption } from '@/Shared/Select'
import { TextArea } from '@/Shared/TextArea'

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xxs};
  min-width: 0;
`

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
`

const RequiredMark = styled.span`
  margin-inline-start: ${({ theme }) => theme.space.xxs};
  color: ${({ theme }) => theme.colors.danger};
`

const ErrorText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.danger};
`

type FieldControl = 'input' | 'textarea' | 'select'

interface FormFieldProps {
  name: string
  label: string
  control?: FieldControl
  type?: HTMLInputTypeAttribute
  required?: boolean
  placeholder?: string
  autoComplete?: string
  disabled?: boolean
  options?: readonly SelectOption[]
  startIcon?: ReactNode
  dir?: 'ltr' | 'rtl'
  inputMode?: 'text' | 'decimal' | 'email' | 'tel' | 'url'
  step?: string
}

export function FormField({
  name,
  label,
  control = 'input',
  type = 'text',
  required = false,
  options = [],
  startIcon,
  placeholder,
  ...controlProps
}: FormFieldProps) {
  const [field, meta] = useField<string | number>(name)
  const { t } = useTranslation()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const id = useId()
  const errorId = `${id}-error`
  const hasError = Boolean(meta.touched && meta.error)

  const sharedProps = {
    ...field,
    ...controlProps,
    id,
    required,
    'aria-invalid': hasError,
    'aria-describedby': hasError ? errorId : undefined,
  }

  const isPassword = type === 'password'
  const passwordToggle = isPassword && (
    <Button
      variant="ghost"
      size="sm"
      iconOnly
      onClick={() => setIsPasswordVisible((visible) => !visible)}
      aria-label={isPasswordVisible ? t.common.hidePassword : t.common.showPassword}
      aria-pressed={isPasswordVisible}
      disabled={controlProps.disabled}
    >
      {isPasswordVisible ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
    </Button>
  )

  return (
    <Field>
      <Label htmlFor={id}>
        {label}
        {required && <RequiredMark aria-hidden="true">*</RequiredMark>}
      </Label>

      {control === 'textarea' && <TextArea {...sharedProps} placeholder={placeholder} />}
      {control === 'select' && (
        <Select {...sharedProps} options={options} placeholder={placeholder ?? ''} />
      )}
      {control === 'input' && (
        <Input
          {...sharedProps}
          type={isPassword && isPasswordVisible ? 'text' : type}
          placeholder={placeholder}
          startIcon={startIcon}
          endAdornment={passwordToggle || undefined}
        />
      )}

      {hasError && <ErrorText id={errorId}>{meta.error}</ErrorText>}
    </Field>
  )
}
