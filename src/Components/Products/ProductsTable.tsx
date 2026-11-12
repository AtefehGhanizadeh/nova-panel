import { useMemo } from 'react'
import styled from 'styled-components'
import { BoxIcon } from '@/assets/Icons/BoxIcon'
import { ProductThumbnail } from '@/Components/Products/ProductThumbnail'
import { useTranslation } from '@/Dictionary/useTranslation'
import { Badge } from '@/Shared/Badge'
import { Table, type TableColumn } from '@/Shared/Table'
import { TableEmptyContent } from '@/Shared/TableEmptyContent'
import type { ApiError } from '@/types/ApiError'
import type { Product } from '@/types/Product'
import { formatPrice } from '@/Utils/formatPrice'
import { getCategoryLabel } from '@/Utils/getCategoryLabel'

const Title = styled.span`
  display: -webkit-box;
  max-width: 520px;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`

const Price = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  white-space: nowrap;
`

interface ProductsTableProps {
  products: readonly Product[]
  isLoading: boolean
  error: ApiError | null
  hasProducts: boolean
  searchQuery: string
  onRetry: () => void
  onClearSearch: () => void
}

export function ProductsTable({
  products,
  isLoading,
  error,
  hasProducts,
  searchQuery,
  onRetry,
  onClearSearch,
}: ProductsTableProps) {
  const { t, language } = useTranslation()

  const columns = useMemo<TableColumn<Product>[]>(
    () => [
      {
        key: 'image',
        header: t.products.columns.image,
        width: '88px',
        render: (product) => <ProductThumbnail src={product.image} alt={product.title} />,
      },
      {
        key: 'title',
        header: t.products.columns.title,
        // Product data comes from the API in English only.
        render: (product) => (
          <Title lang="en" dir="auto">
            {product.title}
          </Title>
        ),
      },
      {
        key: 'price',
        header: t.products.columns.price,
        width: '160px',
        render: (product) => <Price>{formatPrice(product.price, language)}</Price>,
      },
      {
        key: 'category',
        header: t.products.columns.category,
        width: '180px',
        render: (product) => <Badge>{getCategoryLabel(product.category, t)}</Badge>,
      },
    ],
    [t, language],
  )

  return (
    <Table
      caption={t.products.tableCaption}
      columns={columns}
      rows={products}
      getRowKey={(product) => product.id}
      isLoading={isLoading}
      emptyContent={
        <TableEmptyContent
          error={error}
          onRetry={onRetry}
          hasItems={hasProducts}
          searchQuery={searchQuery}
          onClearSearch={onClearSearch}
          emptyIcon={<BoxIcon size={26} />}
          emptyTitle={t.products.emptyTitle}
          emptyDescription={t.products.emptyDescription}
          noResultsTitle={t.products.noResults}
          noResultsHint={t.products.noResultsHint}
        />
      }
    />
  )
}
