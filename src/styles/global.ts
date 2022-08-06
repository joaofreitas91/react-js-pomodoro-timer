import { createGlobalStyle } from 'styled-components'

const globalTheme = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:focus {
  outline: 0;
  box-shadow: 0 0 0 0.2rem ${(props) => props.theme.colors['green-500']};
}

body{
  padding: 0 .5rem;
  background-color: ${(props) => props.theme.colors['gray-900']};
  color: ${(props) => props.theme.colors['gray-300']};
  -webkit-font-smoothing: antialiased;

}

body, input, button, textarea{
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 1rem;
}
`

export default globalTheme
