import { createGlobalStyle } from 'styled-components'

const globalTheme = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:focus {
  outline: 0;
  box-shadow: 0 0 0 0.2rem ${(props) => props.theme.colors['green-500']};
}

body{
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.colors['gray-900']};
  color: ${(props) => props.theme.colors['gray-300']};
}

body, input, button, textarea{
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 1rem;
}

`

export default globalTheme
