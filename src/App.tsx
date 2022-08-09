import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/theme/theme'
import GlobalStyle from './styles/global'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { CycleContextProvider } from './contexts/CyclesContext'

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CycleContextProvider>
          <Router />
        </CycleContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
