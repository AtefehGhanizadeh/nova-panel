import styled from 'styled-components'

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  padding-block: 2px;
  padding-inline: ${({ theme }) => theme.space.xs};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.badgeBg};
  color: ${({ theme }) => theme.colors.badgeText};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  white-space: nowrap;
`
