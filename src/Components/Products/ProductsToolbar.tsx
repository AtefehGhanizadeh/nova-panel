import { PlusIcon } from '@/assets/Icons/PlusIcon'
import { useTranslation } from '@/Dictionary/useTranslation'
import { Button } from '@/Shared/Button'
import { SearchInput } from '@/Shared/SearchInput'
import { Toolbar } from '@/Shared/Toolbar'

interface ProductsToolbarProps {
  search: string
  onSearchChange: (value: string) => void
  onAddClick: () => void
}

export function ProductsToolbar({ search, onSearchChange, onAddClick }: ProductsToolbarProps) {
  const { t } = useTranslation()

  return (
    <Toolbar>
      <SearchInput
        value={search}
        onChange={onSearchChange}
        label={t.products.searchLabel}
        placeholder={t.products.searchPlaceholder}
      />
      <Button startIcon={<PlusIcon size={18} />} onClick={onAddClick}>
        {t.products.add}
      </Button>
    </Toolbar>
  )
}
