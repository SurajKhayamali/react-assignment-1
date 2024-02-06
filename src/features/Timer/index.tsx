import { useRef } from 'react';

import Button from '../../compoments/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import styles from './index.module.css';
import { DEFAULT_TIME, TIMER_INTERVAL } from './timer.constant';
import { TimerStatus } from './timer.enum';
import { decrement, pause, reset, resume, start } from './timerSlice';

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
  const { remaining, status } = useAppSelector((state) => state.timer);
  const dispatch = useAppDispatch();

  const startTimer = () => {
    dispatch(start(timerDuration.current));
    resumeTimer();
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = undefined;

    dispatch(pause());
  };

  const resumeTimer = () => {
    dispatch(resume());
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      dispatch(decrement());
    }, TIMER_INTERVAL);
  };

  const resetTimer = (time?: number) => {
    pauseTimer();
    dispatch(reset(time));
  };

  const handleTimeChange = (time: number) => {
    resetTimer(time);
  };

  return (
    <main className={styles.container}>
      <TimerInputForm handleTimeChange={handleTimeChange} />

      <DisplayTime time={remaining} />

      <div className={styles.buttonSection}>
        {status === TimerStatus.PENDING && (
          <Button
            title="Start"
            size="lg"
            variant="primary"
            onClick={startTimer}
          />
        )}

        {status === TimerStatus.PAUSED && (
          <Button
            title="Resume"
            size="lg"
            variant="primary"
            onClick={resumeTimer}
          />
        )}

        {status === TimerStatus.RUNNING && (
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
