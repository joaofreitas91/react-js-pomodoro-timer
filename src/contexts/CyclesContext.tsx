import { createContext, ReactNode, useReducer, useState } from 'react'

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

interface CyclesState {
  cycles: Cycle[]
  idCurrentCycle: String | null
}

interface CycleContextProviderProps {
  children: ReactNode
}

export const CycleContext = createContext({} as CycleContextType)

export const CycleContextProvider = ({
  children,
}: CycleContextProviderProps) => {
  const [cyclesState, dispatch] = useReducer(
    (state: CyclesState, action: any) => {
      switch (action.type) {
        case 'CREATE_NEW_CYCLE':
          return {
            ...state,
            cycles: [...state.cycles, action.payload.newCycle],
            idCurrentCycle: action.payload.newCycle.id,
          }
        case 'INTERRUPT_CURRENT_CYCLE':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.idCurrentCycle) {
                return {
                  ...cycle,
                  interruptionDate: new Date(),
                }
              } else {
                return cycle
              }
            }),
            idCurrentCycle: null,
          }
        case 'MARK_CURRENT_CYCLE_AS_FINISHED':
          return {
            ...state,
            cycles: state.cycles.map((cycle) => {
              if (cycle.id === state.idCurrentCycle) {
                return {
                  ...cycle,
                  finishedDate: new Date(),
                }
              } else {
                return cycle
              }
            }),
            idCurrentCycle: null,
          }
        default:
          return state
      }
    },
    { cycles: [], idCurrentCycle: null },
  )

  const { cycles, idCurrentCycle } = cyclesState

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === idCurrentCycle)

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

    dispatch({
      type: 'CREATE_NEW_CYCLE',
      payload: {
        newCycle,
      },
    })
  }

  function interruptCurrentCycle() {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        idCurrentCycle,
      },
    })
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        idCurrentCycle,
      },
    })
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
