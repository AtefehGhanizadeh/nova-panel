import { Cell, Row, SkeletonBar } from '@/Shared/Table.styles'


const BAR_WIDTHS = ['70%', '45%', '85%', '55%']

interface TableSkeletonRowsProps {
  columnCount: number
  rowCount: number
}

export function TableSkeletonRows({ columnCount, rowCount }: TableSkeletonRowsProps) {
  return (
    <>
      {Array.from({ length: rowCount }, (_, rowIndex) => (
        <Row key={rowIndex} aria-hidden="true">
          {Array.from({ length: columnCount }, (_, columnIndex) => (
            <Cell key={columnIndex}>
              <SkeletonBar
                $width={BAR_WIDTHS[(rowIndex + columnIndex) % BAR_WIDTHS.length] ?? '60%'}
              />
            </Cell>
          ))}
        </Row>
      ))}
    </>
  )
}
