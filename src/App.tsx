import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { useAppSelector } from '@/Redux/hooks'
import { store } from '@/Redux/store'
import { preferencesStorage } from '@/Storage/preferencesStorage'
import { GlobalStyle } from '@/styles/GlobalStyle'
import { themes } from '@/styles/theme'
import { getTextDirection } from '@/Utils/getTextDirection'

/** Applies and persists the user's preferences; needs to live inside the Redux Provider. */
function ThemedApp() {
  const language = useAppSelector((state) => state.settings.language)
  const theme = useAppSelector((state) => state.settings.theme)

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = getTextDirection(language)
    preferencesStorage.setLanguage(language)
  }, [language])

  useEffect(() => {
    preferencesStorage.setTheme(theme)
  }, [theme])

  return (
    <ThemeProvider theme={themes[theme]}>
      <GlobalStyle />
    </ThemeProvider>
  )
}

function App() {
  return (
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  )
}

export default App
