import type { FormikHelpers } from 'formik'
import { useEffect } from 'react'
import { ProductForm } from '@/Components/Products/ProductForm'
import { useTranslation } from '@/Dictionary/useTranslation'
import { useAppDispatch, useAppSelector } from '@/Redux/hooks'
import {
  createProduct,
  fetchCategories,
  resetCreateProductState,
} from '@/Redux/slices/productsSlice'
import { Modal } from '@/Shared/Modal'
import { RequestStatus } from '@/types/Enums/RequestStatus'
import type { ProductFormValues } from '@/types/Product'

interface ProductCreateModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated: () => void
}

export function ProductCreateModal({ isOpen, onClose, onCreated }: ProductCreateModalProps) {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const categories = useAppSelector((state) => state.products.categories)
  const categoriesStatus = useAppSelector((state) => state.products.categoriesStatus)
  const createStatus = useAppSelector((state) => state.products.createStatus)
  const createError = useAppSelector((state) => state.products.createError)

  // Start every opening with a clean slate, and retry categories if they failed to load
  // (the thunk's condition makes this a no-op once they are loaded).
  useEffect(() => {
    if (!isOpen) return
    dispatch(resetCreateProductState())
    void dispatch(fetchCategories())
  }, [isOpen, dispatch])

  const handleSubmit = async (
    values: ProductFormValues,
    { resetForm }: FormikHelpers<ProductFormValues>,
  ) => {
    try {
      await dispatch(createProduct(values)).unwrap()
      resetForm()
      onCreated()
    } catch {
      // The error is in the store and shown in the form; the values stay for another try.
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      title={t.forms.product.modalTitle}
      onClose={onClose}
      isCloseDisabled={createStatus === RequestStatus.Loading}
      width="840px"
    >
      <ProductForm
        categories={categories}
        isLoadingCategories={categoriesStatus === RequestStatus.Loading}
        submitError={createError ? t.errors[createError.code] : null}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  )
}
