import { NavLink } from 'react-router'
import styled from 'styled-components'

export const Aside = styled.aside`
  position: fixed;
  inset-block: 0;
  inset-inline-start: 0;
  z-index: ${({ theme }) => theme.zIndex.sidebar};
  display: flex;
  flex-direction: column;
  width: ${({ theme }) => theme.layout.sidebarWidth};
  padding: ${({ theme }) => theme.space.lg};
  background: ${({ theme }) => theme.colors.sidebarBg};
  color: ${({ theme }) => theme.colors.sidebarText};
`

export const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xxs};
  padding-block: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.xl};
  padding-inline: ${({ theme }) => theme.space.xs};
`

export const BrandSubtitle = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.sidebarTextMuted};
`

export const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xxs};
  margin: 0;
  padding: 0;
  list-style: none;
`

export const NavItemLink = styled(NavLink)`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  height: 44px;
  padding-inline: ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.sidebarTextMuted};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-decoration: none;
  transition:
    background-color ${({ theme }) => theme.transition},
    color ${({ theme }) => theme.transition};

  &:hover {
    background: ${({ theme }) => theme.colors.sidebarHover};
    color: ${({ theme }) => theme.colors.sidebarText};
  }

  &.active {
    background: ${({ theme }) => theme.colors.sidebarActiveBg};
    color: ${({ theme }) => theme.colors.onPrimary};
  }

  /* Orange indicator on the inline-start edge of the active item. */
  &.active::before {
    content: '';
    position: absolute;
    inset-block: 10px;
    inset-inline-start: -${({ theme }) => theme.space.lg};
    width: 4px;
    border-start-end-radius: 4px;
    border-end-end-radius: 4px;
    background: ${({ theme }) => theme.colors.accent};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  margin-block-start: auto;
  padding-block-start: ${({ theme }) => theme.space.md};
  border-block-start: 1px solid ${({ theme }) => theme.colors.sidebarBorder};
`

export const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`

export const Avatar = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.sidebarBg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-transform: uppercase;
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`

export const UserLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.sidebarTextMuted};
`

export const Username = styled.span`
  overflow: hidden;
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  text-overflow: ellipsis;
  white-space: nowrap;
`
