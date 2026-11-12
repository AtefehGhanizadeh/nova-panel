import { useState } from 'react'
import styled from 'styled-components'
import { ImageIcon } from '@/assets/Icons/ImageIcon'
import { useTranslation } from '@/Dictionary/useTranslation'

const Frame = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 2px;
  border-radius: ${({ theme }) => theme.radius.md};
  /* Product photos have white backgrounds, so the frame stays white in both themes. */
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  overflow: hidden;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

interface ProductThumbnailProps {
  src: string
  alt: string
}

export function ProductThumbnail({ src, alt }: ProductThumbnailProps) {
  const { t } = useTranslation()
  const [hasFailed, setHasFailed] = useState(false)

  return (
    <Frame>
      {hasFailed ? (
        <ImageIcon
          size={18}
          role="img"
          aria-label={t.common.imageUnavailable}
          aria-hidden={false}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={40}
          height={40}
          loading="lazy"
          decoding="async"
          onError={() => setHasFailed(true)}
        />
      )}
    </Frame>
  )
}
