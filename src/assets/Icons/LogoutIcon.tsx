import { IconBase, type IconProps } from '@/assets/Icons/IconBase'

export function LogoutIcon(props: IconProps) {
  return (
    <IconBase flipInRtl {...props}>
      <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l-5-5 5-5M5 12h11" />
    </IconBase>
  )
}
