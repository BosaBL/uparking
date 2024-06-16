import { useState } from 'react';

type SomeFunction = (...args: never) => void;
type Timer = ReturnType<typeof setTimeout>;

export default function useDebounce<Func extends SomeFunction>(
  func: Func,
  delay = 600
) {
  const [timer, setTimer] = useState<Timer>();

  const debouncedFunction = ((...args) => {
    const newTimer = setTimeout(() => {
      func(...args);
    }, delay);
    clearTimeout(timer);
    setTimer(newTimer);
  }) as Func;

  return debouncedFunction;
}
