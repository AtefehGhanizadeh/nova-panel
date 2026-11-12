import { Form, Formik, type FormikHelpers } from 'formik'
import { useMemo } from 'react'
import styled from 'styled-components'
import { useTranslation } from '@/Dictionary/useTranslation'
import { Alert } from '@/Shared/Alert'
import { Button } from '@/Shared/Button'
import { FormField } from '@/Shared/FormField'
import { ModalFooter } from '@/Shared/Modal.styles'
import type { UserFormValues } from '@/types/User'
import { createUserSchema } from '@/Validations/userSchema'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.lg};
`

const SubmitError = styled.div`
  margin-block-start: ${({ theme }) => theme.space.lg};
`

const INITIAL_VALUES: UserFormValues = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  phone: '',
}

interface UserFormProps {
  
  submitError: string | null
  onSubmit: (values: UserFormValues, helpers: FormikHelpers<UserFormValues>) => Promise<void>
  onCancel: () => void
}

export function UserForm({ submitError, onSubmit, onCancel }: UserFormProps) {
  const { t } = useTranslation()
  const labels = t.forms.user
  const validationSchema = useMemo(() => createUserSchema(t.validation), [t])

  return (
    <Formik initialValues={INITIAL_VALUES} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form noValidate>
          <Grid>
            <FormField
              name="firstName"
              label={labels.firstName}
              placeholder={labels.firstNamePlaceholder}
              autoComplete="given-name"
              required
            />
            <FormField
              name="lastName"
              label={labels.lastName}
              placeholder={labels.lastNamePlaceholder}
              autoComplete="family-name"
              required
            />
            <FormField
              name="username"
              dir="ltr"
              label={labels.username}
              placeholder={labels.usernamePlaceholder}
              autoComplete="off"
              required
            />
            <FormField
              name="email"
              type="email"
              inputMode="email"
              dir="ltr"
              label={labels.email}
              placeholder={labels.emailPlaceholder}
              autoComplete="off"
              required
            />
            <FormField
              name="password"
              type="password"
              dir="ltr"
              label={labels.password}
              placeholder={labels.passwordPlaceholder}
              autoComplete="new-password"
              required
            />
            <FormField
              name="phone"
              type="tel"
              inputMode="tel"
              dir="ltr"
              label={labels.phone}
              placeholder={labels.phonePlaceholder}
              autoComplete="off"
              required
            />
          </Grid>

          {submitError && (
            <SubmitError>
              <Alert variant="error">{submitError}</Alert>
            </SubmitError>
          )}

          <ModalFooter>
            <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
              {t.common.cancel}
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              {labels.submit}
            </Button>
          </ModalFooter>
        </Form>
      )}
    </Formik>
  )
}
