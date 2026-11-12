import { AlertCircleIcon } from '@/assets/Icons/AlertCircleIcon'
import { CheckCircleIcon } from '@/assets/Icons/CheckCircleIcon'
import { CloseIcon } from '@/assets/Icons/CloseIcon'
import { useTranslation } from '@/Dictionary/useTranslation'
import { Button } from '@/Shared/Button'
import { type ReactNode, useEffect, useEffectEvent } from 'react'
import styled from 'styled-components'

type AlertVariant = 'success' | 'error'

const Box = styled.div<{ $variant: AlertVariant }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  padding-block: ${({ theme }) => theme.space.xs};
  padding-inline: ${({ theme }) => theme.space.sm};
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid currentColor;
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ $variant, theme }) =>
    $variant === 'success' ? theme.colors.success : theme.colors.danger};
  background: ${({ $variant, theme }) =>
    $variant === 'success' ? theme.colors.successBg : theme.colors.dangerBg};
`

const Message = styled.p`
  flex: 1;
`

interface AlertProps {
  variant: AlertVariant
  children: ReactNode
  onClose?: () => void
  autoHideMs?: number
}

export function Alert({ variant, children, onClose, autoHideMs }: AlertProps) {
  const { t } = useTranslation()
  const canClose = Boolean(onClose)
  const closeAfterTimeout = useEffectEvent(() => onClose?.())

  useEffect(() => {
    if (!autoHideMs || !canClose) return
    const timer = window.setTimeout(closeAfterTimeout, autoHideMs)
    return () => window.clearTimeout(timer)
  }, [autoHideMs, canClose])
  return (
    <Box $variant={variant} role={variant === 'error' ? 'alert' : 'status'}>
      {variant === 'success' ? <CheckCircleIcon size={18} /> : <AlertCircleIcon size={18} />}
      <Message>{children}</Message>
      {onClose && (
        <Button variant="ghost" size="sm" iconOnly onClick={onClose} aria-label={t.common.close}>
          <CloseIcon size={16} />
        </Button>
      )}
    </Box>
  )
}
