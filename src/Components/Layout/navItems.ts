import type { ComponentType } from 'react'
import { BoxIcon } from '@/assets/Icons/BoxIcon'
import type { IconProps } from '@/assets/Icons/IconBase'
import { UsersIcon } from '@/assets/Icons/UsersIcon'
import type { Dictionary } from '@/Dictionary'
import { ROUTES } from '@/Routes/paths'

export interface NavItem {
  path: string
  labelKey: keyof Dictionary['layout']['nav']
  Icon: ComponentType<IconProps>
}

export const NAV_ITEMS: readonly NavItem[] = [
  { path: ROUTES.products, labelKey: 'products', Icon: BoxIcon },
  { path: ROUTES.users, labelKey: 'users', Icon: UsersIcon },
]
