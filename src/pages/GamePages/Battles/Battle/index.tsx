import React, { useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router';
import { connect } from 'react-redux';

import Typography from 'src/components/atoms/Typography';
import Loader from 'src/components/atoms/Loader';
import Breadcrumb from 'src/components/atoms/BreadCrumb';
import Modal from 'src/components/molecules/Modal';
import BattleResults from 'src/components/molecules/BattleResults';
import Layout from 'src/components/organisms/Layout';
import Quiz from 'src/pages/GamePages/Battles/Battle/Quiz';
import ModalResult from 'src/pages/GamePages/Battles/Battle/ModalResult/ModalResult';

import { getBattleTest, createBattleTest, getBattleStatus, clearAttemptBattle } from 'src/store/battles/action';
import useNotification from 'src/components/molecules/Notification/useNotification';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';
import { LOCAL_STORAGE } from 'src/core/store/values';
import { CardTypes } from 'src/store/card/types';
import { BattlePageTypes } from 'src/pages/GamePages/Battles/Battle/types';
import { CourseCompleteTypes } from 'src/store/courseComplete/types';
import { parseBattleQuiz } from 'src/pages/GamePages/Battles/Battle/const';
import { VerificationQuestions } from 'src/components/organisms/CardCreation/CardVerificationQuestion/consts';
import { RouterPaths } from 'src/core/enum';
import { parseAttemptBattle } from 'src/store/battles/parsers';
import { QuizTypes } from 'src/pages/GamePages/Course/Quiz/types';
import { QUESTION_RESPONSE } from 'src/pages/GamePages/Course/Quiz/consts';
import { BattleModalTypes } from './ModalResult/types';
import { NotificationType } from 'src/components/molecules/Notification/types';
import { AttemptBattleTypes } from 'src/store/battles/types';
import { DEFAULT_NOTIFICATION_DATA } from 'src/components/organisms/CourseCreationEdition/consts';
const SuccessSound = require('src/assets/sound/success-sound.mp3');
const ErrorSound = require('src/assets/sound/error-sound.mp3');

function BattlePage(props: BattlePageTypes.IProps) {

  const { getBattleTest, battleTests, battleLoading, createBattleTest,
          profile, attemptBattleResponse, getBattleStatus, attemptBattleLoading,
          history, clearAttemptBattle, battleTestsError } = props;

  const [showModalResult, setShowModalResult] = useState(false);
  const [modalType, setModalType] = useState<BattleModalTypes.IProps>();
  const [curBattleId, setCurBattleId] = useState<number>(0);
  const [curBattleData, setCurBattleData] = useState<CardTypes.IRenderQuestion>();
  const [answerBody, setAnswerBody] = useState<CourseCompleteTypes.IQuestionCompleteBody>();
  const [curUserAttempt, setCurAttempt] = useState<AttemptBattleTypes.IRenderProps>();
  const [questionResponse, setQuestionResponse] = useState<QuizTypes.IQuestionResponse>(QUESTION_RESPONSE);
  const [userResult, setUserResult] = useState<{id: number, isCorrect: boolean}[]>([]);
  const [rivalUserResult, setRivalUserResult] = useState<{id: number, isCorrect: boolean}[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [audioSuccess] = useState(new Audio(SuccessSound));
  const [audioError] = useState(new Audio(ErrorSound));
  const notification = useNotification();

  const { id } = useParams();
  const battleId = id ? +id : -1;
  const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || 0;

  const breadCrumbItems = [
    { label: 'Главная', link: '/dashboard' },
    { label: 'Баттл', link: '' },
  ];

  useEffect(
    () => {
      const timeout = setTimeout(() => {
        if (curBattleId !== battleTests?.cards?.length && !battleTestsError) {
          setTimeLeft(timeLeft + 1);
        }
      },                         1000);
      return () => clearTimeout(timeout);
    });

  const addNotification = (type: NotificationType, description: string) => {
    notification.add(
      {
        type,
        description,
        withIcon: true,
        duration: 4000,
        size: 'small',
        width: '600px',
      });
  };

  useEffect(() => {
    localStorage.removeItem(LOCAL_STORAGE.BATTLE_FINISHED);
    setCurBattleData(undefined);
    getBattleTest && getBattleTest(+companyId, battleId, {
      onError: () => {
        notification.add({
          ...DEFAULT_NOTIFICATION_DATA,
          type: NotificationType.Danger,
          description: battleTestsError || 'Вы не можете перепройти баттл ' });
      },
    });
  },        []);

  useEffect(
    () => {
      setCurBattleData(undefined);
      clearAttemptBattle && clearAttemptBattle();
      return () => {
        setCurBattleData(undefined);
        clearAttemptBattle && clearAttemptBattle();
      };
    },
    [clearAttemptBattle],
  );

  useEffect(() => {
    if (battleTests?.cards && battleTests?.cards[curBattleId]) {
      const newBattle = battleTests?.cards[curBattleId];
      setCurBattleData(parseBattleQuiz(newBattle));
      setQuestionResponse(QUESTION_RESPONSE);
      setAnswerBody({ cardId: newBattle.cardId, type: newBattle.questionType as VerificationQuestions });
      setModalType({
        firstEmployeeName: `${battleTests.me.employment.firstName} ${battleTests.me.employment.lastName}`,
        firstUserRole: battleTests.me.employment.role,
        secondEmployeeName: `${battleTests.participant.employment.firstName} ${battleTests.participant.employment.lastName}`,
        secondUserRole: battleTests.participant.employment.role,
        type: '',
      });
    } else {
      setCurBattleData(undefined);
    }
  },        [battleTests, curBattleId]);

  const onNextQuiz = (timeIsUp?: boolean) => {
    const newAnswerBody = answerBody ? (timeIsUp ?
      { cardId: answerBody?.cardId, type: answerBody?.type, answerText: answerBody.type === 'OPEN' ? ' ' : undefined } :
    { ...answerBody,
      answerText: answerBody.type === 'OPEN' ? (answerBody.answerText || ' ') : undefined,
    }) : answerBody;
    newAnswerBody && createBattleTest && createBattleTest(newAnswerBody, battleId, +companyId, {
      onSuccess: (response: any) => {
        const parsedResponse = parseAttemptBattle(response.data).find(e => e.userId === profile?.id);

        const ress2 = parseAttemptBattle(response.data).find(n => n.userId !== profile?.id);
        setCurAttempt(parsedResponse);
        setUserResult([...userResult,
                        { id: curBattleId, isCorrect: parsedResponse?.questions[curBattleId]?.isCorrect || false }]);
        if (ress2?.questions[curBattleId]) {
          setRivalUserResult([...rivalUserResult,
                               { id: curBattleId, isCorrect: ress2?.questions[curBattleId].isCorrect || false }]);
        }

        const res = parsedResponse?.questions.find(e => e.cardId === curBattleData?.id);
        res?.isCorrect ? audioSuccess.play() : audioError.play();
        const newQuestionResponse = {
          isCorrect: res?.isCorrect || false,
          answerIds: res?.correctAnswerIds,
          correctMarkPoints: res?.correctMarkPoints,
        };
        setQuestionResponse(newQuestionResponse);
        setAnswerBody(undefined);
        setCurBattleId(curBattleId + 1);
        if (curBattleId + 1 === battleTests?.cards?.length) {
          const getType = (): string => {
            switch (parsedResponse?.status || '') {
              case 'PENDING':
                return 'pending';
              case 'LOSE':
                return 'lose';
              default:
                return 'win';
            }
          };
          setModalType({
            ...modalType,
            type: getType(),
            time: parsedResponse?.spentTimeSeconds || 0,
            donePercent: parsedResponse?.donePercent || 0,
          });
          setShowModalResult(true);
          getBattleStatus && getBattleStatus(battleId, +companyId);
          localStorage.setItem(LOCAL_STORAGE.BATTLE_FINISHED, 'finished');
        }
      },
      onError: () => {
        addNotification(NotificationType.Danger, 'Внутренняя ошибка сервера!');
      },
    });
  };

  const handleOpenQuestionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerBody({ ...answerBody, answerText: event.target.value });
  };

  const handleSelectedIds = (ids: number[]) => {
    setAnswerBody({ ...answerBody, answerIds: ids });
  };

  const handlePhotoMarkPoints = (points: CardTypes.ICardQuestionMarkPointPosition[]) => {
    setAnswerBody({ ...answerBody, markPoints: points });
  };

  return (
    <Layout className="battle-page">
      <div className="pt-48 pb-24 grid">
        <Breadcrumb items={breadCrumbItems} />
        <Typography variant="headline" className="mt-32">Баттл</Typography>
      </div>
      {battleLoading ? <Loader size={40} className="mt-32" /> :
        <div className="color_grey_background__bg pt-32 pb-48">
          <div className="battle-page__main-content d-flex grid justify-content-between">
            <Quiz
              handleOpenQuestionChange={handleOpenQuestionChange}
              handleSelectedIds={handleSelectedIds}
              handlePhotoMarkPoints={handlePhotoMarkPoints}
              questionResponse={questionResponse}
              currentQuizNumber={curBattleId + 1}
              totalQuizNumber={battleTests?.cards?.length || 0}
              attemptQuestion={curBattleData}
              onClickNext={onNextQuiz}
              buttonDisabled={answerBody?.type === 'OPEN' && !answerBody.answerText}
              buttonLoading={attemptBattleLoading}
            />
            <div>
              <BattleResults
                usersData={modalType}
                avatar1={battleTests?.me.employment.avatarThumbnailUrl}
                avatar2={battleTests?.participant.employment.avatarThumbnailUrl}
                questionNumber={battleTests?.cards?.length || 0}
                curQuestionPos={curBattleId}
                time={timeLeft}
                donePercent={curUserAttempt?.donePercent || 0}
                firstUserResult={userResult}
                secondUserResult={rivalUserResult}
              />
            </div>
          </div>
        </div>}
      {showModalResult && attemptBattleResponse && (
        <Modal
          width={496}
          withSaveBtnArrow
          saveLabel="Все Баттлы"
          cancelLabel="На главную"
          onCloseClick={() => {
            setShowModalResult(false);
            history.push(`/${RouterPaths.DASHBOARD}`);
          }}
          onSaveClick={() => history.push(`/${RouterPaths.BATTLES}`)}
        >
          <ModalResult
            firstEmployeeName={modalType?.firstEmployeeName}
            firstUserRole={modalType?.firstUserRole}
            avatar1={battleTests?.me.employment.avatarThumbnailUrl}
            avatar2={battleTests?.participant.employment.avatarThumbnailUrl}
            secondEmployeeName={modalType?.secondEmployeeName}
            secondUserRole={modalType?.secondUserRole}
            type={modalType?.type || ''}
            time={timeLeft}
            donePercent={modalType?.donePercent || 0}
          />
        </Modal>
      )}
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  profile: state.profileReducer.profile.data,
  battleTests: state.battlesReducer.battleTests.data,
  battleTestsError: state.battlesReducer.battleTests.errorMessage,
  battleLoading: state.battlesReducer.battleTests.loading,
  attemptBattleResponse: state.battlesReducer.attemptBattleResponse.data,
  attemptBattleLoading: state.battlesReducer.attemptBattleResponse.loading,
});

const mapDispatchToProps = {
  getBattleTest,
  createBattleTest,
  getBattleStatus,
  clearAttemptBattle,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withNotificationProvider(withRouter(BattlePage)));
