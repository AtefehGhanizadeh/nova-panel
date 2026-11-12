import { IconBase, type IconProps } from '@/assets/Icons/IconBase'

export function ChevronLeftIcon(props: IconProps) {
  return (
    <IconBase flipInRtl {...props}>
      <path d="m15 18-6-6 6-6" />
    </IconBase>
  )
}
