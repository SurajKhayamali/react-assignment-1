import { useRef, useState } from 'react'
import styles from './index.module.css'
import { DEFAULT_TIME, TIMER_INTERVAL } from './timer.constant'
import { TimerState } from './timer.enum'
import Button from '../../compoments/Button'

interface DisplayTimeProps {
  time: number // Time in seconds
}

const DisplayTime = (props: DisplayTimeProps) => {
  const { time } = props

  const timeInMinutes = Math.floor(time / 60)
  const timeInSeconds = (time % 60).toString().padStart(2, '0')
  return (
    <p className={styles.time}>
      {timeInMinutes}m {timeInSeconds}s
    </p>
  )
}

const Timer = () => {
  const [time, setTime] = useState(DEFAULT_TIME)
  const [timerState, setTimerState] = useState(TimerState.PENDING)
  const timerRef = useRef<NodeJS.Timeout>()

  const startTimer = () => {
    setTime(DEFAULT_TIME)
    resumeTimer()
  }

  const pauseTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = undefined

    setTimerState(TimerState.PAUSED)
  }

  const resumeTimer = () => {
    if (timerRef.current) return

    timerRef.current = setInterval(() => {
      setTime((oldTime) => {
        if (oldTime > 0) return oldTime - 1

        setTimerState(TimerState.STOPPED)
        return 0
      })
    }, TIMER_INTERVAL)

    setTimerState(TimerState.RUNNING)
  }

  const resetTimer = () => {
    pauseTimer()
    setTime(DEFAULT_TIME)
    setTimerState(TimerState.PENDING)
  }

  return (
    <main className={styles.container}>
      <DisplayTime time={time} />

      <div className={styles.buttonSection}>
        {timerState === TimerState.PENDING && (
          <Button
            title="Start"
            size="lg"
            variant="primary"
            onClick={startTimer}
          />
        )}

        {timerState === TimerState.PAUSED && (
          <Button
            title="Resume"
            size="lg"
            variant="primary"
            onClick={resumeTimer}
          />
        )}

        {timerState === TimerState.RUNNING && (
          <Button
            title="Pause"
            size="lg"
            variant="outline"
            onClick={pauseTimer}
          />
        )}

        <Button
          title="Reset"
          size="lg"
          variant="outline"
          onClick={resetTimer}
        />
      </div>
    </main>
  )
}

export default Timer
