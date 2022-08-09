import { createContext, useState } from 'react'

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

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptionDate?: Date
  finishedDate?: Date
}

interface CycleContextType {
  activeCycle: Cycle | undefined
  idCurrentCycle: String | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
}

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

export const CycleContext = createContext({} as CycleContextType)

export const Home = () => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [idCurrentCycle, setIdCurrentCycle] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === idCurrentCycle)

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

  function markCurrentCycleAsFinished() {
    setCycles((previousCycles) => {
      return previousCycles.map((cycle) => {
        if (cycle.id === idCurrentCycle) {
          return {
            ...cycle,
            finishedDate: new Date(),
          }
        } else {
          return cycle
        }
      })
    })

    setIdCurrentCycle(null)
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function handleNewCycle(data: NewCycleFormData) {
    const id = new Date().getTime().toString()

    const newCycle: Cycle = {
      id,
      minutesAmount: data.minutesAmount,
      task: data.task,
      startDate: new Date(),
    }

    setCycles((previousCycles) => [...previousCycles, newCycle])
    setIdCurrentCycle(id)
    setAmountSecondsPassed(0)

    reset()
  }

  function handleStopCycle() {
    setCycles((previousCycles) => {
      return previousCycles.map((cycle) => {
        if (cycle.id === idCurrentCycle) {
          return {
            ...cycle,
            interruptionDate: new Date(),
          }
        } else {
          return cycle
        }
      })
    })

    setIdCurrentCycle(null)
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleNewCycle)} action="">
        <CycleContext.Provider
          value={{
            activeCycle,
            idCurrentCycle,
            amountSecondsPassed,
            markCurrentCycleAsFinished,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CycleContext.Provider>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleStopCycle}>
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
