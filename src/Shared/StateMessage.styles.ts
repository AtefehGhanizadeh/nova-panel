import styled from 'styled-components'

export const StateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  padding-block: ${({ theme }) => theme.space.xxl};
  padding-inline: ${({ theme }) => theme.space.md};
  text-align: center;
`

export const StateIcon = styled.span<{ $tone: 'neutral' | 'danger' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin-block-end: ${({ theme }) => theme.space.xxs};
  border-radius: 50%;
  background: ${({ $tone, theme }) =>
    $tone === 'danger' ? theme.colors.dangerBg : theme.colors.surfaceMuted};
  color: ${({ $tone, theme }) => ($tone === 'danger' ? theme.colors.danger : theme.colors.textMuted)};
`

export const StateTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
`

export const StateDescription = styled.p`
  max-width: 420px;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`

export const StateAction = styled.div`
  margin-block-start: ${({ theme }) => theme.space.xs};
`
