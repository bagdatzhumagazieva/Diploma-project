import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Loader from 'src/components/atoms/Loader';
import Button from 'src/components/atoms/Button';
import Breadcrumb from 'src/components/atoms/BreadCrumb';
import Typography from 'src/components/atoms/Typography';
import ModalLoading from 'src/components/atoms/ModalLoading';
import Modal from 'src/components/molecules/Modal';
import useNotification from 'src/components/molecules/Notification/useNotification';
import Open from 'src/components/molecules/Questions/Open';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';
import PhotoMark from 'src/components/molecules/Questions/PhotoMark';
import Single from 'src/components/molecules/Questions/Single';
import RadioImage from 'src/components/molecules/Questions/RadioImage';
import Multiple from 'src/components/molecules/Questions/Multiple';
import Cloud from 'src/components/molecules/Questions/Cloud';
import TaskDetailResult from 'src/components/organisms/TaskDetail/TaskDetailResult';
import Preview from 'src/components/organisms/TaskCreationEdition/Preview';
import Layout from 'src/components/organisms/Layout';
import TaskDetailStatistic from 'src/components/organisms/TaskDetail/TaskDetailStatistics';

import { AdminRouterPaths } from 'src/core/enum';
import {
  getDetailTask, updateTask, deleteTask, getTaskStatistics,
  getTaskStatisticsByGroup, clearDetailTask,
} from 'src/store/task/actions';
import { addAdminSlash } from 'src/routers/AdminRouters';

import { ReactComponent as IconEdit } from 'src/assets/img/icons/edit.svg';
import { ReactComponent as ArchiveIcon } from 'src/assets/img/icons/archive.svg';
import { ReactComponent as IconDelete } from 'src/assets/img/icons/delete.svg';
import { ReactComponent as Publish } from 'src/assets/img/icons/send.svg';
import { TASK_DETAIL_TABS } from 'src/pages/AdminPages/Task/TaskDetailPage/mock';
import { DEFAULT_TASK_VALUE } from 'src/components/organisms/TaskCreationEdition/consts';
import { DEFAULT_NOTIFICATION_DATA } from 'src/components/organisms/CourseCreationEdition/consts';
import { VerificationQuestions } from 'src/components/organisms/CardCreation/CardVerificationQuestion/consts';
import { TaskAction } from 'src/components/organisms/ContentComponents/ContentTasks/consts';
import { IIcon } from 'src/core/store/types';
import { TaskAggregatorAdminTypes, TaskTypes } from 'src/store/task/types';
import { TaskDetailTypes } from 'src/pages/AdminPages/Task/TaskDetailPage/types';
import { IOption } from 'src/components/molecules/Select/types';
import { LOCAL_STORAGE } from 'src/core/store/values';
import 'src/pages/AdminPages/Task/TaskDetailPage/index.scss';

function TaskDetailPage(props: TaskDetailTypes.IProps) {
  const {
    history, detailTask, loadingTask, deleteTask,
    loadingDeletedTask, updateTask, clearDetailTask,
    updatedLoading, taskStatisticsLoading,
    onGetTaskStatistics, onGetTaskStatisticsByGroup,
    taskStatistics, taskGroups, onGetDetailTask,
  } = props;
  const notification = useNotification();
  const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || -1;
  const taskId = history.location.pathname.split('/').pop() || '';
  const [data, setData] = useState<TaskTypes.IBodyProps>(DEFAULT_TASK_VALUE);
  const [selectedTab, setSelectedTab] = useState<string>(TASK_DETAIL_TABS[0].value);
  const [selectedGroups, setSelectedGroups] = useState<IOption[]>([]);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<any>();

  const defaultTopIcons = [
    {
      title: 'Отредактировать задание',
      iconJSX: <IconEdit width="16" height="16" className="task-detail__icon--yellow" />,
      color: 'main_50',
      callback: () => { history.push(addAdminSlash(`${AdminRouterPaths.TASK_EDITION}/${taskId}`)); },
    },
    {
      title: 'Удалить ',
      iconJSX: <IconDelete width="17" height="17" className="task-detail__icon--red" />,
      color: 'red',
      callback: () => {
        setShowModal(TaskAction.DELETE);
      },
    },
    {
      title: 'В черновик ',
      iconJSX: <ArchiveIcon />,
      color: 'main_50',
      callback: () => {
        setShowModal(TaskAction.DRAFT);
      },
    },
    {
      title: 'Опубликовать ',
      iconJSX: <Publish />,
      color: 'main_50',
      callback: () => {
        setShowModal(TaskAction.PUBLICATE);
      },
    },
  ];
  const [taskDetailIcons, setTaskDetailIcons] = useState<IIcon[]>(defaultTopIcons.slice(0, 2));

  useEffect(() => {
    onGetDetailTask && onGetDetailTask(+taskId);
    onGetTaskStatisticsByGroup && onGetTaskStatisticsByGroup(+taskId, +companyId);
    onGetTaskStatistics && onGetTaskStatistics(
      {
        companyId: +companyId,
        taskId: +taskId,
      });

    return () => {
      clearDetailTask && clearDetailTask();
    };
  },        [taskId]);

  useEffect(() => {
    if (taskId && detailTask) {
      setData({
        ...data,
        id: +taskId,
        groupIds: detailTask.groupIds,
        name: detailTask.name,
        uuid: detailTask.uuid,
        cardIds: detailTask.cardIds,
        mainCardId: detailTask.mainCardId,
        image: detailTask.imageUrl,
        imageThumb: detailTask.imageThumbnailUrl,
        tagsIds: detailTask.tagIds,
        rating: detailTask.rating,
        mainCardInstruction: detailTask.mainCardInstruction || '',
        publishDate: detailTask.publishDatetime,
        status: detailTask.status,
        type: detailTask.type,
        mainCardContent: detailTask.mainCardContent || '',
        mainCardDescription: detailTask.mainCardDescription || '',
        tags: detailTask.tags,
        rewardAmount: detailTask.rewardAmount,
        description: detailTask.description,
        minutesToFinish: detailTask.minutesToFinish,
      });
      setTaskDetailIcons(
        detailTask.status === 'PUBLISHED' ? defaultTopIcons.slice(0, 3)
          : detailTask.status === 'DRAFT' ? [...defaultTopIcons.slice(0, 2), defaultTopIcons[3]] :
          defaultTopIcons);
    }
  },        [detailTask]);

  useEffect(() => {
    if (taskGroups) {
      setSelectedGroups(taskGroups.map(e => ({ value: `${e.id}`, name: e.name || '' })));
    }
  },        [taskGroups]);

  const onSelectGroupsChange = (options: IOption[]) => {
    setSelectedGroups(options);
    onGetTaskStatistics && onGetTaskStatistics(
      {
        companyId: +companyId,
        taskId: +taskId,
        groupIds: options.filter(e => e.checkboxChecked).map(n => +n.value),
      });
  };

  const onDeleteTask = () => {
    setShowModal(undefined);
    setPageLoading(true);
    deleteTask && deleteTask([+taskId], {
      onSuccess: () => {
        setPageLoading(false);
        notification.add({ ...DEFAULT_NOTIFICATION_DATA, description: 'Задание успешно удалено' });
        history.push(addAdminSlash(AdminRouterPaths.CONTENT));
      },
      onError: () => {
        setPageLoading(false);
      },
    });
  };

  const onDraftTask = () => {
    setPageLoading(true);
    setShowModal(undefined);
    updateTask && updateTask({
      ...data,
      status: showModal === TaskAction.DRAFT ? 'DRAFT' : 'PUBLISHED',
    },                       +taskId, {
      onSuccess: () => {
        setPageLoading(false);
        setTaskDetailIcons(
          showModal === TaskAction.PUBLICATE ? defaultTopIcons.slice(0, 3)
            : [...defaultTopIcons.slice(0, 2), defaultTopIcons[3]]);
        notification.add({
          ...DEFAULT_NOTIFICATION_DATA,
          description:
            showModal === TaskAction.DRAFT ? 'Задание успешно перенесено в черновик'
          : 'Задание успешно опубликовано',
        });
        return;
      },
      onError: () => {
        setPageLoading(false);
      },
    });
  };

  return (
    <Layout
      isAdminRouting
      className="task-detail"
      childrenClassName="py-48 px-24 color_grey__bg"
    >
      <Breadcrumb
        items={[
          { label: 'Задания', link: addAdminSlash(AdminRouterPaths.CONTENT) },
          { label: detailTask?.name || '' },
        ]}
      />
      <div className="d-flex mt-48">
        {taskDetailIcons.map((e: IIcon, i: number) => (
          <div
            key={i}
            onClick={e?.callback}
            className="d-flex mr-32 cursor-pointer"
          >
            {e?.iconJSX || ''}
            <Typography variant="subtext" color={e?.color || ''} className="ml-4">
              {e?.title || ''}
            </Typography>
          </div>
        ))}
      </div>
      <div className="task-detail__tabs mt-32">
        {TASK_DETAIL_TABS.map(tab => (
          <Button
            key={tab.value}
            variant={selectedTab === tab.value ? 'textmed' : 'text'}
            classNames={[
              'tabs__button px-24 py-12',
              { 'tabs__button--active': selectedTab === tab.value },
            ]}
            onClick={() => setSelectedTab(tab.value)}
          >
            {tab.title}
          </Button>
        ))}
      </div>
      <div className="task-detail__preview">
        {(loadingTask || loadingDeletedTask || updatedLoading ||
          taskStatisticsLoading) ? <Loader className="mt-16" /> :
          selectedTab === TASK_DETAIL_TABS[0].value ? (
            <Preview data={data} isDetailPage>
              <>
                <Typography variant="text" className="mt-48 mb-12">{data.mainCardInstruction}</Typography>
                <div className="task-detail__cards p-24">
                {taskStatistics?.statistics?.map((e: TaskAggregatorAdminTypes.IStatisticsRender, i) => (
                  <div className="mb-48" key={i}>
                    {e.card?.question.questionType === VerificationQuestions.OpenQuestion ? (
                        <Open
                          title={`${i + 1}. ${e.card.question.questionText}`}
                          instruction={e.card.question.description || ''}
                          appendix={e.card.question.content || ''}
                        />
                      ) :
                      e.card?.question.questionType === VerificationQuestions.OneOfList ? (
                          <Single
                            title={`${i + 1}. ${e.card.question.questionText}`}
                            instruction={e.card.question.description || ''}
                            appendix={e.card.question.content || ''}
                            options={e.card.question.answerOptions?.map(n => ({ ...n, text: n.text || '' })) || []}
                          />
                        ) :
                        e.card?.question.questionType === VerificationQuestions.ImageFromList ? (
                            <RadioImage
                              title={`${i + 1}. ${e.card.question.questionText}`}
                              instruction={e.card.question.description || ''}
                              appendix={e.card.question.content || ''}
                              selectedImage={0}
                              images={e.card.question.answerOptions?.map(n =>
                                ({ id: n.uuid, src: n.imageUrl || '', text: n.text || '' })) || []}
                            />
                          ) :
                          e.card?.question.questionType === VerificationQuestions.FewFromList ? (
                              <Multiple
                                instruction={e.card.question.description || ''}
                                appendix={e.card.question.content || ''}
                                title={`${i + 1}. ${e.card.question.questionText}`}
                                options={e.card.question.answerOptions?.map(n =>
                                  ({ ...n, text: n.text || '' })) || []}
                              />
                            ) :
                            e.card?.question.questionType === VerificationQuestions.SequenceFromList ? (
                                <Cloud
                                  title={`${i + 1}. ${e.card.question.questionText}`}
                                  instruction={e.card.question.description || ''}
                                  appendix={e.card.question.content || ''}
                                  options={e.card.question.answerOptions?.map(n =>
                                    ({ ...n, text: n.text || '' })) || []}
                                />
                              ) :
                              e.card?.question.questionType === VerificationQuestions.QuestionPhotoTag && (
                                <PhotoMark
                                  title={`${i + 1}. ${e.card.question.questionText}`}
                                  instruction={e.card.question.description || ''}
                                  appendix={e.card.question.content || ''}
                                  image={{
                                    id: e.card.question.answerOptions ? e.card.question.answerOptions[0].uuid : '',
                                    imageUrl: e.card.question.answerOptions ?
                                      e.card.question.answerOptions[0]?.imageUrl || '' : '',
                                  }}
                                  marksCount={e.card.question.markPointsNumber || 0}
                                />
                              )}
                  </div>
                ))}
              </div>
              </>
            </Preview>) :
            selectedTab === TASK_DETAIL_TABS[1].value ? (
              <TaskDetailResult
                selectedGroups={selectedGroups}
                setSelectedGroups={onSelectGroupsChange}
                usersData={taskStatistics?.users || []}
                companyId={+companyId}
                taskId={+taskId}
              />) :(
              <TaskDetailStatistic
                companyId={+companyId}
                taskId={+taskId}
              >
                <Preview data={data} isDetailPage isStatistic />
              </TaskDetailStatistic>
            )
        }
      </div>
      {pageLoading && (
        <ModalLoading />
      )}
      {showModal !== undefined && (
        <Modal
          width={422}
          title={showModal === TaskAction.DELETE ? 'Удаление задания' : 'Изменение статуса'}
          deleteLabel={showModal === TaskAction.DELETE ? 'Удалить' : undefined}
          cancelLabel="Отмена"
          saveLabel={showModal === TaskAction.DRAFT ? 'В черновик' :
            showModal === TaskAction.PUBLICATE ? 'Опубликовать' : ''}
          onCloseClick={() => setShowModal(undefined)}
          onDeleteClick={() => showModal === TaskAction.DELETE && onDeleteTask()}
          onSaveClick={() => showModal === TaskAction.DELETE ?
            onDeleteTask() : onDraftTask()}
        >
          <div className="mx-32">
            <Typography
              variant="text"
            >
              Вы действительно хотите
              {showModal === TaskAction.DELETE ? ' удалить ' :
                showModal === TaskAction.PUBLICATE ? ' опубликовать ' : ' перенести в черновик '}
              данное задание?
            </Typography>
          </div>
        </Modal>
      )}
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  detailTask: state.taskReducer.detailTask.data,
  taskStatistics: state.taskReducer.taskStatistics.data,
  taskGroups: state.taskReducer.taskGroups.data,
  updatedLoading: state.taskReducer.updatedTaskState.loading,
  taskStatisticsLoading: state.taskReducer.taskStatistics.loading,
  loadingTask: state.taskReducer.detailTask.loading,
  loadingDeletedTask: state.taskReducer.deletedTask.loading,
});

const mapDispatchToProps = {
  deleteTask,
  updateTask,
  clearDetailTask,
  onGetDetailTask: getDetailTask,
  onGetTaskStatistics: getTaskStatistics,
  onGetTaskStatisticsByGroup: getTaskStatisticsByGroup,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(withNotificationProvider(TaskDetailPage)));
