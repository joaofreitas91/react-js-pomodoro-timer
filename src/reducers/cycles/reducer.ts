import { produce } from 'immer'
import { ActionsTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptionDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  idCurrentCycle: String | null
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionsTypes.CREATE_NEW_CYCLE:
      // return {
      //   ...state,
      //   cycles: [...state.cycles, action.payload.newCycle],
      //   idCurrentCycle: action.payload.newCycle.id,
      // }

      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.idCurrentCycle = action.payload.newCycle.id
      })
    case ActionsTypes.INTERRUPT_CURRENT_CYCLE: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.idCurrentCycle) {
      //       return {
      //         ...cycle,
      //         interruptionDate: new Date(),
      //       }
      //     } else {
      //       return cycle
      //     }
      //   }),
      //   idCurrentCycle: null,
      // }

      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.idCurrentCycle,
      )

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.idCurrentCycle = null
        draft.cycles[currentCycleIndex].interruptionDate = new Date()
      })
    }
    case ActionsTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      // return {
      //   ...state,
      //   cycles: state.cycles.map((cycle) => {
      //     if (cycle.id === state.idCurrentCycle) {
      //       return {
      //         ...cycle,
      //         finishedDate: new Date(),
      //       }
      //     } else {
      //       return cycle
      //     }
      //   }),
      //   idCurrentCycle: null,
      // }

      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.idCurrentCycle,
      )

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.idCurrentCycle = null
        draft.cycles[currentCycleIndex].finishedDate = new Date()
      })
    }
    default:
      return state
  }
}
