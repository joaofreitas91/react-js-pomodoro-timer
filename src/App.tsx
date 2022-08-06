import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/theme/theme'
import GlobalStyle from './styles/global'

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <h1>Hello World!</h1>
      <GlobalStyle />
    </ThemeProvider>
  )
}
