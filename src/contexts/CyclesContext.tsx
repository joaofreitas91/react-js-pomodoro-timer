import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  idCurrentCycle: String | null
  amountSecondsPassed: number
  minutes: string
  seconds: string
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}

interface CycleContextProviderProps {
  children: ReactNode
}

export const CycleContext = createContext({} as CycleContextType)

export const CycleContextProvider = ({
  children,
}: CycleContextProviderProps) => {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      idCurrentCycle: null,
    },
    () => {
      const storedCycles = localStorage.getItem(
        '@ignite-timer:cycles-state-1.0.0',
      )

      if (storedCycles) {
        return JSON.parse(storedCycles)
      }

      return {
        cycles: [],
        idCurrentCycle: null,
      }
    },
  )

  const { cycles, idCurrentCycle } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === idCurrentCycle)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }
    return 0
  })

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
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
          document.title = 'Pomodoro Timer'
          dispatch(markCurrentCycleAsFinishedAction())
          setAmountSecondsPassed(0)
          clearInterval(interval)
        } else {
          document.title = `
          ${activeCycle.task.slice(0, 20)} - ${minutes}:${seconds}`

          setAmountSecondsPassed(
            differenceInSeconds(new Date(), new Date(activeCycle.startDate)),
          )
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, amountSecondsPassed, totalSeconds, minutes, seconds])

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  function createNewCycle(data: CreateCycleData) {
    const id = new Date().getTime().toString()

    const newCycle: Cycle = {
      id,
      minutesAmount: data.minutesAmount,
      task: data.task,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        idCurrentCycle,
        amountSecondsPassed,
        minutes,
        seconds,
        // markCurrentCycleAsFinished,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
