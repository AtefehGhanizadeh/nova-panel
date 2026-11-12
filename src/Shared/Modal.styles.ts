import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space.xl};
  background: ${({ theme }) => theme.colors.overlay};
  animation: ${fadeIn} 150ms ease-out;
`

export const Dialog = styled.div<{ $width: string }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${({ $width }) => $width};
  max-height: calc(100vh - 48px);
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  animation: ${slideUp} 180ms ease-out;

  &:focus {
    outline: none;
  }
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.md};
  padding-block: ${({ theme }) => theme.space.md};
  padding-inline: ${({ theme }) => theme.space.xl};
  border-block-end: 1px solid ${({ theme }) => theme.colors.border};
`

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
`

export const Body = styled.div`
  overflow-y: auto;
  padding: ${({ theme }) => theme.space.xl};
`

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.space.sm};
  margin-block-start: ${({ theme }) => theme.space.xl};
  padding-block-start: ${({ theme }) => theme.space.md};
  border-block-start: 1px solid ${({ theme }) => theme.colors.border};
`
