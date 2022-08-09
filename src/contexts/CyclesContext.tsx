import { createContext, ReactNode, useState } from 'react'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptionDate?: Date
  finishedDate?: Date
}

interface CycleContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  idCurrentCycle: String | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
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
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [idCurrentCycle, setIdCurrentCycle] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === idCurrentCycle)

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

  function createNewCycle(data: CreateCycleData) {
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

    // reset()
  }

  function interruptCurrentCycle() {
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
    <CycleContext.Provider
      value={{
        cycles,
        activeCycle,
        idCurrentCycle,
        amountSecondsPassed,
        markCurrentCycleAsFinished,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
