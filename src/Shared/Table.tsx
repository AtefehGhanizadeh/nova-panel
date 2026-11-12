import type { ReactNode } from 'react'
import { useTranslation } from '@/Dictionary/useTranslation'
import {
  Cell,
  FullWidthCell,
  HeaderCell,
  Row,
  StyledTable,
  TableWrapper,
} from '@/Shared/Table.styles'
import { TableSkeletonRows } from '@/Shared/TableSkeletonRows'
import { VisuallyHidden } from '@/Shared/VisuallyHidden'

export interface TableColumn<RowData> {
  key: string
  header: string
  render: (row: RowData) => ReactNode
  width?: string
}

interface TableProps<RowData> {
  caption: string
  columns: readonly TableColumn<RowData>[]
  rows: readonly RowData[]
  getRowKey: (row: RowData) => string | number
  isLoading?: boolean
  skeletonRowCount?: number
  emptyContent?: ReactNode
}

export function Table<RowData>({
  caption,
  columns,
  rows,
  getRowKey,
  isLoading = false,
  skeletonRowCount = 5,
  emptyContent,
}: TableProps<RowData>) {
  const { t } = useTranslation()
  const showEmpty = !isLoading && rows.length === 0 && emptyContent

  return (
    <TableWrapper>
      <StyledTable aria-busy={isLoading || undefined}>
        <caption>
          <VisuallyHidden>
            {caption}
            {isLoading && ` — ${t.common.loading}`}
          </VisuallyHidden>
        </caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <HeaderCell key={column.key} scope="col" $width={column.width}>
                {column.header}
              </HeaderCell>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <TableSkeletonRows columnCount={columns.length} rowCount={skeletonRowCount} />
          )}
          {showEmpty && (
            <tr>
              <FullWidthCell colSpan={columns.length}>{emptyContent}</FullWidthCell>
            </tr>
          )}
          {!isLoading &&
            rows.map((row) => (
              <Row key={getRowKey(row)}>
                {columns.map((column) => (
                  <Cell key={column.key}>{column.render(row)}</Cell>
                ))}
              </Row>
            ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  )
}
