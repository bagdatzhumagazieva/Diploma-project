import React from 'react';
import classNames from 'classnames';

import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import CountDownTimer from 'src/pages/GamePages/Course/Quiz/CountDownTimer';

import { QuestionStatus } from 'src/pages/GamePages/Course/Test/consts';
import { getQuestionCard } from 'src/pages/GamePages/Course/Quiz/consts';
import { BattleQuizTypes } from 'src/pages/GamePages/Battles/Battle/Quiz/types';
import 'src/pages/GamePages/Battles/Battle/Quiz/index.scss';

function Quiz(props: BattleQuizTypes.IProps) {

  const { className, attemptQuestion, onClickNext, currentQuizNumber,
    totalQuizNumber, handleOpenQuestionChange, handlePhotoMarkPoints, handleSelectedIds,
    buttonLoading, questionResponse, buttonDisabled } = props;

  return (
    <div className={classNames('battle-quiz px-64 py-48', className)}>
      <div className="d-flex justify-content-between align-items-center mb-24">
        <Typography color="main_55" variant="h2">
          Вопрос {currentQuizNumber - 1 !== totalQuizNumber ? currentQuizNumber : currentQuizNumber - 1}
          /{totalQuizNumber}
        </Typography>
        <div className="d-flex align-items-center">
          <Typography variant="text" className="mr-8">Оставшееся время: </Typography>
          <CountDownTimer
            timeLimit={attemptQuestion?.timeLimit || 0}
            status={currentQuizNumber - 1 !== totalQuizNumber ? QuestionStatus.Answered : QuestionStatus.InProcess}
            handleTimeUp={() => onClickNext && onClickNext(true)}
          />
        </div>
      </div>
      <div className="battle-quiz__question d-flex p-24 flex-column">
        {attemptQuestion && (
          getQuestionCard(
            attemptQuestion,
            handleSelectedIds,
            handlePhotoMarkPoints,
            handleOpenQuestionChange,
            questionResponse.isCorrect,
            questionResponse.answerIds,
            questionResponse.correctMarkPoints,
          )
        )}
        <Button
          disabled={buttonDisabled || currentQuizNumber - 1 === totalQuizNumber}
          className="battle-quiz__button align-self-start"
          variant="text"
          onClick={() => onClickNext && onClickNext()}
          loading={buttonLoading}
        >
          Ответить
        </Button>
      </div>
      {/*{TODO make rubrics}*/}
      <Typography
        variant="subtext"
        color="grey_additional_2"
        className="mt-32"
      >
        {/*// TODO: add after*/}
        {/*Рубрики:*/}
      </Typography>
    </div>
  );
}

export default Quiz;
