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

export const FormContainer = styled.div`
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  color: ${({ theme }) => theme.colors['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
`
export const ExecutionMsg = styled.p`
  color: ${({ theme }) => theme.colors['gray-100']};
  font-size: 1.4rem;
  font-weight: bold;
  text-transform: lowercase;

  &::first-letter {
    text-transform: uppercase;
  }
`
interface TypeBaseInputProps {
  hasError?: boolean
}

const BaseInput = styled.input<TypeBaseInputProps>`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors['gray-500']};
  font-weight: bold;
  font-size: 1rem;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors['gray-100']};
  border-color: ${({ theme, hasError }) => hasError && theme.colors['red-500']};

  &:focus {
    box-shadow: none;
    border-color: ${({ theme, hasError }) =>
      !hasError && theme.colors['green-500']};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors['gray-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 3.5rem;
`

export const CountdownContainer = styled.div`
  font-family: 'Roboto-Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${({ theme }) => theme.colors['gray-100']};

  display: flex;
  gap: 1rem;

  span {
    background: ${({ theme }) => theme.colors['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`

export const Separator = styled.div`
  padding: 2rem 0;
  color: ${({ theme }) => theme.colors['green-500']};

  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
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
