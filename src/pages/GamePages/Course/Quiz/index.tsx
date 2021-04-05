import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';

import {
  answerToTestQuestion, attemptToTestQuestion, getCourseTestCompleteResult,
  getModuleTestCompleteResult, getTestAttemptQuestion,
} from 'src/store/courseComplete/actions';
import { getCertificateById } from 'src/store/certificate/actions';
import Typography from 'src/components/atoms/Typography';
import Button from 'src/components/atoms/Button';
import CountDownTimer from 'src/pages/GamePages/Course/Quiz/CountDownTimer';
import ModalTestResult from 'src/pages/GamePages/Course/Test/ModalTestResult';
import ModalCourseExamSuccess from 'src/pages/GamePages/Course/Quiz/ModalCourseExamSuccess';

import { QuizTypes } from 'src/pages/GamePages/Course/Quiz/types';
import { CardTypes } from 'src/store/card/types';
import { CourseCompleteTypes } from 'src/store/courseComplete/types';
import { checkIsValid, getQuestionCard, QUESTION_RESPONSE } from 'src/pages/GamePages/Course/Quiz/consts';
import { QuestionStatus } from 'src/pages/GamePages/Course/Test/consts';
import { CertificateTypes } from 'src/store/certificate/types';
import 'src/pages/GamePages/Course/Quiz/index.scss';

const SuccessSound = require('src/assets/sound/success-sound.mp3');
const ErrorSound = require('src/assets/sound/error-sound.mp3');

function Quiz(props: QuizTypes.IProps) {
  const {
    cardIds, attemptToTestQuestion, completeAttemptId, courseId,
    answerToTestQuestion, getModuleTestCompleteResult, moduleId,
    curModuleFirstCardId, isLastModule, nextModuleId, type,
    getCourseTestCompleteResult, getCertificateById, getTestAttemptQuestion,
  } = props;

  const [curIndex, setCurIndex] = useState<number>();
  const [attemptQuestion, setAttemptQuestion] = useState<CourseCompleteTypes.IRenderAttemptQuestion>();
  const [testResult, setTestResult] = useState<QuizTypes.ITestResult>();
  const [questionResponse, setQuestionResponse] = useState<QuizTypes.IQuestionResponse>(QUESTION_RESPONSE);
  const [curQuestionStatus, setCurQuestionStatus] = useState<QuestionStatus>(QuestionStatus.InProcess);
  const [certificate, setCertificate] = useState<CertificateTypes.IRenderProps>();
  const [audioSuccess] = useState(new Audio(SuccessSound));
  const [audioError] = useState(new Audio(ErrorSound));
  const [answerBody, setAnswerBody] = useState<CourseCompleteTypes.IQuestionCompleteBody>();

  const defaultQuestionCompleteBody: CourseCompleteTypes.IQuestionCompleteBody = {
    cardId: cardIds.length > 0 ? cardIds[0] : undefined,
    type: attemptQuestion?.question.questionType,
  };

  const handleOpenQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerBody({ ...defaultQuestionCompleteBody, answerText: event.target.value });
  };

  const handleSelectedIds = (ids: number[]) => {
    setAnswerBody({ ...defaultQuestionCompleteBody, answerIds: ids });
  };

  const handlePhotoMarkPoints = (points: CardTypes.ICardQuestionMarkPointPosition[]) => {
    setAnswerBody({ ...defaultQuestionCompleteBody, markPoints: points });
  };

  useEffect(
    () => {
      if (cardIds.length < 1) return;
      setCurIndex(0);
    },
    [cardIds],
  );

  useEffect(
    () => {
      return () => {
        if (!completeAttemptId) return;
        if (type === 'module') {
          if (!moduleId) return;
          getModuleTestCompleteResult && getModuleTestCompleteResult(courseId, moduleId, completeAttemptId);
        } else {
          getCourseTestCompleteResult && getCourseTestCompleteResult(courseId, completeAttemptId);
        }
      };
    },
    [completeAttemptId, type, moduleId],
  );

  useEffect(
    () => {
      if (curIndex === undefined || completeAttemptId === undefined) return;
      setCurQuestionStatus(QuestionStatus.InProcess);
      onAttemptToTestQuestion(cardIds[curIndex], completeAttemptId);
    },
    [curIndex, completeAttemptId],
  );

  const onAttemptToTestQuestion = (curCardId: number, completeAttemptId: number) => {
    attemptToTestQuestion && attemptToTestQuestion(completeAttemptId, curCardId, {
      onSuccess: (response: CourseCompleteTypes.IRenderAttemptQuestion | undefined) => {
        if (!response) return;
        setAttemptQuestion(response);
      },
    });
  };

  const onNextButtonClick = () => {
    setCurQuestionStatus(QuestionStatus.Answered);
    const isTheLastQuestion = curIndex === cardIds.length - 1;
    if (!attemptQuestion || !attemptQuestion.id || !answerBody ||
      !answerBody.cardId || curIndex === undefined || !completeAttemptId) return;

    answerToTestQuestion && answerToTestQuestion(
      completeAttemptId,
      attemptQuestion.id,
      { ...answerBody, cardId: cardIds[curIndex] }, {
        onSuccess: (response: any) => {
          if (!response) return;
          setCurQuestionStatus(response.is_correct ? QuestionStatus.Correct : QuestionStatus.Wrong);
          response.is_correct ? audioSuccess.play() : audioError.play();
          setQuestionResponse({
            isCorrect: response.is_correct,
            answerIds: response.correct_answer_ids,
            correctMarkPoints: response.correct_mark_points,
          });
          nextQuestionOrResult(isTheLastQuestion, curIndex);
        },
      });
  };

  const nextQuestionOrResult = (isTheLastQuestion: boolean, curIndex: number) => {
    const timerId = setTimeout(
      () => {
        if (!isTheLastQuestion) {
          setCurIndex(curIndex + 1);
          setQuestionResponse(QUESTION_RESPONSE);
          setAttemptQuestion(undefined);
        } else {
          getResultsOfTest();
        }
        clearTimeout(timerId);
      },
      3000,
    );
  };

  const getResultsOfTest = () => {
    if (!completeAttemptId) return;

    if (type === 'module') {
      if (!moduleId) return;
      getModuleTestCompleteResult && getModuleTestCompleteResult(courseId, moduleId, completeAttemptId, {
        onSuccess: (response: any) => {
          // todo change
          setTestResult(response);
        },
      });
    } else {
      getCourseTestCompleteResult && getCourseTestCompleteResult(courseId, completeAttemptId, {
        onSuccess: (response: any) => {
          // todo change
          if (typeof response.status !== 'string') return;
          if (response.status === 'success') {
            getCourseCertificateData(response.certificate_id);
          } else {
            setTestResult(response);
          }
        },
      });
    }
  };

  const getCourseCertificateData = (certificateId: number) => {
    getCertificateById && getCertificateById(certificateId, {
      onSuccess: (response: any) => {
        setCertificate(response);
      },
    });
  };

  const setInfoAboutTimeOut = () => {
    if (!completeAttemptId || !attemptQuestion) return;
    getTestAttemptQuestion && getTestAttemptQuestion(courseId, completeAttemptId, attemptQuestion.id);
  };

  // todo make time is up
  const handleTimeUp = () => {
    setCurQuestionStatus(QuestionStatus.TimeIsUp);
    audioError.play();
    if (curIndex === undefined) return;
    setInfoAboutTimeOut();
    // courseId: number, completeAttemptId: number, attemptQuestionId: number
    const isTheLastQuestion = curIndex === cardIds.length - 1;
    nextQuestionOrResult(isTheLastQuestion, curIndex);
  };

  return (
    <div className={classNames('quiz d-flex flex-column px-64 py-48', { covered: !attemptQuestion })}>
      <div className="d-flex justify-content-between align-items-center mb-24">
        <Typography color="main_55" variant="h2">
          Вопрос {curIndex !== undefined ? (curIndex + 1) : 0}/{cardIds.length}
        </Typography>
        <div className="d-flex align-items-center">
          <Typography variant="text" className="mr-8">Оставшееся время: </Typography>
          <CountDownTimer
            timeLimit={attemptQuestion?.question.timeLimit || 0}
            status={curQuestionStatus}
            handleTimeUp={handleTimeUp}
          />
        </div>
      </div>
      <div className={classNames(
        'quiz__question d-flex p-24 flex-column',
        { 'quiz__question-error': curQuestionStatus === QuestionStatus.TimeIsUp },
      )}>
        {attemptQuestion && (
          getQuestionCard(
            attemptQuestion.question,
            handleSelectedIds,
            handlePhotoMarkPoints,
            handleOpenQuestionChange,
            questionResponse.isCorrect,
            questionResponse.answerIds,
          )
        )}
        <Button
          className="quiz__button"
          variant="text"
          onClick={onNextButtonClick}
          disabled={
            curQuestionStatus !== QuestionStatus.InProcess ||
            !checkIsValid(attemptQuestion?.question?.questionType,
                          answerBody, attemptQuestion?.question?.answerOptions,
                          attemptQuestion?.question?.markPointsCount)}
        >
          Следующий вопрос
        </Button>
      </div>
      {testResult && ((testResult.status !== 'success') || (type !== 'course')) && (
        <ModalTestResult
          type={type}
          isSuccess={testResult.status === 'success'}
          courseId={courseId}
          curModuleId={moduleId}
          curModuleFirstCardId={curModuleFirstCardId}
          isLastModule={isLastModule}
          nextModuleId={nextModuleId}
        />
      )}
      {certificate && certificate.courseId && (
        <ModalCourseExamSuccess
          imageUrl={certificate.image}
          onCloseClick={() => setCertificate(undefined)}
          courseName={certificate.courseName}
          percent={certificate.percent}
          userName={certificate.userName}
        />
      )}
    </div>
  );
}

const mapDispatchToProps = {
  attemptToTestQuestion,
  answerToTestQuestion,
  getModuleTestCompleteResult,
  getCourseTestCompleteResult,
  getCertificateById,
  getTestAttemptQuestion,
};

export default connect<any>(
  null,
  mapDispatchToProps,
)(Quiz);
