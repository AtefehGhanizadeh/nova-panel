import styled, { keyframes } from 'styled-components'

export const TableWrapper = styled.div`
  overflow-x: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
`

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.fontSize.md};
`

export const HeaderCell = styled.th<{ $width?: string }>`
  width: ${({ $width }) => $width ?? 'auto'};
  padding-block: ${({ theme }) => theme.space.sm};
  padding-inline: ${({ theme }) => theme.space.md};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  text-align: start;
  white-space: nowrap;
  border-block-end: 1px solid ${({ theme }) => theme.colors.border};
`

export const Row = styled.tr`
  transition: background-color ${({ theme }) => theme.transition};

  &:not(:last-child) > td {
    border-block-end: 1px solid ${({ theme }) => theme.colors.border};
  }

  &:hover > td {
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`

export const Cell = styled.td`
  padding-block: ${({ theme }) => theme.space.sm};
  padding-inline: ${({ theme }) => theme.space.md};
  text-align: start;
  vertical-align: middle;
`

export const FullWidthCell = styled.td`
  padding: 0;
`

const shimmer = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
`

export const SkeletonBar = styled.span<{ $width: string }>`
  display: block;
  width: ${({ $width }) => $width};
  height: 14px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.skeleton};
  animation: ${shimmer} 1.4s ease-in-out infinite;
`
