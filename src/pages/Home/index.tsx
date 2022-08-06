import { Play } from 'phosphor-react'
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

const NewCycleFormValidationSchema = zod.object({
  task: zod
    .string()
    .min(1, 'Informe a Tarefa')
    .max(100, 'A Tarefa não pode ter mais que 100 caracteres'),
  minutesAmount: zod
    .number()
    .min(1, 'O tempo deve ser maior que 1 minuto')
    .max(60, 'O tempo não pode ser maior que 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof NewCycleFormValidationSchema>

export const Home = () => {
  const { register, handleSubmit, watch, reset, formState } =
    useForm<NewCycleFormData>({
      resolver: zodResolver(NewCycleFormValidationSchema),
      defaultValues: {
        task: '',
        minutesAmount: 0,
      },
    })

  const formErros = formState.errors

  const task = watch('task')
  const minutes = watch('minutesAmount')

  const isSubmitDisabled = task && minutes

  function handleNewCycle(data: NewCycleFormData) {
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleNewCycle)} action="">
        <FormContainer>
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
            step={5}
            {...register('minutesAmount', {
              valueAsNumber: true,
              required: true,
            })}
            hasError={formErros.hasOwnProperty.call(formErros, 'minutesAmount')}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton type="submit" disabled={!isSubmitDisabled}>
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
