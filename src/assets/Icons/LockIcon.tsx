import { IconBase, type IconProps } from '@/assets/Icons/IconBase'

export function LockIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </IconBase>
  )
}
