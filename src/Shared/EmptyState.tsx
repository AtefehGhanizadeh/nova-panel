import type { ReactNode } from 'react'
import {
  StateAction,
  StateDescription,
  StateIcon,
  StateTitle,
  StateWrapper,
} from '@/Shared/StateMessage.styles'

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <StateWrapper role="status">
      <StateIcon $tone="neutral">{icon}</StateIcon>
      <StateTitle>{title}</StateTitle>
      {description && <StateDescription>{description}</StateDescription>}
      {action && <StateAction>{action}</StateAction>}
    </StateWrapper>
  )
}
