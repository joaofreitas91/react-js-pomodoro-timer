import styled from 'styled-components'

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`

const BaseCountdownButton = styled.button`
  width: 100%;
  border: 0;
  border-radius: 8px;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  color: ${({ theme }) => theme.colors['gray-100']};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

export const StartCountdownButton = styled(BaseCountdownButton)`
  background: ${({ theme }) => theme.colors['green-500']};

  &:not(:disabled):hover {
    background: ${({ theme }) => theme.colors['green-700']};
  }
`

export const StopCountdownButton = styled(BaseCountdownButton)`
  background: ${({ theme }) => theme.colors['red-500']};

  &:not(:disabled):hover {
    background: ${({ theme }) => theme.colors['red-700']};
  }
`
