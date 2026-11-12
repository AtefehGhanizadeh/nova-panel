import styled from 'styled-components'
import { ChevronLeftIcon } from '@/assets/Icons/ChevronLeftIcon'
import { ChevronRightIcon } from '@/assets/Icons/ChevronRightIcon'
import { useTranslation } from '@/Dictionary/useTranslation'
import { Button } from '@/Shared/Button'
import { formatNumber } from '@/Utils/formatNumber'

const Nav = styled.nav`
  display: flex;
  justify-content: center;
`

const List = styled.ul`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xxs};
  margin: 0;
  padding: 0;
  list-style: none;
`

const PageButton = styled(Button)<{ $active: boolean }>`
  min-width: 32px;
  ${({ $active, theme }) =>
    $active &&
    `
      background: ${theme.colors.primaryButtonBg};
      color: ${theme.colors.onPrimary};
      border-color: transparent;

      &:hover:not(:disabled) {
        background: ${theme.colors.primaryButtonHover};
      }
    `}
`

interface PaginationProps {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
}

export function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  const { t, language } = useTranslation()

  if (pageCount <= 1) return null

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1)

  return (
    <Nav aria-label={t.common.pagination.label}>
      <List>
        <li>
          <Button
            variant="secondary"
            size="sm"
            iconOnly
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            aria-label={t.common.pagination.previous}
          >
            <ChevronLeftIcon size={16} />
          </Button>
        </li>
        {pages.map((pageNumber) => (
          <li key={pageNumber}>
            <PageButton
              variant="secondary"
              size="sm"
              $active={pageNumber === page}
              onClick={() => onPageChange(pageNumber)}
              aria-label={t.common.pagination.goToPage(pageNumber)}
              aria-current={pageNumber === page ? 'page' : undefined}
            >
              {formatNumber(pageNumber, language)}
            </PageButton>
          </li>
        ))}
        <li>
          <Button
            variant="secondary"
            size="sm"
            iconOnly
            onClick={() => onPageChange(page + 1)}
            disabled={page === pageCount}
            aria-label={t.common.pagination.next}
          >
            <ChevronRightIcon size={16} />
          </Button>
        </li>
      </List>
    </Nav>
  )
}
