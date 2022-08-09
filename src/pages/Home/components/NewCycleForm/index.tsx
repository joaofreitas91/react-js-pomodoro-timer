import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CycleContext } from '../../../../contexts/CyclesContext'

import {
  FormContainer,
  TaskInput,
  MinutesAmountInput,
  ExecutionMsg,
} from './styles'

export const NewCycleForm = () => {
  const { activeCycle } = useContext(CycleContext)
  const { register, formState } = useFormContext()

  const formErros = formState.errors

  return (
    <FormContainer>
      {activeCycle ? (
        <ExecutionMsg>{activeCycle.task} em execução</ExecutionMsg>
      ) : (
        <>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task', { required: true })}
            hasError={formErros.hasOwnProperty.call(formErros, 'task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            min="0"
            max="60"
            step={1}
            {...register('minutesAmount', {
              valueAsNumber: true,
              required: true,
            })}
            hasError={formErros.hasOwnProperty.call(formErros, 'minutesAmount')}
          />

          <span>minutos.</span>
        </>
      )}
    </FormContainer>
  )
}
