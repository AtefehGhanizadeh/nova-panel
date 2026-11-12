import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'
import { store } from '@/Redux/store'
import { setupInterceptors } from '@/Utils/api/setupInterceptors'

setupInterceptors(store)

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element #root not found')

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)