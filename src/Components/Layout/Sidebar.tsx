import { LogoutIcon } from '@/assets/Icons/LogoutIcon'
import { NAV_ITEMS } from '@/Components/Layout/navItems'
import { PreferencesControls } from '@/Components/Layout/PreferencesControls'
import {
  Aside,
  Avatar,
  Brand,
  BrandSubtitle,
  Footer,
  NavItemLink,
  NavList,
  UserInfo,
  UserLabel,
  Username,
  UserRow,
} from '@/Components/Layout/Sidebar.styles'
import { useTranslation } from '@/Dictionary/useTranslation'
import { useAppDispatch, useAppSelector } from '@/Redux/hooks'
import { logout } from '@/Redux/slices/authSlice'
import { Button } from '@/Shared/Button'
import { Logo } from '@/Shared/Logo'

export function Sidebar() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const username = useAppSelector((state) => state.auth.username) ?? ''

  return (
    <Aside>
      <Brand>
        <Logo onDark size={26} />
        <BrandSubtitle>{t.common.adminPanel}</BrandSubtitle>
      </Brand>

      <nav aria-label={t.layout.mainNav}>
        <NavList>
          {NAV_ITEMS.map(({ path, labelKey, Icon }) => (
            <li key={path}>
              <NavItemLink to={path}>
                <Icon size={20} />
                {t.layout.nav[labelKey]}
              </NavItemLink>
            </li>
          ))}
        </NavList>
      </nav>

      <Footer>
        <PreferencesControls />
        <UserRow>
          <Avatar aria-hidden="true">{username.charAt(0)}</Avatar>
          <UserInfo>
            <UserLabel>{t.layout.signedInAs}</UserLabel>
            <Username dir="ltr">{username}</Username>
          </UserInfo>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            onClick={() => dispatch(logout())}
            aria-label={t.auth.logout}
            title={t.auth.logout}
          >
            <LogoutIcon size={18} />
          </Button>
        </UserRow>
      </Footer>
    </Aside>
  )
}
