import { matchPath, useLocation } from 'react-router'
import styled from 'styled-components'
import { NAV_ITEMS } from '@/Components/Layout/navItems'
import { useTranslation } from '@/Dictionary/useTranslation'
import { useAppSelector } from '@/Redux/hooks'

const Bar = styled.header`
  position: sticky;
  inset-block-start: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.md};
  height: ${({ theme }) => theme.layout.headerHeight};
  padding-inline: ${({ theme }) => theme.space.xxl};
  background: ${({ theme }) => theme.colors.surface};
  border-block-end: 1px solid ${({ theme }) => theme.colors.border};
`

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`

const Welcome = styled.p`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.textMuted};
`

export function Header() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const username = useAppSelector((state) => state.auth.username) ?? ''
  const currentItem = NAV_ITEMS.find((item) => matchPath(item.path, pathname))

  return (
    <Bar>
      <Welcome>{t.layout.welcome(username)}</Welcome>
      <PageTitle>
        {currentItem ? t.layout.nav[currentItem.labelKey] : t.common.adminPanel}
      </PageTitle>
    </Bar>
  )
}
