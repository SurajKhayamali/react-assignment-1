import { useEffect, useRef, useState } from 'react'
import styles from './index.module.css'
import { DEFAULT_TIME, TIMER_INTERVAL } from './timer.constant'
import { TimerState } from './timer.enum'

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
  const timerRef = useRef<NodeJS.Timeout>()

  const [startTimestamp, setStartTimestamp] = useState<number>()
  const animationFrameRequestId = useRef<number>()
  const [timerState, setTimerState] = useState(TimerState.PENDING)
  // const [elapsedTime, setElapsedTime] = useState(0)

  const startTimer = () => {
    setTime(DEFAULT_TIME)
    resumeTimer()
  }

  const pauseTimer = () => {
    // clearInterval(timerRef.current);

    setStartTimestamp(undefined)
    animationFrameRequestId.current &&
      cancelAnimationFrame(animationFrameRequestId.current)

    setTimerState(TimerState.PAUSED)
  }

  const resumeTimer = () => {
    // if(timerRef.current) return;

    // timerRef.current = setInterval(() => {
    //   setTime(oldTime=> oldTime - 1)
    // }, TIMER_INTERVAL)

    setStartTimestamp(Date.now())

    setTimerState(TimerState.STARTED)
  }

  const resetTimer = () => {
    pauseTimer()
    setTime(DEFAULT_TIME)
  }

  const runCountdown = () => {
    if (!startTimestamp) return
    const timeLapsed = Math.floor((Date.now() - startTimestamp) / 1000)
    // console.log(timeLapsed)
    // setTime(oldTime=>oldTime - timeLapsed) // THis doesn't work
    setTime(time - timeLapsed) // This works but is same as below line where DEFAULT_TIME value is being used as time
    // setTime(DEFAULT_TIME- timeLapsed)
    animationFrameRequestId.current = requestAnimationFrame(runCountdown)
  }

  useEffect(() => {
    // console.log(startTimestamp);
    // const interval = setInterval(()=>{
    //   if(startTimestamp) {
    //     const timeLapsed = Math.floor((Date.now() -startTimestamp)/1000);
    //     console.log(timeLapsed)
    //     setTime(DEFAULT_TIME - timeLapsed)
    //   }
    // }, TIMER_INTERVAL)

    // return() => clearInterval(interval);

    animationFrameRequestId.current = requestAnimationFrame(runCountdown)
  }, [startTimestamp])

  return (
    <main className={styles.container}>
      <DisplayTime time={time} />

      <div className={styles.buttonSection}>
        {timerState === TimerState.PENDING && (
          <button className={styles.button} onClick={startTimer}>
            Start
          </button>
        )}
        {timerState === TimerState.PAUSED && (
          <button className={styles.button} onClick={resumeTimer}>
            Resume
          </button>
        )}
        {timerState === TimerState.STARTED && (
          <button className={styles.button} onClick={pauseTimer}>
            Pause
          </button>
        )}
        <button className={styles.button} onClick={resetTimer}>
          Reset
        </button>
      </div>
    </main>
  )
}

export default Timer
