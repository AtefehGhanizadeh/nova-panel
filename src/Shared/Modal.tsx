import {
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
} from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon } from '@/assets/Icons/CloseIcon'
import { useTranslation } from '@/Dictionary/useTranslation'
import { Button } from '@/Shared/Button'
import { Body, Dialog, Header, Overlay, Title } from '@/Shared/Modal.styles'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not(:disabled)',
  'input:not(:disabled)',
  'select:not(:disabled)',
  'textarea:not(:disabled)',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

const FIRST_FIELD_SELECTOR = 'input:not(:disabled), select:not(:disabled), textarea:not(:disabled)'

interface ModalProps {
  isOpen: boolean
  title: string
  onClose: () => void
  isCloseDisabled?: boolean
  width?: string
  children: ReactNode
}

type ModalDialogProps = Omit<ModalProps, 'isOpen'>

function ModalDialog({
  title,
  onClose,
  isCloseDisabled = false,
  width = '640px',
  children,
}: ModalDialogProps) {
  const { t } = useTranslation()
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)

 
  useEffect(() => {
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const dialog = dialogRef.current
    const firstField = dialog?.querySelector<HTMLElement>(FIRST_FIELD_SELECTOR)
    ;(firstField ?? dialog)?.focus()

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
      trigger?.focus()
    }
  }, [])

  const requestClose = () => {
    if (!isCloseDisabled) onClose()
  }

  const keepFocusInside = (event: KeyboardEvent<HTMLDivElement>) => {
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    const first = focusable?.[0]
    const last = focusable?.[focusable.length - 1]
    if (!first || !last) return

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation()
      requestClose()
    } else if (event.key === 'Tab') {
      keepFocusInside(event)
    }
  }


  const handleBackdropMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) requestClose()
  }

  return (
    <Overlay onMouseDown={handleBackdropMouseDown}>
      <Dialog
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        $width={width}
        onKeyDown={handleKeyDown}
      >
        <Header>
          <Title id={titleId}>{title}</Title>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            onClick={requestClose}
            disabled={isCloseDisabled}
            aria-label={t.common.close}
          >
            <CloseIcon size={18} />
          </Button>
        </Header>
        <Body>{children}</Body>
      </Dialog>
    </Overlay>
  )
}


export function Modal({ isOpen, ...dialogProps }: ModalProps) {
  if (!isOpen) return null
  return createPortal(<ModalDialog {...dialogProps} />, document.body)
}
