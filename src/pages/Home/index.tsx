import { useContext } from 'react'

import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { CycleContext } from '../../contexts/CyclesContext'

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
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CycleContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(NewCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const taskWatch = watch('task')
  const minutesWatch = watch('minutesAmount')

  const isSubmitDisabled = taskWatch && minutesWatch

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={!isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
