import { PlusIcon } from '@/assets/Icons/PlusIcon'
import { useTranslation } from '@/Dictionary/useTranslation'
import { Button } from '@/Shared/Button'
import { SearchInput } from '@/Shared/SearchInput'
import { Toolbar } from '@/Shared/Toolbar'

interface UsersToolbarProps {
  search: string
  onSearchChange: (value: string) => void
  onAddClick: () => void
}

export function UsersToolbar({ search, onSearchChange, onAddClick }: UsersToolbarProps) {
  const { t } = useTranslation()

  return (
    <Toolbar>
      <SearchInput
        value={search}
        onChange={onSearchChange}
        label={t.users.searchLabel}
        placeholder={t.users.searchPlaceholder}
      />
      <Button startIcon={<PlusIcon size={18} />} onClick={onAddClick}>
        {t.users.add}
      </Button>
    </Toolbar>
  )
}
