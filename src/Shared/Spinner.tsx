import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const SpinnerCircle = styled.span<{ $size: number }>`
  display: inline-block;
  flex-shrink: 0;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border: 2px solid currentColor;
  border-inline-end-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`

interface SpinnerProps {
  size?: number
}

export function Spinner({ size = 18 }: SpinnerProps) {
  return <SpinnerCircle $size={size} aria-hidden="true" />
}
