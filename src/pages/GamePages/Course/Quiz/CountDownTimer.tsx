import React, { useEffect, useState } from 'react';
import useCountDownTimer from 'src/hooks/useCountDownTimer';
import { QuestionStatus } from 'src/pages/GamePages/Course/Test/consts';
import Typography from 'src/components/atoms/Typography';
import { CountDownTimerTypes } from 'src/pages/GamePages/Course/Test/types';

function CountDownTimer(props: CountDownTimerTypes.IProps) {
  const { timeLimit: propsTimeLimit, handleTimeUp, status } = props;
  const [timeLimit, setTimeLimit] = useState<number>();
  const { seconds, minutes, isTimeUp } = useCountDownTimer(timeLimit, status !== QuestionStatus.InProcess);

  useEffect(
    () => {
      if (!isTimeUp) return;
      handleTimeUp && handleTimeUp();
    },
    [isTimeUp],
  );

  useEffect(
    () => {
      setTimeLimit(propsTimeLimit);
    },
    [propsTimeLimit],
  );

  return (
    <Typography variant="h1" className="color_red">
      {minutes}:{seconds}
    </Typography>
  );
}

export default CountDownTimer;
