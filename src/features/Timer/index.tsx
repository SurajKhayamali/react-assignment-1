import { useRef, useState } from 'react';

import Button from '../../compoments/Button';

import styles from './index.module.css';
import { DEFAULT_TIME, TIMER_INTERVAL } from './timer.constant';
import { TimerState } from './timer.enum';

interface TimerInputFormProps {
  handleTimeChange: (time: number) => void;
}

const TimerInputForm = ({ handleTimeChange }: TimerInputFormProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSet = () => {
    const value = inputRef.current?.value;
    if (!value) return;

    handleTimeChange(+value);
  };

  return (
    <div className="join">
      <input
        ref={inputRef}
        name="time"
        type="number"
        min={0}
        placeholder="Enter the duration for countdown (in seconds)"
        className="input input-bordered join-item w-96"
      />
      <button className="btn join-item rounded-r-full" onClick={handleSet}>
        SET
      </button>
    </div>
  );
};

interface DisplayTimeProps {
  time: number; // Time in seconds
}

const DisplayTime = (props: DisplayTimeProps) => {
  const { time } = props;

  const timeInMinutes = Math.floor(time / 60);
  const timeInSeconds = (time % 60).toString().padStart(2, '0');

  return (
    <p className={styles.time}>
      {timeInMinutes}m {timeInSeconds}s
    </p>
  );
};

const Timer = () => {
  const timerRef = useRef<NodeJS.Timeout>();
  const timerDuration = useRef(DEFAULT_TIME);
  const [time, setTime] = useState(timerDuration.current);
  const [timerState, setTimerState] = useState(TimerState.PENDING);

  const startTimer = () => {
    setTime(timerDuration.current);
    resumeTimer();
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = undefined;

    setTimerState(TimerState.PAUSED);
  };

  const resumeTimer = () => {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setTime((oldTime) => {
        if (oldTime > 0) return oldTime - 1;

        setTimerState(TimerState.STOPPED);
        return 0;
      });
    }, TIMER_INTERVAL);

    setTimerState(TimerState.RUNNING);
  };

  const resetTimer = (time?: number) => {
    pauseTimer();
    setTime(time || timerDuration.current);
    setTimerState(TimerState.PENDING);

    if (time) timerDuration.current = time;
  };

  const handleTimeChange = (time: number) => {
    resetTimer(time);
  };

  return (
    <main className={styles.container}>
      <TimerInputForm handleTimeChange={handleTimeChange} />

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
          onClick={() => resetTimer()}
        />
      </div>
    </main>
  );
};

export default Timer;
