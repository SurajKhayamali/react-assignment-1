import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { DEFAULT_TIME } from './timer.constant';
import { TimerStatus } from './timer.enum';

export interface TimerState {
  duration: number;
  remaining: number;
  status: TimerStatus;
  // ref?: NodeJS.Timeout;
}

const initialState: TimerState = {
  duration: 0,
  remaining: 0,
  status: TimerStatus.PENDING,
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    start: (state, action: PayloadAction<number | undefined>) => {
      state.duration = action.payload || DEFAULT_TIME;
      state.remaining = action.payload || DEFAULT_TIME;
      state.status = TimerStatus.PENDING;
      // state.ref = undefined;

      // // Block from resume
      // if (state.ref) return;

      // state.ref = setInterval(() => {
      //   if (state.remaining > 0) {
      //     state.remaining -= 1;
      //     return;
      //   }

      //   state.remaining = 0;
      //   state.status = TimerStatus.STOPPED;
      // }, TIMER_INTERVAL);
    },
    pause: (state) => {
      // clearInterval(state.ref);
      // state.ref = undefined;
      state.status = TimerStatus.PAUSED;
    },
    resume: (state) => {
      state.status = TimerStatus.RUNNING;
      // if (state.ref) return;

      // state.ref = setInterval(() => {
      //   if (state.remaining > 0) {
      //     state.remaining -= 1;
      //     return;
      //   }

      //   state.remaining = 0;
      //   state.status = TimerStatus.STOPPED;
      // }, TIMER_INTERVAL);
    },
    reset: (state, action: PayloadAction<number | undefined>) => {
      // Block from pause
      // clearInterval(state.ref);
      // state.ref = undefined;
      state.status = TimerStatus.PAUSED;

      if (action.payload) {
        state.duration = action.payload;
        state.remaining = action.payload;
      } else {
        state.remaining = state.duration;
      }
    },
    decrement: (state) => {
      if (state.remaining > 0) {
        state.remaining -= 1;
        return;
      }

      state.remaining = 0;
      state.status = TimerStatus.STOPPED;
    },
  },
});

// Action creators are generated for each case reducer function
export const { start, pause, resume, reset, decrement } = timerSlice.actions;

export default timerSlice.reducer;
