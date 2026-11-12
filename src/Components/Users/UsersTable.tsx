import { useMemo } from 'react'
import styled from 'styled-components'
import { UsersIcon } from '@/assets/Icons/UsersIcon'
import { useTranslation } from '@/Dictionary/useTranslation'
import { Table, type TableColumn } from '@/Shared/Table'
import { TableEmptyContent } from '@/Shared/TableEmptyContent'
import type { ApiError } from '@/types/ApiError'
import type { User } from '@/types/User'
import { getFullName } from '@/Utils/getFullName'

const FullName = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  /* The API returns names in lower case. */
  text-transform: capitalize;
`

interface UsersTableProps {
  users: readonly User[]
  isLoading: boolean
  error: ApiError | null
  hasUsers: boolean
  searchQuery: string
  onRetry: () => void
  onClearSearch: () => void
}

export function UsersTable({
  users,
  isLoading,
  error,
  hasUsers,
  searchQuery,
  onRetry,
  onClearSearch,
}: UsersTableProps) {
  const { t } = useTranslation()

  
  const columns = useMemo<TableColumn<User>[]>(
    () => [
      {
        key: 'fullName',
        header: t.users.columns.fullName,
        render: (user) => <FullName dir="auto">{getFullName(user)}</FullName>,
      },
      {
        key: 'username',
        header: t.users.columns.username,
        render: (user) => <bdi dir="ltr">{user.username}</bdi>,
      },
      {
        key: 'email',
        header: t.users.columns.email,
        render: (user) => <bdi dir="ltr">{user.email}</bdi>,
      },
      {
        key: 'phone',
        header: t.users.columns.phone,
        width: '200px',
        render: (user) => <bdi dir="ltr">{user.phone}</bdi>,
      },
    ],
    [t],
  )

  return (
    <Table
      caption={t.users.tableCaption}
      columns={columns}
      rows={users}
      getRowKey={(user) => user.id}
      isLoading={isLoading}
      emptyContent={
        <TableEmptyContent
          error={error}
          onRetry={onRetry}
          hasItems={hasUsers}
          searchQuery={searchQuery}
          onClearSearch={onClearSearch}
          emptyIcon={<UsersIcon size={26} />}
          emptyTitle={t.users.emptyTitle}
          emptyDescription={t.users.emptyDescription}
          noResultsTitle={t.users.noResults}
          noResultsHint={t.users.noResultsHint}
        />
      }
    />
  )
}
