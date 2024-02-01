import { KeyboardEvent } from 'react';

export const handleEnterKeyPress =
  (cb: () => void) => (e: KeyboardEvent<HTMLInputElement>) => {
    // console.log(e.key);
    if (e.key !== 'Enter') return;

    cb();
  };
