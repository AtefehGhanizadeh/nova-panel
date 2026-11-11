import { createGlobalStyle } from 'styled-components'
import vazirmatnBold from '@/assets/Fonts/Vazirmatn-Bold.woff2'
import vazirmatnMedium from '@/assets/Fonts/Vazirmatn-Medium.woff2'
import vazirmatnRegular from '@/assets/Fonts/Vazirmatn-Regular.woff2'
import vazirmatnSemiBold from '@/assets/Fonts/Vazirmatn-SemiBold.woff2'

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Vazirmatn';
    src: url(${vazirmatnRegular}) format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Vazirmatn';
    src: url(${vazirmatnMedium}) format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Vazirmatn';
    src: url(${vazirmatnSemiBold}) format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Vazirmatn';
    src: url(${vazirmatnBold}) format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    color-scheme: ${({ theme }) => theme.mode};
  }

  body {
    margin: 0;
    min-width: 1280px;
    font-family: 'Vazirmatn', system-ui, -apple-system, 'Segoe UI', sans-serif;
    font-size: ${({ theme }) => theme.fontSize.md};
    line-height: 1.6;
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    -webkit-font-smoothing: antialiased;
    transition: background-color ${({ theme }) => theme.transition}, color ${({ theme }) => theme.transition};
  }

  h1, h2, h3, h4, p {
    margin: 0;
  }

  button,
  input,
  select,
  textarea {
    font: inherit;
    color: inherit;
  }

  button {
    cursor: pointer;
  }

  button:disabled {
    cursor: not-allowed;
  }

  img {
    display: block;
    max-width: 100%;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`
