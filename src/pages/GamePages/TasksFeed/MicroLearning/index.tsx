import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { parseNumberToStringWithComma } from 'src/utils/format';
import moment from 'moment';

import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import CardBadge from 'src/components/atoms/Cards/CardBadge';
import Rate from 'src/components/atoms/Rate';
import Typography from 'src/components/atoms/Typography';
import MicroLearningText from 'src/components/atoms/MicroLearningText';
import Breadcrumb from 'src/components/atoms/BreadCrumb';
import FavoriteIcon from 'src/components/atoms/Svg/Icons/favorite';
import ProgressBar from 'src/components/atoms/ProgressBar';
import RadioImageStatistics from 'src/components/molecules/RadioImageStatistic';
import Open from 'src/components/molecules/Questions/Open';
import Single from 'src/components/molecules/Questions/Single';
import RadioImage from 'src/components/molecules/Questions/RadioImage';
import Modal from 'src/components/molecules/Modal';
import Multiple from 'src/components/molecules/Questions/Multiple';
import PhotoMark from 'src/components/molecules/Questions/PhotoMark';
import Cloud from 'src/components/molecules/Questions/Cloud';
import Comments from 'src/components/organisms/Comments';
import Layout from 'src/components/organisms/Layout';

import {
  getDetailTask, createAttemptTask, makeFavourTask,
  deleteFavourTask, clearDetailTask,
} from 'src/store/task/actions';

import { createRating } from 'src/store/rate/actions';
import { RouterPaths } from 'src/core/enum';
import { addSlash } from 'src/core/components/router';
import { ReactComponent as IconNotification } from 'src/assets/img/icons/icon-notification--info.svg';
import { MicrolearningPageTypes } from 'src/pages/GamePages/TasksFeed/MicroLearning/types';
import { CardTypes } from 'src/store/card/types';
import { CreateAttemptTask, TaskAggregatorTypes } from 'src/store/task/types';
import { VerificationQuestions } from 'src/components/organisms/CardCreation/CardVerificationQuestion/consts';
import { EXERCISE_TYPES } from 'src/components/molecules/Cards/CardMicroLearning/consts';
import StarIcon from 'src/assets/img/icons/star.svg';
import ClockIcon from 'src/assets/img/icons/clock.svg';
import CoinIcon from 'src/assets/img/icons/coin.svg';
import IconSuccess from 'src/assets/img/test/success.svg';
import IconFail from 'src/assets/img/test/fail.svg';
import 'src/pages/GamePages/TasksFeed/MicroLearning/index.scss';

function MicroLearningPage(props: MicrolearningPageTypes.IProps) {
  const {
    location, onCreateAttemptTask, createdAttemptLoading,
    onGetDetailTask, onMakeFavorite, onDeleteFavorite, onSendRating,
    detailTask, attemptResult, clearDetailTask,
  } = props;
  const [favorite, setFavorite] = useState<boolean>(false);
  const [rate, setRate] = useState<number>(0);
  const [responseTask, setResponseTask] = useState<CreateAttemptTask.IRender[]>([]);
  const [errorMessagesIds, setErrorMessagesIds] = useState<CreateAttemptTask.IRender[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isFinishedTask, setIsFinishedTask] = useState<boolean>(false);
  const taskId = [...location.pathname.split('/')].pop();
  const finishedTask = isFinishedTask || detailTask?.isFinished;
  const isQuizOrTest = detailTask?.type === EXERCISE_TYPES.POLL || detailTask?.type === EXERCISE_TYPES.TEST;

  useEffect(
    () => {
      window.scrollTo(0, 0);
      taskId && onGetDetailTask && onGetDetailTask(+taskId);

      return () => {
        clearDetailTask && clearDetailTask();
      };
    },
    []);

  useEffect(
    () => {
      if (detailTask) {
        setFavorite((detailTask && detailTask.isFavorite) || false);
        setRate(detailTask?.userRating || 0);
        if (detailTask?.questions) {
          const responseAnswer = detailTask?.questions.map(e => ({
            type: e.questionType, cardId: e.cardId,
          }));
          setResponseTask(responseAnswer);
        }
      }
    },
    [detailTask],
  );

  const handleRemoveError = (cardId: number) => {
    const newError = errorMessagesIds.filter(e => e.cardId !== cardId);
    setErrorMessagesIds(newError);
  };

  const handleChangeOpenQuestion = (cardId: number, type: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const newResponse = responseTask.map(e => e.cardId === cardId ? { ...e, answerText: event.target.value } : e);
    setResponseTask(newResponse);
    handleRemoveError(cardId);
  };

  const handleChangeSingleQuestion = (cardId: number, type: string, id: number) => {
    const newResponse = responseTask.map(e => e.cardId === cardId ? { ...e, answerIds: [id] } : e);
    setResponseTask(newResponse);
    handleRemoveError(cardId);
  };

  const handleChangeMultipleQuestion = (cardId: number, type: string, ids: number[]) => {
    const newResponse = responseTask.map(e => e.cardId === cardId ? { ...e, answerIds: ids } : e);
    setResponseTask(newResponse);
    handleRemoveError(cardId);
  };

  const handleChangePhotoMarkQuestion =
    (cardId: number, type: string, marks: CardTypes.ICardQuestionMarkPointPosition[]) => {
      const newResponse = responseTask.map(e => e.cardId === cardId ? { ...e, markPoints: marks } : e);
      setResponseTask(newResponse);
      handleRemoveError(cardId);
    };

  const onSendAnswer = () => {
    const newError = responseTask.filter(e =>
      (!e.answerIds?.length && !e.markPoints?.length && !e.answerText));
    if (newError.length === 0) {
      taskId && onCreateAttemptTask && onCreateAttemptTask(+taskId, responseTask, {
        onSuccess: () => {
          detailTask?.type === 'POLL' &&
            taskId && onGetDetailTask && onGetDetailTask(+taskId);
          setIsFinishedTask(true);
          setShowModal(true);
        },
      });
    } else {
      setErrorMessagesIds(newError);
    }
  };

  const handleSendRating = () => {
    rate && onSendRating && onSendRating({
      entityType: 'EXERCISE',
      entityUuid: detailTask?.uuid || '',
      value: rate,
    },                                   {
      onSuccess: () => {
        taskId && onGetDetailTask && onGetDetailTask(+taskId);
      },
    });
  };

  const handleClickFavorite = () => {
    if (!favorite) {
      taskId && onMakeFavorite && onMakeFavorite(+taskId, {
        onSuccess: () => {
          setFavorite(!favorite);
        },
      });
    } else {
      taskId && onDeleteFavorite && onDeleteFavorite(+taskId, {
        onSuccess: () => {
          setFavorite(!favorite);
        },
      });
    }
  };

  return (
    <Layout className="micro-learning-page">
      {detailTask && (
        <div className="micro-learning-page__content py-48">
          <div className="grid d-flex flex-column">
            <Breadcrumb
              items={[
                { label: 'Задания', link: addSlash(RouterPaths.TASKS_FEED) },
                { label: detailTask?.name || '' },
              ]}
              className="mb-24"
            />
            <div className="d-flex justify-content-between">
              <div className="micro-learning-page__main py-48 px-64 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-center mb-24">
                  {detailTask.type && <MicroLearningText type={detailTask.type} />}
                  <div className="d-flex align-items-center">
                    <Button
                      type="link"
                      variant="subtext"
                      className="d-flex align-items-center"
                    >
                      <FavoriteIcon
                        active={favorite}
                        bordered
                        className="micro-learning__favorite-image mr-10"
                        onClick={handleClickFavorite}
                      />
                      В избранное
                    </Button>
                  </div>
                </div>
                <Typography variant="h1" className="mb-16">{detailTask?.name}</Typography>
                <div className="micro-learning__mini-info d-flex justify-content-between align-items-center mb-24">
                  <div className="d-flex">
                    <CardBadge
                      icon={CoinIcon}
                      title={`+${detailTask?.rewardAmount}`}
                      className="mini-info__card-badge--coins mr-12"
                    />
                    <CardBadge
                      icon={ClockIcon}
                      title={`${detailTask?.minutesToFinish || '-'} мин.`}
                      className="mini-info__card-badge--time mr-8"
                    />
                    <CardBadge
                      icon={StarIcon}
                      title={parseNumberToStringWithComma(detailTask.rating)}
                      className="mini-info__card-badge--rating"
                    />
                  </div>
                  <Typography variant="subtext">
                    {detailTask?.publishDatetime && moment(detailTask.publishDatetime).format('DD.MM.YYYY')}
                  </Typography>
                </div>
                {detailTask?.imageUrl && (
                  <Image alt="article" src={detailTask?.imageUrl} className="mt-24 fill_w" />
                )}
                {detailTask?.mainCardDescription && (
                  <div
                    className="mt-24 inner-html mini-info__descr pl-32 mt-24"
                    dangerouslySetInnerHTML={{ __html: detailTask?.mainCardDescription || '' }}
                  />
                )}
                {detailTask?.mainCardContent && (
                  <div
                    className="mt-24 inner-html"
                    dangerouslySetInnerHTML={{ __html: detailTask?.mainCardContent || '' }}
                  />
                )}
                <Typography variant="text" className="mt-48 mb-12">{detailTask.mainCardInstruction}</Typography>
                {detailTask?.type === 'POLL' && finishedTask ? (
                  <div className="mini-info__cards p-24">
                    {detailTask?.questions.map((card: TaskAggregatorTypes.IRenderQuestion, i) => {
                      const { questionType, questionText, description, content, answerOptions } = card;
                      const pollResult = detailTask?.pollResults.find(e => e.cardId === card.cardId);
                      const completeResult = detailTask?.completeAttempt?.find(e => e.cardId === card.cardId);
                      const getValue = (id: number) => {
                        const a = pollResult?.answerIds.find(p => p[id]);
                        return a || {};
                      };
                      return (
                        <div
                          key={i + 1}
                          className="mt-24 d-flex flex-column"
                        >
                          <Typography variant="h2">
                            {`${i + 1}. ${questionText}`}
                          </Typography>
                          <div className="ml-24">
                            {questionType === VerificationQuestions.SequenceFromList ? (
                              <Cloud
                                title=""
                                instruction={description || ''}
                                appendix={content || ''}
                                initValues={completeResult?.answerIds || []}
                                options={answerOptions?.map(n => ({ ...n, text: n.text || '' })) || []}
                              />
                            ) :
                              questionType === VerificationQuestions.OpenQuestion ? (
                                <Typography variant="text mt-16">
                                  {completeResult?.answerText || ''}
                                </Typography>
                              ) :
                                questionType === VerificationQuestions.OneOfList ||
                                questionType === VerificationQuestions.FewFromList ? (
                                  <div>
                                    {answerOptions.map((e, index) => (
                                      <div
                                        key={index}
                                        className="mini-info__cards--single mt-24"
                                      >
                                        <Typography variant="text">{e.text || ''}</Typography>
                                        <ProgressBar percent={getValue(e.id)[e.id] || 0} className="mt-16" />
                                      </div>
                                    ))}
                                  </div>
                                ) :
                                questionType === VerificationQuestions.ImageFromList ? (
                                    <div className="mini-info__cards--radio-image p-16 mt-16">
                                      {answerOptions?.map((answer, i) => (
                                        <RadioImageStatistics
                                          key={i}
                                          image={answer.imageThumbnailUrl || ''}
                                          percent={getValue(answer.id)[answer.id] || 0}
                                          className="p-8"
                                        />
                                      ))}
                                    </div>
                                ) :
                                questionType === VerificationQuestions.QuestionPhotoTag && (
                                    <PhotoMark
                                      isStatistic
                                      title=""
                                      initValues={completeResult?.markPoints || []}
                                      image={{
                                        id: '',
                                        imageUrl: answerOptions[0].imageUrl || '',
                                      }}
                                      marksCount={completeResult?.markPoints?.length || 0}
                                    />
                                )
                            }
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) :
                detailTask?.questions.length > 0 &&
                  <div className="mini-info__cards p-24 mt-16">
                    {detailTask?.questions.map((card: TaskAggregatorTypes.IRenderQuestion, i) => {
                      const { questionText, questionType, description, content, answerOptions } = card;
                      const completeResult = detailTask?.completeAttempt?.find(e => e.cardId === card.cardId);
                      const attemptRes = attemptResult?.questions?.find(e => e.cardId === card.cardId);
                      const title = (isQuizOrTest ? `${(i + 1)}. ` : '') + questionText;
                      return (
                        <div className="mb-48" key={card.id}>
                          {questionType === VerificationQuestions.OpenQuestion ? (
                              !finishedTask ?
                                <Open
                                  title={title}
                                  instruction={description || ''}
                                  appendix={content || ''}
                                  onChange={e => handleChangeOpenQuestion(card.cardId, 'OPEN', e)}
                                /> :
                                <Open
                                  isChecked={finishedTask}
                                  initialValue={attemptRes?.answerText || completeResult?.answerText || ''}
                                  title={title}
                                  isCorrect={attemptRes?.isCorrect || completeResult?.isCorrect}
                                  instruction={description || ''}
                                  appendix={content || ''}
                                  onChange={e => handleChangeOpenQuestion(card.cardId, 'OPEN', e)}
                                />
                            ) :
                            questionType === VerificationQuestions.OneOfList ? (
                              !finishedTask ?
                                <Single
                                  title={title}
                                  appendix={content || ''}
                                  options={answerOptions?.map(n => ({ ...n, text: n.text || '' })) || []}
                                  handleClickedAnswer={(id: number) =>
                                    handleChangeSingleQuestion(card.cardId, questionType, id)}
                                /> :
                                <Single
                                  title={title}
                                  isChecked={finishedTask}
                                  selectedVal={(attemptRes?.answerIds && attemptRes.answerIds[0]) ||
                                  (completeResult?.answerIds && completeResult?.answerIds[0]) || 0}
                                  correctAnswerId={(attemptRes?.correctAnswerIds && attemptRes.correctAnswerIds[0]) ||
                                    (completeResult?.correctAnswerIds ? completeResult.correctAnswerIds[0] : 0)}
                                  instruction={description || ''}
                                  appendix={content || ''}
                                  options={answerOptions?.map(n => ({ ...n, text: n.text || '' })) || []}
                                  handleClickedAnswer={(id: number) =>
                                    handleChangeSingleQuestion(card.cardId, questionType, id)}
                                />
                              ) :
                              questionType === VerificationQuestions.ImageFromList ? (
                                !finishedTask ?
                                  <RadioImage
                                    title={title}
                                    instruction={description || ''}
                                    appendix={content || ''}
                                    selectedImage={0}
                                    images={answerOptions?.map(n =>
                                      ({ id: n.id, src: n.imageUrl || '', text: n.text || '' })) || []}
                                    handleClickedAnswer={(id: number) =>
                                      handleChangeSingleQuestion(card.cardId, questionType, id)}
                                  /> :
                                  <RadioImage
                                    isChecked={finishedTask}
                                    correctAnswerId={(attemptRes?.correctAnswerIds && attemptRes.correctAnswerIds[0]) ||
                                    ((completeResult?.correctAnswerIds && completeResult?.correctAnswerIds[0]) || 0)}
                                    title={title}
                                    instruction={description || ''}
                                    appendix={content || ''}
                                    selectedImage={(attemptRes?.answerIds && attemptRes.answerIds[0]) ||
                                    (completeResult?.answerIds && completeResult.answerIds[0]) || 0}
                                    images={answerOptions?.map(n =>
                                      ({ id: n.id, src: n.imageUrl || '', text: n.text || '' })) || []}
                                    handleClickedAnswer={(id: number) =>
                                      handleChangeSingleQuestion(card.cardId, questionType, id)}
                                  />
                                ) :
                                questionType === VerificationQuestions.FewFromList ? (
                                  !finishedTask ?
                                    <Multiple
                                      instruction={description || ''}
                                      appendix={content || ''}
                                      title={title}
                                      options={answerOptions?.map(n => ({ ...n, text: n.text || '' })) || []}
                                      handleSelectedAnswers={(ids: number[]) =>
                                        handleChangeMultipleQuestion(card.cardId, questionType, ids)}
                                    /> :
                                    <Multiple
                                      isChecked={finishedTask}
                                      correctAnswerIds={attemptRes?.correctAnswerIds ||
                                        completeResult?.correctAnswerIds || []}
                                      instruction={description || ''}
                                      appendix={content || ''}
                                      initValues={attemptRes?.answerIds || completeResult?.answerIds || []}
                                      title={title}
                                      options={answerOptions?.map(n => ({ ...n, text: n.text || '' })) || []}
                                      handleSelectedAnswers={(ids: number[]) =>
                                        handleChangeMultipleQuestion(card.cardId, questionType, ids)}
                                    />
                                  ) :
                                  questionType === VerificationQuestions.SequenceFromList ? (
                                    !finishedTask ?
                                      <Cloud
                                        title={title}
                                        instruction={description || ''}
                                        appendix={content || ''}
                                        options={answerOptions?.map(n => ({ ...n, text: n.text || '' })) || []}
                                        handleSelectedAnswers={(ids: number[]) =>
                                          handleChangeMultipleQuestion(card.cardId, questionType, ids)}
                                      /> :
                                      <Cloud
                                        isChecked={finishedTask}
                                        title={title}
                                        instruction={description || ''}
                                        isCorrect={attemptRes?.isCorrect || completeResult?.isCorrect}
                                        initValues={attemptRes?.answerIds || completeResult?.answerIds || []}
                                        appendix={content || ''}
                                        options={answerOptions?.map(n => ({ ...n, text: n.text || '' })) || []}
                                        handleSelectedAnswers={(ids: number[]) =>
                                          handleChangeMultipleQuestion(card.cardId, questionType, ids)}
                                      />
                                    ) :
                                    questionType === VerificationQuestions.QuestionPhotoTag && (
                                      !finishedTask ?
                                        <PhotoMark
                                          title={title}
                                          instruction={description || ''}
                                          appendix={content || ''}
                                          image={{
                                            id: answerOptions ? answerOptions[0].uuid : '',
                                            imageUrl: (answerOptions && answerOptions[0]?.imageUrl) || '',
                                          }}
                                          marksCount={card?.markPointsNumber || 0}
                                          handleSelectedAnswers={(marks: CardTypes.ICardQuestionMarkPointPosition[]) =>
                                            handleChangePhotoMarkQuestion(card.cardId, questionType, marks)}
                                        /> :
                                        <PhotoMark
                                          isChecked={finishedTask}
                                          title={title}
                                          instruction={description || ''}
                                          initValues={attemptRes?.markPoints || completeResult?.markPoints || []}
                                          correctMarkPoints={attemptRes?.correctMarkPoints ||
                                            completeResult?.correctMarkPoints || []}
                                          appendix={content || ''}
                                          image={{
                                            id: answerOptions ? answerOptions[0].uuid : '',
                                            imageUrl: (answerOptions && answerOptions[0]?.imageUrl) || '',
                                          }}
                                          marksCount={card?.markPointsNumber || 0}
                                          handleSelectedAnswers={(marks: CardTypes.ICardQuestionMarkPointPosition[]) =>
                                            handleChangePhotoMarkQuestion(card.cardId, questionType, marks)}
                                        />
                                    )}
                          {errorMessagesIds.findIndex(e => e.cardId === card.cardId) !== -1 && (
                            <div className="d-flex text-center align-items-center">
                              <IconNotification className="mini-info__cards__error-img" />
                              <Typography
                                className="color_red ml-8"
                                variant="xsmall">Вы не ответили на вопрос</Typography>
                            </div>
                          )}
                        </div>
                      );
                    })}
                      <Button
                          disabled={finishedTask}
                          onClick={onSendAnswer}
                          variant="textmed"
                          loading={createdAttemptLoading}
                          className="mb-16 h-auto"
                      >
                          Отправить
                      </Button>
                      <br/>
                    {finishedTask &&
                      <Typography variant="text" color="green">
                          Задание выполнено!
                      </Typography>
                    }
                  </div>
                }
                {showModal && attemptResult?.rewardAmount && (
                  <Modal
                    width={496}
                    title={
                      detailTask.rewardAmount === attemptResult?.rewardAmount
                        ? 'Поздравляем!' : 'Задание пройдено с неверным ответом!'}
                    onCloseClick={() => setShowModal(false)}
                  >
                    <div className="px-32 d-flex flex-column">
                      <div className="d-flex align-items-center text-left">
                        <Typography variant="textmed" className="mr-8">
                          {detailTask.rewardAmount === attemptResult?.rewardAmount
                            ? 'Ваш выигрыш: ' : 'Вы получили: '}
                        </Typography>
                        <div className="d-flex align-items-center">
                          <Typography variant="h2" color="main_50">+{attemptResult?.rewardAmount || 0}</Typography>
                          <Image
                            alt="Coin"
                            src={CoinIcon}
                            style={{ width: '14px', height: '14px' }}
                            className="ml-2"
                          />
                        </div>
                      </div>
                      <Image
                        alt="Success"
                        src={ detailTask.rewardAmount === attemptResult?.rewardAmount
                          ? IconSuccess : IconFail }
                        className="align-items-center m-24"
                      />
                    </div>
                  </Modal>
                )}

                <Typography variant="textmed" className="mt-24">
                  Понравилась ли вам данная запись? Поставьте оценку
                </Typography>
                <Rate
                  disabled={!!detailTask?.userRating}
                  className="mt-24"
                  onChange={setRate}
                  value={detailTask?.userRating || rate}
                />
                {detailTask?.userRating ?
                  <Typography variant="text" color="green" className="mt-24">
                      Благодарим за вашу оценку!
                  </Typography> :
                  rate ?
                    <Button
                      onClick={handleSendRating}
                      variant="textmed"
                      className="micro-learning-page__btn mt-24"
                    >
                      Отправить
                    </Button>
                    : ''
                }
                <Typography variant="subtext" color="grey_additional_2" className="mb-4 mt-32">Тэги:</Typography>
                <div className="micro-learning-page__tags d-flex flex-wrap mt-2">
                  <Typography variant="subtext" color="main_50" className="mt-8">
                    {detailTask?.tags?.map(e => `#${e.name} `)}
                  </Typography>
                </div>
                <Comments
                  type="EXERCISE"
                  uuid={detailTask?.uuid}
                  className="mt-32"
                />
              </div>
              <div className="micro-learning-page__sidebar">
                {/* todo: banner from back */}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  detailTask: state.taskReducer.detailTask.data,
  createdAttemptData: state.taskReducer.createdAttemptState.data,
  createdAttemptLoading: state.taskReducer.createdAttemptState.loading,
  attemptResult: state.taskReducer.createdAttemptState.data,
});

const mapDispatchToProps = {
  clearDetailTask,
  onGetDetailTask: getDetailTask,
  onCreateAttemptTask: createAttemptTask,
  onMakeFavorite: makeFavourTask,
  onDeleteFavorite: deleteFavourTask,
  onSendRating: createRating,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(MicroLearningPage));
