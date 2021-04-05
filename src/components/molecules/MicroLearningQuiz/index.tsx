import React, { useState } from 'react';
import classNames from 'classnames';
import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';
import { MicroLearningQuizTypes,  IOptionWithResult, IOption } from 'src/components/molecules/MicroLearningQuiz/types';
import AlertIcon from 'src/assets/img/icons/alert.svg';
import './index.scss';

function MicroLearningQuiz(props: MicroLearningQuizTypes.IProps) {
  const {
    id, title, options,
    className, correctAnswerId, index,
    showAnswer = false,
    showButtonPressed = false,
    handleSelectedAnswer: propsHandleSelectedAnswer,
  } = props;
  const [selectedAnswer, setSelectedAnswer] = useState<IOptionWithResult | null>(null);
  const handleSelectedAnswer = (item: IOption) => () => {
    propsHandleSelectedAnswer && propsHandleSelectedAnswer({ correctAnswerId, id, selectedAnswerId: item.id });
    setSelectedAnswer({ ...item, isCorrect: correctAnswerId === item.id });
  };

  const getAnswerState = (state: string, answerId: string): boolean | null => {
    switch (state) {
      case 'right':
        return selectedAnswer && selectedAnswer.id === answerId && correctAnswerId === answerId && showAnswer;
      case 'wrong':
        return selectedAnswer && selectedAnswer.id === answerId && correctAnswerId !== answerId && showAnswer;
      // state == 'selected'
      default:
        return selectedAnswer && selectedAnswer.id === answerId && !showAnswer;
    }
  };

  return (
    <div className={classNames('micro-learning-quiz d-flex flex-column', className)}>
      <Typography variant="h2" className="mb-16">{index ? `${index}. ` : ''}{title}</Typography>
      {options.map((item, index) => (
        <Button
          key={index + 1}
          variant="textmed"
          className={
            classNames(
              'micro-learning-quiz__button mb-16 py-16 px-24 text-left',
              { 'micro-learning-quiz__button--selected': getAnswerState('selected', item.id) },
              { 'micro-learning-quiz__button--right': getAnswerState('right', item.id) },
              { 'micro-learning-quiz__button--wrong': getAnswerState('wrong', item.id) },
            )}
          disabled={!!selectedAnswer && showAnswer}
          onClick={handleSelectedAnswer(item)}
        >
          {`${index + 1}. ${item.title}`}
        </Button>
      ))}
      {showButtonPressed && !selectedAnswer && (
        <Typography
          variant="subtext"
          color="red"
          className="mt-8 d-flex align-items-center"
        >
          <Image
            alt="alert icon"
            src={AlertIcon}
            className="micro-learning-quiz__alert-image mr-8"
          />
          Это обязательный вопрос
        </Typography>
      )}
    </div>
  );
}

export default MicroLearningQuiz;
