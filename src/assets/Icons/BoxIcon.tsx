import { IconBase, type IconProps } from '@/assets/Icons/IconBase'

export function BoxIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
      <path d="m3 8 9 5 9-5M12 13v8" />
    </IconBase>
  )
}
