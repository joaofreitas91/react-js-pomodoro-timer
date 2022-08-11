import { Cycle } from './reducer'

export enum ActionsTypes {
  // eslint-disable-next-line no-unused-vars
  CREATE_NEW_CYCLE = 'CREATE_NEW_CYCLE',
  // eslint-disable-next-line no-unused-vars
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  // eslint-disable-next-line no-unused-vars
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionsTypes.CREATE_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function interruptCurrentCycleAction() {
  return {
    type: ActionsTypes.INTERRUPT_CURRENT_CYCLE,
  }
}

export function markCurrentCycleAsFinishedAction() {
  return {
    type: ActionsTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
  }
}
