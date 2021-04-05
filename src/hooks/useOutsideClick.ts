import { useEffect } from 'react';

/**
 * Handle Outside Click by using Hooks,
 * How to use you can see in this project in Select Component,
 * Or just google it.
 */
export const useOutsideClick = (ref: any, callback: any) => {
  const handleClick = (event: any) => {
    if (!ref.current || ref.current.contains(event.target)) {
      return;
    }
    callback(event);
  };

  useEffect(
    () => {
      document.addEventListener('mousedown', handleClick);
      document.addEventListener('touchstart', handleClick);

      return () => {
        document.removeEventListener('mousedown', handleClick);
        document.removeEventListener('touchstart', handleClick);
      };
    },
  );
};
