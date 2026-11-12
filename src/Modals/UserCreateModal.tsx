import type { FormikHelpers } from 'formik'
import { useEffect } from 'react'
import { UserForm } from '@/Components/Users/UserForm'
import { useTranslation } from '@/Dictionary/useTranslation'
import { useAppDispatch, useAppSelector } from '@/Redux/hooks'
import { createUser, resetCreateUserState } from '@/Redux/slices/usersSlice'
import { Modal } from '@/Shared/Modal'
import { RequestStatus } from '@/types/Enums/RequestStatus'
import type { UserFormValues } from '@/types/User'

interface UserCreateModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated: () => void
}

export function UserCreateModal({ isOpen, onClose, onCreated }: UserCreateModalProps) {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const createStatus = useAppSelector((state) => state.users.createStatus)
  const createError = useAppSelector((state) => state.users.createError)

  useEffect(() => {
    if (isOpen) dispatch(resetCreateUserState())
  }, [isOpen, dispatch])

  const handleSubmit = async (
    values: UserFormValues,
    { resetForm }: FormikHelpers<UserFormValues>,
  ) => {
    try {
      await dispatch(createUser(values)).unwrap()
      resetForm()
      onCreated()
    } catch {
      // The error is in the store and shown in the form; the values stay for another try.
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      title={t.forms.user.modalTitle}
      onClose={onClose}
      isCloseDisabled={createStatus === RequestStatus.Loading}
      width="720px"
    >
      <UserForm
        submitError={createError ? t.errors[createError.code] : null}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  )
}
