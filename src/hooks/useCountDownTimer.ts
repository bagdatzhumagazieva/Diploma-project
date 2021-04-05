import { useEffect, useState } from 'react';

// get total seconds, every second decreases by one
// returns remains minutes and seconds as string in format `00`
export default  function useCountDownTimer(totalSeconds?: number, stopTimer?: boolean) {
  const [seconds, setSeconds] = useState<number>();
  const [timerId, setTimerId] = useState<any>();
  let tmpSeconds: number | undefined = undefined;

  const resetInterval = () => {
    clearInterval(timerId);
    const newTimerId = setInterval(
      () => {
        if (tmpSeconds && tmpSeconds > 0) {
          tmpSeconds = tmpSeconds ? tmpSeconds - 1 : undefined;
          setSeconds(tmpSeconds);
        }
      },
      1000,
    );
    setTimerId(newTimerId);
  };

  const stopInterval = () => {
    clearInterval(timerId);
    setTimerId(undefined);
  };

  useEffect(
    () => {
      if (!totalSeconds || totalSeconds === 0) {
        stopInterval();
        return;
      }
      tmpSeconds = totalSeconds;
      setSeconds(tmpSeconds);
      resetInterval();
    },
    [totalSeconds],
  );

  useEffect(
    () => {
      if (!stopTimer) return;
      clearInterval(timerId);
    },
    [stopTimer],
  );

  useEffect(
    () => {
      if (seconds !== undefined && seconds <= 0) {
        clearInterval(timerId);
        setSeconds(undefined);
      }
    },
    [seconds, timerId],
  );

  useEffect(
    () => {
      return () => {
        clearInterval(timerId);
      };
    },
    [timerId],
  );

  return {
    seconds: seconds ? (seconds % 60).toString().padStart(2, '0') : '00',
    minutes: seconds ? (Math.floor(seconds / 60)).toString().padStart(2, '0') : '00',
    isTimeUp: seconds !== undefined ? seconds <= 0 : false,
  };
}
