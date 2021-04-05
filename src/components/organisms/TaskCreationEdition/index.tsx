import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Typography from 'src/components/atoms/Typography';
import Image from 'src/components/atoms/Image';
import Button from 'src/components/atoms/Button';
import Loader from 'src/components/atoms/Loader';
import Stepper from 'src/components/atoms/Stepper';
import ModalLoading from 'src/components/atoms/ModalLoading';
import StatusEllipse from 'src/components/atoms/Svg/Icons/status-ellipse';
import Modal from 'src/components/molecules/Modal';
import useNotification from 'src/components/molecules/Notification/useNotification';
import ModalPublishSetting from 'src/components/molecules/ModalPublishSetting';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';
import GeneralInformation from 'src/components/organisms/TaskCreationEdition/GeneralInformation';
import Content from 'src/components/organisms/TaskCreationEdition/Content';
import Preview from 'src/components/organisms/TaskCreationEdition/Preview';
import TaskCreationContext, { isTestPollType } from 'src/components/organisms/TaskCreationEdition/TaskCreationContext';
import ModalCardCreation from 'src/pages/AdminPages/Card/CardCreationPage/ModalCardCreation';

import taskActions from 'src/store/task/actions';
import { clearCardsState } from 'src/store/card/actions';

import { addAdminSlash } from 'src/routers/AdminRouters';
import { AdminRouterPaths } from 'src/core/enum';
import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { LOCAL_STORAGE } from 'src/core/store/values';
import IconDelete from 'src/assets/img/icons/delete.svg';
import SaveIcon from 'src/assets/img/icons/save.svg';
import CheckIcon from 'src/assets/img/icons/check.svg';
import { DEFAULT_TASK_VALUE, TaskCreationSteps } from 'src/components/organisms/TaskCreationEdition/consts';
import { TASKS_TYPE } from 'src/components/organisms/TaskCreationEdition/GeneralInformation/const';
import { DEFAULT_NOTIFICATION_DATA } from 'src/components/organisms/CourseCreationEdition/consts';
import { IRenderBody } from 'src/core/components/types';
import { TaskTypes, TaskAggregatorTypes } from 'src/store/task/types';
import { CardTypes } from 'src/store/card/types';
import { IOption } from 'src/components/molecules/Select/types';
import { NotificationType } from 'src/components/molecules/Notification/types';
import { TaskCreationEditionTypes } from 'src/components/organisms/TaskCreationEdition/types';
import { ICard } from 'src/components/molecules/CardInfomationBlock/types';

import 'src/components/organisms/TaskCreationEdition/index.scss';

function TaskCreationEditionPage(props: TaskCreationEditionTypes.IProps) {

  const {
    createTask, loadingCard, loadingTask,
    history, getTask, taskId, type, detailTask,
    deleteTask, updateTask, loadingDeletedTask, clearCardsState,
    loadingUpdatedTask, taskLoading,
  } = props;
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');
  const notification = useNotification();

  const [step, setStep] = useState<number>(0);
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<string>('');
  const [cards, setCards] = useState<ICard[]>([]);
  const [publication, setPublication] = useState<IOption>(TASKS_TYPE[0]);
  const [taskData, setTaskData] = useState<TaskTypes.IBodyProps>(
    {
      ...DEFAULT_TASK_VALUE,
      publishDate: `${date}`,
    });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showModalCardCreation, setShowModalCardCreation] = useState<'create' | 'edit'>();
  const [currentEditCard, setCurrentEditCard] = useState<number>();
  const [showModalDate, setShowModalDate] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [loadingCreation, setLoadingCreation] = useState<boolean>(false);
  const value = { step, setStep, publication, setPublication, taskData, setTaskData };

  const getStep = (step: number) => {
    if (step === 0) return <GeneralInformation companyId={companyId} />;
    if (step === 1) {
      return (
        <Content
          companyId={companyId}
          cards={cards}
          setCurrentEditCard={setCurrentEditCard}
          setCard={setCards}
          handleCardCreateClick={handleCardCreateClick}
        />
      );
    }
    return (
      <div className="task-creation__body__preview px-32 py-24 mb-64">
        <Preview data={taskData} />
      </div>
    );
  };

  useEffect(() => getTaskById(), []);

  useEffect(() => {
    if (loadingTask || loadingCard || loadingDeletedTask || loadingUpdatedTask) {
      setPageLoading(true);
    } else {
      setPageLoading(false);
    }
  },        [loadingTask, loadingCard, loadingDeletedTask, loadingUpdatedTask]);

  useEffect(() => {
    if (taskId && detailTask) {
      setTaskData(prevState => ({
        ...prevState,
        id: taskId,
        uuid: detailTask.uuid,
        groupIds: detailTask.groupIds,
        name: detailTask.name,
        cardIds: detailTask.cardIds,
        mainCardId: detailTask.mainCardId,
        image: detailTask.imageUrl,
        imageThumb: detailTask.imageThumbnailUrl,
        tagsIds: detailTask.tagIds,
        publishDate: detailTask.publishDatetime,
        status: detailTask.status,
        type: detailTask.type,
        mainCardContent: detailTask.mainCardContent || '',
        mainCardDescription: detailTask.mainCardDescription || '',
        tags: detailTask.tags,
        rewardAmount: detailTask.rewardAmount,
        description: detailTask.description,
        minutesToFinish: detailTask.minutesToFinish,
      }));
      detailTask.type && setPublication(
        {
          value: detailTask.type || '',
          name: TASKS_TYPE.find((e: IOption) => e.value === detailTask.type)?.name || '',
        });
      const orderQuestion = detailTask.cardIds.map(e => detailTask.questions.find(n => n.cardId === e)
        || {} as TaskAggregatorTypes.IRenderQuestion);
      setCards(orderQuestion?.map(e => ({
        id: e.cardId,
        name: e.cardName || '',
        imageThumbnailUrl: e.imageThumbnailUrl || '',
        minutesToFinish: e.minutesToFinish || 0,
        description: e.description || '',
        content: e.content || '',
      })));
    }
  },        [detailTask, taskId]);

  const handleCardCreateClick = (type: 'edit' | 'create') => {
    setShowModalCardCreation(type);
  };

  const handleCreationFinished = (data: IRenderBody<CardTypes.IRenderProps>) => {
    setShowModalCardCreation(undefined);
    if (data.responseType === NotificationType.Success && data.data) {
      clearCardsState && clearCardsState();
      const card: ICard = {
        id: data.data.id,
        name: data.data.name,
        imageThumbnailUrl: data.data.imageUrlThumbnail,
        minutesToFinish: data.data.minutesToFinish,
        description: data.data.description,
        content: data.data.content,
      };
      if (!isTestPollType(publication)) {
        setTaskData({ ...taskData, mainCardId: card.id, cardIds: [card.id] });
        setCards([card]);
      } else {
        if (cards.length) {
          const newCards = cards.map(e => e.id === currentEditCard ? card : e);
          setTaskData({
            ...taskData,
            cardIds: [...taskData.cardIds, card.id],
            mainCardDescription: cards[0].description || '',
            mainCardContent: cards[0].content || '',
          });
          setCards(showModalCardCreation === 'edit' ? newCards : [...cards, card]);
        } else {
          setTaskData({
            ...taskData,
            mainCardId: card.id,
            cardIds: [card.id],
            mainCardContent: cards[0].content || '',
            mainCardDescription: cards[0].description || '',
          });
          setCards([card]);
        }
      }
      notification.add(
        {
          ...DEFAULT_NOTIFICATION_DATA,
          description: `Карточка успешно ${showModalCardCreation === 'edit' ? 'редактирована' : 'создана и добавлена'}`,
        });
    } else {
      notification.add(
        {
          ...DEFAULT_NOTIFICATION_DATA,
          description: 'Упс что то пошло не так, попробуйте создать еще раз',
          type: NotificationType.Danger,
        });
    }
  };

  const handleChangeStatus = (status: string) => {
    setTaskData({ ...taskData, status });
  };

  const onDeleteTask = () => {
    taskId && deleteTask && deleteTask([taskId], {
      onSuccess: () => {
        history.push(addAdminSlash(AdminRouterPaths.CONTENT));
      },
    });
  };

  const getTaskById = (callbacks?: any) => {
    if (type === 'edit' && taskId && +taskId > -1) {
      getTask && getTask(+taskId, callbacks);
    }
  };

  const onPublish = () => {
    const newData: TaskTypes.IBodyProps = {
      ...taskData,
      publishDate: (taskData.status === 'DRAFT' || taskData.status === 'PUBLISHED') ?
        moment(date).format('YYYY-MM-DD hh:00') :
        moment(date).format(`YYYY-MM-DD ${time[0] + time[1]}:00`),
    };
    if (taskId) {
      onUpdateTask(newData);
    } else {
      onCreateTask();
    }
    setShowModalDate(false);
  };

  const onSaveTask = () => {
    if (taskId) {
      onUpdateTask(taskData);
    } else {
      onCreateTask();
    }
  };

  const onUpdateTask = (data: TaskTypes.IBodyProps) => {
    taskId && updateTask && updateTask(data, taskId, {
      onSuccess: () => {
        notification.add(
          {
            ...DEFAULT_NOTIFICATION_DATA,
            description: 'Изменения успешно сохранены.',
          });
        history.push(addAdminSlash(AdminRouterPaths.CONTENT));
      },
    });
  };

  const onCreateTask = () => {
    setLoadingCreation(true);
    if (!taskData.cardIds || !taskData.mainCardId) return;
    const newData: TaskTypes.IBodyProps = {
      ...taskData,
      publishDate: (taskData.status === 'DRAFT' || taskData.status === 'PUBLISHED') ?
        moment.utc(date).format('YYYY-MM-DD hh:00') :
        moment.utc(date).format(`YYYY-MM-DD ${time[0] + time[1]}:00`),
      tagsIds: taskData.tagsIds || [],
      groupIds: taskData.groupIds || [],
    };
    createTask && createTask(newData, companyId, {
      onSuccess: () => {
        setTimeout(
          () => {
            setLoadingCreation(true);
            step !== 1 && notification.add(
              {
                ...DEFAULT_NOTIFICATION_DATA,
                title: !time ? 'Задание опубликовано!' : '',
                description: !time ? 'Пользователям доступна данное задание' : 'Задание создано успешно',
              });
            history.push(addAdminSlash(AdminRouterPaths.CONTENT));
          },
          3000);
      },
    });
  };

  return (
    <TaskCreationContext.Provider value={value}>
      <div className="d-flex pt-32 justify-content-between align-items-center task-creation__body">
        <Typography variant="headline">
          {taskId ? 'Редактирование задачи' : 'Создание задачи'}
        </Typography>
        <div className="d-flex">
          <Typography
            color={taskData.status === 'PUBLISHED' ? 'green' : taskData.status === 'SCHEDULED' ? 'main_50' : 'red'}
            variant="TAG"
            className="mr-32 mt-16"
          >
            <StatusEllipse
              className="mr-8"
              color={taskData.status === 'PUBLISHED' ? '#2ABE42' : taskData.status === 'SCHEDULED' ? '#F1D334' : '#F04848'}/>
            {taskData.status === 'PUBLISHED' ? 'Опубликован' : taskData.status === 'SCHEDULED' ? 'Запланирован' : 'В черновике'}
          </Typography>
          <Button
            variant="textmed"
            type="black-icon"
            className="py-16 px-24 mr-16"
            onClick={() => setShowModal(true)}
          >
            <Image alt="delete icon" className="mr-8" src={IconDelete}/>
            Удалить
          </Button>
          <Button
            disabled={step === 0 && !taskId}
            variant="textmed"
            type="black-icon"
            className="py-16 px-24 mr-16"
            onClick={onSaveTask}
          >
            <Image alt="save icon" className="mr-8" src={SaveIcon}/>
            Сохранить
          </Button>
          <Button
            disabled={step !== 2}
            variant="textmed"
            className=" d-flex align-items-center justify-content-center"
            onClick={() => setShowModalDate(true)}
          >
            <Image alt="check icon" className="mr-8" src={CheckIcon}/>
            Опубликовать
          </Button>
        </div>
      </div>
      <div className="d-flex mt-32 justify-content-between task-creation__body">
        <div className="task-creation__body__sidebar">
          <Stepper
            isStepsNumbered
            className="mr-24"
            steps={TaskCreationSteps}
            currentStep={step}
            onStepClick={setStep}
          />
          <Button
            to={addAdminSlash(AdminRouterPaths.CONTENT)}
            type="outlined"
            className="task-creation__body__sidebar__btn mt-32"
          >
            Выйти
          </Button>
        </div>
        <div className="task-creation__body-content">
          {taskLoading ? <Loader /> : getStep(step)}
        </div>
      </div>
      {showModalDate && (
        <Modal
          title="Настройки публикации"
          width={648}
          onCloseClick={() => setShowModalDate(false)}
        >
          <ModalPublishSetting
            time={time}
            date={date}
            setDate={setDate}
            setTime={setTime}
            setStatus={handleChangeStatus}
            status={taskData.status || ''}
            onSaveClick={onPublish}
            onCancelClick={() => { setShowModalDate(false); }}
          />
        </Modal>
      )}
      {showModalCardCreation !== undefined && (
        <ModalCardCreation
          isQuizCard={taskData.type === 'POLL'}
          id={currentEditCard || 0}
          handleCloseClick={() => setShowModalCardCreation(undefined)}
          handleCreationFinished={handleCreationFinished}
          type={showModalCardCreation}
        />
      )}
      {pageLoading || loadingCreation && (
        <ModalLoading />
      )}
      {showModal && (
        <Modal
          width={422}
          title="Удаление задания"
          cancelLabel="Отмена"
          deleteLabel="Удалить"
          onCloseClick={() => setShowModal(false)}
          onDeleteClick={onDeleteTask}
        >
          <div className="mx-32">
            <Typography
              variant="text"
            >
              Вы действительно хотите удалить данное задание?
            </Typography>
          </div>
        </Modal>
      )}
    </TaskCreationContext.Provider>
  );
}

const mapStateToProps = (state: any) => ({
  detailTask: state.taskReducer.detailTask.data,
  taskLoading: state.taskReducer.detailTask.loading,
  loadingCard: state.cardReducer.createdCardState.loading,
  loadingTask: state.taskReducer.createdTaskState.loading,
  loadingDeletedTask: state.taskReducer.deletedTask.loading,
  loadingUpdatedTask: state.taskReducer.updatedTaskState.loading,
});

const mapDispatchToProps = {
  clearCardsState,
  getTask: taskActions.getDetailTask,
  createTask: taskActions.createTask,
  updateTask: taskActions.updateTask,
  deleteTask: taskActions.deleteTask,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(withNotificationProvider(withRouter(TaskCreationEditionPage)));
