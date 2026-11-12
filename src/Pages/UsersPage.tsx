import { useEffect, useMemo, useState } from 'react'
import { UsersTable } from '@/Components/Users/UsersTable'
import { UsersToolbar } from '@/Components/Users/UsersToolbar'
import { useTranslation } from '@/Dictionary/useTranslation'
import { UserCreateModal } from '@/Modals/UserCreateModal'
import { useAppDispatch, useAppSelector } from '@/Redux/hooks'
import { fetchUsers } from '@/Redux/slices/usersSlice'
import { Alert } from '@/Shared/Alert'
import { Card } from '@/Shared/Card'
import { Pagination } from '@/Shared/Pagination'
import { RequestStatus } from '@/types/Enums/RequestStatus'
import { filterBySearch } from '@/Utils/filterBySearch'
import { getFullName } from '@/Utils/getFullName'
import { getPageCount, paginate } from '@/Utils/paginate'

const PAGE_SIZE = 10
const SUCCESS_ALERT_MS = 4000

export function UsersPage() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const users = useAppSelector((state) => state.users.items)
  const listStatus = useAppSelector((state) => state.users.listStatus)
  const listError = useAppSelector((state) => state.users.listError)

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [successAlertKey, setSuccessAlertKey] = useState<number | null>(null)

  useEffect(() => {
    void dispatch(fetchUsers())
  }, [dispatch])

  const filteredUsers = useMemo(
    () => filterBySearch(users, search, (user) => [getFullName(user), user.username, user.email]),
    [users, search],
  )
  const pageCount = getPageCount(filteredUsers.length, PAGE_SIZE)
  const currentPage = Math.min(page, pageCount)
  const visibleUsers = paginate(filteredUsers, currentPage, PAGE_SIZE)
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
    <Card aria-label={t.users.title}>
      <UsersToolbar
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
          {t.users.createSuccess}
        </Alert>
      )}

      <UsersTable
        users={visibleUsers}
        isLoading={isLoading}
        error={listError}
        hasUsers={users.length > 0}
        searchQuery={search}
        onRetry={() => void dispatch(fetchUsers())}
        onClearSearch={() => handleSearchChange('')}
      />

      <Pagination page={currentPage} pageCount={pageCount} onPageChange={setPage} />

      <UserCreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreated={handleCreated}
      />
    </Card>
  )
}
