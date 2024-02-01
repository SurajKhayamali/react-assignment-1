import { KeyboardEvent } from 'react';

export const handleEnterKeyPress =
  (cb: () => void) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    cb();
  };
