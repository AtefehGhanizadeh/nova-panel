import type { ReactNode } from 'react'
import { SearchIcon } from '@/assets/Icons/SearchIcon'
import { useTranslation } from '@/Dictionary/useTranslation'
import { Button } from '@/Shared/Button'
import { EmptyState } from '@/Shared/EmptyState'
import { ErrorState } from '@/Shared/ErrorState'
import type { ApiError } from '@/types/ApiError'

interface TableEmptyContentProps {
  error: ApiError | null
  onRetry: () => void
  hasItems: boolean
  searchQuery: string
  onClearSearch: () => void
  emptyIcon: ReactNode
  emptyTitle: string
  emptyDescription: string
  noResultsTitle: (query: string) => string
  noResultsHint: string
}

export function TableEmptyContent({
  error,
  onRetry,
  hasItems,
  searchQuery,
  onClearSearch,
  emptyIcon,
  emptyTitle,
  emptyDescription,
  noResultsTitle,
  noResultsHint,
}: TableEmptyContentProps) {
  const { t } = useTranslation()

  if (error) {
    return <ErrorState message={t.errors[error.code]} onRetry={onRetry} />
  }

  if (!hasItems) {
    return <EmptyState icon={emptyIcon} title={emptyTitle} description={emptyDescription} />
  }

  return (
    <EmptyState
      icon={<SearchIcon size={26} />}
      title={noResultsTitle(searchQuery.trim())}
      description={noResultsHint}
      action={
        <Button variant="secondary" onClick={onClearSearch}>
          {t.common.clearSearch}
        </Button>
      }
    />
  )
}
