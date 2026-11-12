import type { ReactNode, SVGProps } from 'react'

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  size?: number
}

interface IconBaseProps extends IconProps {
  children: ReactNode
  /** Mirror the icon in RTL layouts (arrows, chevrons). */
  flipInRtl?: boolean
}

/** Shared SVG wrapper: 24×24 stroke icons that inherit the text color. Decorative by default. */
export function IconBase({
  size = 20,
  flipInRtl = false,
  className,
  children,
  ...props
}: IconBaseProps) {
  const classes = [flipInRtl ? 'flip-in-rtl' : '', className ?? ''].filter(Boolean).join(' ')

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={classes || undefined}
      {...props}
    >
      {children}
    </svg>
  )
}
