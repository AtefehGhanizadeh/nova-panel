import { AlertCircleIcon } from '@/assets/Icons/AlertCircleIcon'
import { RefreshIcon } from '@/assets/Icons/RefreshIcon'
import { useTranslation } from '@/Dictionary/useTranslation'
import { Button } from '@/Shared/Button'
import {
  StateAction,
  StateDescription,
  StateIcon,
  StateTitle,
  StateWrapper,
} from '@/Shared/StateMessage.styles'

interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const { t } = useTranslation()

  return (
    <StateWrapper role="alert">
      <StateIcon $tone="danger">
        <AlertCircleIcon size={26} />
      </StateIcon>
      <StateTitle>{t.common.loadErrorTitle}</StateTitle>
      <StateDescription>{message}</StateDescription>
      {onRetry && (
        <StateAction>
          <Button variant="secondary" startIcon={<RefreshIcon size={16} />} onClick={onRetry}>
            {t.common.retry}
          </Button>
        </StateAction>
      )}
    </StateWrapper>
  )
}
