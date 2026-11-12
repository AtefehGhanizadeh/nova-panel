import { Form, Formik, type FormikHelpers } from 'formik'
import { useMemo } from 'react'
import styled from 'styled-components'
import { ProductImagePreview } from '@/Components/Products/ProductImagePreview'
import { useTranslation } from '@/Dictionary/useTranslation'
import { Alert } from '@/Shared/Alert'
import { Button } from '@/Shared/Button'
import { FormField } from '@/Shared/FormField'
import { ModalFooter } from '@/Shared/Modal.styles'
import type { ProductFormValues } from '@/types/Product'
import { getCategoryLabel } from '@/Utils/getCategoryLabel'
import { createProductSchema } from '@/Validations/productSchema'

const Columns = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: ${({ theme }) => theme.space.xl};
`

const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
`

const SubmitError = styled.div`
  margin-block-start: ${({ theme }) => theme.space.lg};
`

const INITIAL_VALUES: ProductFormValues = {
  title: '',
  description: '',
  price: '',
  category: '',
  image: '',
}

interface ProductFormProps {
  categories: readonly string[]
  isLoadingCategories: boolean
  /** Translated error from the last failed submit, shown above the buttons. */
  submitError: string | null
  onSubmit: (values: ProductFormValues, helpers: FormikHelpers<ProductFormValues>) => Promise<void>
  onCancel: () => void
}

export function ProductForm({
  categories,
  isLoadingCategories,
  submitError,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const { t } = useTranslation()
  const labels = t.forms.product
  const validationSchema = useMemo(
    () => createProductSchema(t.validation, categories),
    [t, categories],
  )
  const categoryOptions = useMemo(
    () => categories.map((category) => ({ value: category, label: getCategoryLabel(category, t) })),
    [categories, t],
  )

  return (
    <Formik initialValues={INITIAL_VALUES} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ values, isSubmitting }) => (
        <Form noValidate>
          <Columns>
            <Fields>
              <FormField
                name="title"
                label={labels.title}
                placeholder={labels.titlePlaceholder}
                required
              />
              <FormField
                name="description"
                control="textarea"
                label={labels.description}
                placeholder={labels.descriptionPlaceholder}
                required
              />
              <FormField
                name="price"
                type="number"
                step="0.01"
                inputMode="decimal"
                dir="ltr"
                label={labels.price}
                placeholder={labels.pricePlaceholder}
                required
              />
              <FormField
                name="category"
                control="select"
                label={labels.category}
                placeholder={isLoadingCategories ? t.common.loading : labels.categoryPlaceholder}
                options={categoryOptions}
                disabled={isLoadingCategories}
                required
              />
              <FormField
                name="image"
                type="url"
                inputMode="url"
                dir="ltr"
                label={labels.image}
                placeholder={labels.imagePlaceholder}
                required
              />
            </Fields>
            <ProductImagePreview url={values.image} />
          </Columns>

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
