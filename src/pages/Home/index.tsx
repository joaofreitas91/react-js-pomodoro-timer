import { useEffect, useState } from 'react'

import { HandPalm, Play } from 'phosphor-react'
import {
  CountdownContainer,
  ExecutionMsg,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  StopCountdownButton,
  TaskInput,
} from './styles'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { differenceInSeconds } from 'date-fns'

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

type TypesNewCycleFormData = zod.infer<typeof NewCycleFormValidationSchema>

interface TypesCycle extends TypesNewCycleFormData {
  id: string
  startDate: Date
  interruptionDate?: Date
  finishedDate?: Date
}

export const Home = () => {
  const [cycles, setCycles] = useState<TypesCycle[]>([])
  const [idCurrentCycle, setIdCurrentCycle] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset, formState } =
    useForm<TypesNewCycleFormData>({
      resolver: zodResolver(NewCycleFormValidationSchema),
      defaultValues: {
        task: '',
        minutesAmount: 0,
      },
    })

  const formErros = formState.errors

  const taskWatch = watch('task')
  const minutesWatch = watch('minutesAmount')

  const isSubmitDisabled = taskWatch && minutesWatch

  function handleNewCycle(data: TypesNewCycleFormData) {
    const id = new Date().getTime().toString()

    const newCycle: TypesCycle = {
      id,
      minutesAmount: data.minutesAmount,
      task: data.task,
      startDate: new Date(),
    }

    setCycles((previousCycles) => [...previousCycles, newCycle])
    setIdCurrentCycle(id)

    reset()
    setAmountSecondsPassed(0)
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
    setAmountSecondsPassed(0)
  }

  const activeCycle = cycles.find((cycle) => cycle.id === idCurrentCycle)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 1 : 0
  const restTime = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(restTime / 60)
  const secondsAmount = restTime % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>

    if (activeCycle) {
      interval = setInterval(() => {
        if (amountSecondsPassed >= totalSeconds) {
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
          setAmountSecondsPassed(0)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(
            differenceInSeconds(new Date(), activeCycle.startDate),
          )
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, amountSecondsPassed, totalSeconds, idCurrentCycle])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${activeCycle.task.slice(
        0,
        20,
      )} - ${minutes}:${seconds}`
    } else {
      document.title = 'Pomodoro Timer'
    }
  }, [activeCycle, minutes, seconds])

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleNewCycle)} action="">
        {activeCycle ? (
          <ExecutionMsg>{activeCycle.task} em execução</ExecutionMsg>
        ) : (
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
              min="0"
              max="60"
              step={1}
              {...register('minutesAmount', {
                valueAsNumber: true,
                required: true,
              })}
              hasError={formErros.hasOwnProperty.call(
                formErros,
                'minutesAmount',
              )}
            />

            <span>minutos.</span>
          </FormContainer>
        )}

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

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
