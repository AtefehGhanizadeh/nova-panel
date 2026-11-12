import { useState } from 'react'
import styled from 'styled-components'
import { ImageIcon } from '@/assets/Icons/ImageIcon'
import { useTranslation } from '@/Dictionary/useTranslation'

const HTTP_URL_PATTERN = /^https?:\/\/\S+$/i

const Box = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.xs};
  height: 100%;
  min-height: 240px;
  margin: 0;
  padding: ${({ theme }) => theme.space.md};
  border: 2px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`

const PreviewImage = styled.img`
  width: 100%;
  max-height: 260px;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.radius.md};
  background: #ffffff;
`

const Caption = styled.figcaption`
  font-size: ${({ theme }) => theme.fontSize.sm};
`

function Placeholder() {
  const { t } = useTranslation()

  return (
    <>
      <ImageIcon size={40} />
      <Caption>{t.forms.product.imagePreview}</Caption>
    </>
  )
}

/** Remounted per URL (via `key`), so the failed state resets when the URL changes. */
function RemoteImage({ url }: { url: string }) {
  const { t } = useTranslation()
  const [hasFailed, setHasFailed] = useState(false)

  if (hasFailed) return <Placeholder />

  return (
    <PreviewImage src={url} alt={t.forms.product.imagePreview} onError={() => setHasFailed(true)} />
  )
}

interface ProductImagePreviewProps {
  url: string
}

export function ProductImagePreview({ url }: ProductImagePreviewProps) {
  const trimmedUrl = url.trim()
  const canPreview = HTTP_URL_PATTERN.test(trimmedUrl)

  return (
    <Box aria-live="polite">
      {canPreview ? <RemoteImage key={trimmedUrl} url={trimmedUrl} /> : <Placeholder />}
    </Box>
  )
}
