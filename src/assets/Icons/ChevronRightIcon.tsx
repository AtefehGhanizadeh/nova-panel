import { IconBase, type IconProps } from '@/assets/Icons/IconBase'

export function ChevronRightIcon(props: IconProps) {
  return (
    <IconBase flipInRtl {...props}>
      <path d="m9 18 6-6-6-6" />
    </IconBase>
  )
}
