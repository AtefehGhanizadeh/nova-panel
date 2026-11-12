import styled from 'styled-components'
import novaBag from '@/assets/Images/nova-bag.svg'
import { useTranslation } from '@/Dictionary/useTranslation'

const Wrapper = styled.span<{ $size: number; $onDark: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  font-size: ${({ $size }) => $size}px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  letter-spacing: 0.04em;
  line-height: 1;
  color: ${({ $onDark, theme }) => ($onDark ? theme.colors.sidebarText : theme.colors.text)};
  /* The brand name is Latin and should never be mirrored. */
  direction: ltr;
`

const Mark = styled.img<{ $size: number }>`
  width: ${({ $size }) => Math.round($size * 1.1)}px;
  height: ${({ $size }) => Math.round($size * 1.1)}px;
`

interface LogoProps {
  size?: number
  onDark?: boolean
}

export function Logo({ size = 26, onDark = false }: LogoProps) {
  const { t } = useTranslation()

  return (
    <Wrapper $size={size} $onDark={onDark}>
      {t.common.brand}
      <Mark src={novaBag} alt="" $size={size} />
    </Wrapper>
  )
}
