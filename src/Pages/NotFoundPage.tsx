import { Link } from 'react-router'
import styled from 'styled-components'
import { useTranslation } from '@/Dictionary/useTranslation'

import { Logo } from '@/Shared/Logo'
import { ROUTES } from '@/Routes/paths'

const Page = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.sm};
  min-height: 100vh;
  padding: ${({ theme }) => theme.space.xl};
  text-align: center;
`

const Code = styled.p`
  margin-block-start: ${({ theme }) => theme.space.xl};
  font-size: 72px;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  line-height: 1;
  color: ${({ theme }) => theme.colors.accent};
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xxl};
`

const Description = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
`

const HomeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  height: 40px;
  margin-block-start: ${({ theme }) => theme.space.sm};
  padding-inline: ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.primaryButtonBg};
  color: ${({ theme }) => theme.colors.onPrimary};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryButtonHover};
  }
`

export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <Page>
      <Logo size={28} />
      <Code>{t.notFound.code}</Code>
      <Title>{t.notFound.title}</Title>
      <Description>{t.notFound.description}</Description>
      <HomeLink to={ROUTES.products}>{t.notFound.backLink}</HomeLink>
    </Page>
  )
}
