import { useContext, useEffect } from 'react'
import { CountdownContainer, Separator } from './styles'

import { differenceInSeconds } from 'date-fns'
import { CycleContext } from '../../../../contexts/CyclesContext'

export const Countdown = () => {
  const {
    activeCycle,
    amountSecondsPassed,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  } = useContext(CycleContext)

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
          markCurrentCycleAsFinished()
          setSecondsPassed(0)
          clearInterval(interval)
        } else {
          setSecondsPassed(
            differenceInSeconds(new Date(), new Date(activeCycle.startDate)),
          )
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    amountSecondsPassed,
    totalSeconds,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ])

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
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
