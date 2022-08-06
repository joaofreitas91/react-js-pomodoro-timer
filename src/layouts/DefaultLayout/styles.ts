import styled from 'styled-components'

export const ContainerDefaultLayout = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 74rem;
  height: calc(100vh - 10rem);
  margin: 5rem auto;
  padding: 2.5rem;
  border-radius: 8px;

  background-color: ${(props) => props.theme.colors['gray-800']};
`
