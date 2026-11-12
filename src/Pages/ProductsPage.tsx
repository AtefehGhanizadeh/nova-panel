import { useEffect, useMemo, useState } from 'react'
import { ProductsTable } from '@/Components/Products/ProductsTable'
import { ProductsToolbar } from '@/Components/Products/ProductsToolbar'
import { useTranslation } from '@/Dictionary/useTranslation'
import { ProductCreateModal } from '@/Modals/ProductCreateModal'
import { useAppDispatch, useAppSelector } from '@/Redux/hooks'
import { fetchCategories, fetchProducts } from '@/Redux/slices/productsSlice'
import { Alert } from '@/Shared/Alert'
import { Card } from '@/Shared/Card'
import { Pagination } from '@/Shared/Pagination'
import { RequestStatus } from '@/types/Enums/RequestStatus'
import { filterBySearch } from '@/Utils/filterBySearch'
import { getCategoryLabel } from '@/Utils/getCategoryLabel'
import { getPageCount, paginate } from '@/Utils/paginate'

const PAGE_SIZE = 10
const SUCCESS_ALERT_MS = 4000

export function ProductsPage() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const products = useAppSelector((state) => state.products.items)
  const listStatus = useAppSelector((state) => state.products.listStatus)
  const listError = useAppSelector((state) => state.products.listError)

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  // A new key per success restarts the alert's auto-hide timer.
  const [successAlertKey, setSuccessAlertKey] = useState<number | null>(null)

  useEffect(() => {
    void dispatch(fetchProducts())
    void dispatch(fetchCategories())
  }, [dispatch])

  // The translated category is searchable too, so "زیورآلات" finds jewelery.
  const filteredProducts = useMemo(
    () =>
      filterBySearch(products, search, (product) => [
        product.title,
        product.category,
        getCategoryLabel(product.category, t),
      ]),
    [products, search, t],
  )
  const pageCount = getPageCount(filteredProducts.length, PAGE_SIZE)
  const currentPage = Math.min(page, pageCount)
  const visibleProducts = paginate(filteredProducts, currentPage, PAGE_SIZE)
  const isLoading = listStatus === RequestStatus.Idle || listStatus === RequestStatus.Loading

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const handleCreated = () => {
    setIsCreateOpen(false)
    setPage(1)
    setSuccessAlertKey(Date.now())
  }

  return (
    <Card aria-label={t.products.title}>
      <ProductsToolbar
        search={search}
        onSearchChange={handleSearchChange}
        onAddClick={() => setIsCreateOpen(true)}
      />

      {successAlertKey !== null && (
        <Alert
          key={successAlertKey}
          variant="success"
          autoHideMs={SUCCESS_ALERT_MS}
          onClose={() => setSuccessAlertKey(null)}
        >
          {t.products.createSuccess}
        </Alert>
      )}

      <ProductsTable
        products={visibleProducts}
        isLoading={isLoading}
        error={listError}
        hasProducts={products.length > 0}
        searchQuery={search}
        onRetry={() => void dispatch(fetchProducts())}
        onClearSearch={() => handleSearchChange('')}
      />

      <Pagination page={currentPage} pageCount={pageCount} onPageChange={setPage} />

      <ProductCreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreated={handleCreated}
      />
    </Card>
  )
}
