import { Form, Formik } from 'formik'
import { useMemo } from 'react'
import styled from 'styled-components'
import { LockIcon } from '@/assets/Icons/LockIcon'
import { UserIcon } from '@/assets/Icons/UserIcon'
import type { Dictionary } from '@/Dictionary'
import { useTranslation } from '@/Dictionary/useTranslation'
import { useAppDispatch, useAppSelector } from '@/Redux/hooks'
import { login } from '@/Redux/slices/authSlice'
import { Alert } from '@/Shared/Alert'
import { Button } from '@/Shared/Button'
import { FormField } from '@/Shared/FormField'
import type { ApiError } from '@/types/ApiError'
import type { LoginRequest } from '@/types/Auth'
import { RequestStatus } from '@/types/Enums/RequestStatus'
import { createLoginSchema } from '@/Validations/LoginSchema'

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`

const INITIAL_VALUES: LoginRequest = { username: '', password: '' }
const UNAUTHORIZED_STATUS = 401

function getLoginErrorMessage(error: ApiError, t: Dictionary): string {
  return error.status === UNAUTHORIZED_STATUS ? t.auth.invalidCredentials : t.errors[error.code]
}

export function LoginForm() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const status = useAppSelector((state) => state.auth.status)
  const error = useAppSelector((state) => state.auth.error)
  const validationSchema = useMemo(() => createLoginSchema(t.validation), [t])

  const handleSubmit = async (values: LoginRequest) => {
    await dispatch(login(values))
  }

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <StyledForm noValidate>
          <FormField
            name="username"
            label={t.auth.username}
            placeholder={t.auth.usernamePlaceholder}
            autoComplete="username"
            startIcon={<UserIcon size={18} />}
            disabled={isSubmitting}
            required
          />
          <FormField
            name="password"
            type="password"
            label={t.auth.password}
            placeholder={t.auth.passwordPlaceholder}
            autoComplete="current-password"
            startIcon={<LockIcon size={18} />}
            disabled={isSubmitting}
            required
          />

          {status === RequestStatus.Failed && error && (
            <Alert variant="error">{getLoginErrorMessage(error, t)}</Alert>
          )}

          <Button type="submit" size="lg" fullWidth isLoading={isSubmitting}>
            {t.auth.submit}
          </Button>
        </StyledForm>
      )}
    </Formik>
  )
}
