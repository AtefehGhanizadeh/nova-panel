import styled from 'styled-components'
import { PreferencesControls } from '@/Components/Layout/PreferencesControls'
import { LoginForm } from '@/Components/Login/LoginForm'
import { useTranslation } from '@/Dictionary/useTranslation'
import { Logo } from '@/Shared/Logo'

const Page = styled.main`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.space.xl};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.sidebarBg};

  /* Decorative brand shapes, as in the reference design. */
  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }

  &::before {
    width: 420px;
    height: 420px;
    inset-block-end: -160px;
    inset-inline-end: -120px;
    background: ${({ theme }) => theme.colors.accent};
    opacity: 0.9;
  }

  &::after {
    width: 360px;
    height: 360px;
    inset-block-start: -140px;
    inset-inline-start: -100px;
    background: ${({ theme }) => theme.colors.primary};
    opacity: 0.35;
  }
`

const Corner = styled.div`
  position: absolute;
  z-index: 1;
  inset-block-start: ${({ theme }) => theme.space.xl};
  inset-inline-end: ${({ theme }) => theme.space.xl};
  width: 190px;
`

const Card = styled.section`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 400px;
  padding: ${({ theme }) => theme.space.xxl};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.shadow.lg};
`

const CardHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  margin-block-end: ${({ theme }) => theme.space.xl};
  text-align: center;
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`

export function LoginPage() {
  const { t } = useTranslation()

  return (
    <Page>
      <Corner>
        <PreferencesControls />
      </Corner>
      <Card aria-labelledby="login-title">
        <CardHeader>
          <Logo size={30} />
          <Title id="login-title">{t.common.adminPanel}</Title>
          <Subtitle>{t.auth.subtitle}</Subtitle>
        </CardHeader>
        <LoginForm />
      </Card>
    </Page>
  )
}
