import { IconBase, type IconProps } from '@/assets/Icons/IconBase'

export function AlertCircleIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4M12 16h.01" />
    </IconBase>
  )
}
