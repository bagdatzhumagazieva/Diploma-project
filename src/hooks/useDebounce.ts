import { useState, useEffect } from 'react';

/**
 * Debouncing with React Hooks,
 * debounce API calls to ensure that they don't execute too frequently
 */
export default function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(
        () => {
          setDebouncedValue(value);
        },
        delay,
      );

      return () => {
        clearTimeout(handler);
      };
    },
    [value],
  );

  return debouncedValue;
}
