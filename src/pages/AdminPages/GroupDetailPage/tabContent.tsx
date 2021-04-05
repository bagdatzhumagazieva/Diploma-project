import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import taskActions from 'src/store/task/actions';
import { getCoursesByAdmin, updateCourse } from 'src/store/course/actions';

import Typography from 'src/components/atoms/Typography';
import Button from 'src/components/atoms/Button';
import Pagination from 'src/components/atoms/Pagination';
import CancelIcon from 'src/components/atoms/Svg/Icons/cancel';
import Modal from 'src/components/molecules/Modal';
import Table from 'src/components/molecules/Table';
import useNotification from 'src/components/molecules/Notification/useNotification';

import { COURSE_HEADER, TASK_HEADER } from 'src/pages/AdminPages/GroupDetailPage/consts';
import { TabContentTypes, Type } from 'src/pages/AdminPages/GroupDetailPage/types';
import { TaskTypes } from 'src/store/task/types';
import { CourseDetailTypes, CourseTypes, Status } from 'src/store/course/types';
import { SortDirection, TableTypes } from 'src/components/molecules/Table/types';
import { DEFAULT_NOTIFICATION_DATA } from 'src/components/organisms/CourseCreationEdition/consts';
import { NotificationType } from 'src/components/molecules/Notification/types';
import 'src/pages/AdminPages/GroupDetailPage/index.scss';

function TabContent(props: TabContentTypes.IProps) {
  const {
    exerciseLoading = false, exercises, getExercises, companyId,
    groupId, updateTask, getCoursesByAdmin, courses,
    setPageLoading, coursesTotal = 0, coursesLoading = false,
    updateCourse,
  } = props;
  const tasksTotal = exercises?.total || 0;
  const pageSize = 6;
  const tableLoading = exerciseLoading || coursesLoading;
  const total = tasksTotal + coursesTotal;
  const exercisesDefaultQueryParams: TaskTypes.IGetTaskBodyParams = {
    company_id: companyId,
    group_ids: [groupId],
    page_size: pageSize,
    page: 1,
  };
  const coursesDefaultQueryParams: CourseDetailTypes.IAdminQuery = {
    pageSize,
    groupIds: [groupId],
    page: 1,
    status: Status.PUBLISHED,
  };
  const notification = useNotification();
  const [selectedData, setSelectedData] = useState<TabContentTypes.ISelectedData>();
  const [exercisePage, setExercisePage] = useState<number>(1);

  useEffect(
    () => {
      if (typeof companyId !== 'number') return;
      getExercises && getExercises(exercisesDefaultQueryParams);
      getCoursesByAdmin && getCoursesByAdmin(companyId, coursesDefaultQueryParams);
    },
    [],
  );

  useEffect(() => {
    exercises?.exercises && setCurrentTag(tags[0]);
  },        [exercises]);

  const taskHeaderData = (data: TableTypes.IHeaderData[], type: Type) => [
    ...data,
    {
      key: 'delete',
      name: '',
      width: '72px',
      render: (n: TaskTypes.IRenderAdminExercise) => (
        <div className="d-flex align-items-center justify-content-center">
          <CancelIcon
            onClick={() => setSelectedData({ type, id: n.id })}
            color="#F25F5F"
            className="cursor-pointer"
          />
        </div>
      ),
    },
  ];

  const tags = [
    {
      id: 1,
      name: 'Задания',
      headerData: taskHeaderData(TASK_HEADER, Type.EXERCISE),
      bodyData: exercises?.exercises || [],
      onPageClick: (page: number) => onPageClick(page, Type.EXERCISE),
      total: tasksTotal,
      mode: Type.EXERCISE,
    },
    {
      id: 2,
      name: 'Игры',
      headerData: TASK_HEADER,
      bodyData: [],
      onPageClick: (page: number) => onPageClick(page, Type.GAME),
      total: coursesTotal,
      mode: Type.GAME,
    },
    {
      id: 3,
      name: 'Курсы',
      headerData: taskHeaderData(COURSE_HEADER, Type.COURSE),
      bodyData: courses || [],
      onPageClick: (page: number) => onPageClick(page, Type.COURSE),
      total: 0,
      mode: Type.COURSE,
    },
  ];

  const [currentTag, setCurrentTag] = useState<TabContentTypes.ITag>(tags[0]);

  const onPageClick = (page: number, type: Type) => {
    if (typeof companyId !== 'number') return;
    if (type === Type.EXERCISE) {
      setExercisePage(page);
      getExercises && getExercises({ ...exercisesDefaultQueryParams, page });
      return;
    }
    if (type === Type.COURSE) {
      getCoursesByAdmin && getCoursesByAdmin(companyId, { ...coursesDefaultQueryParams, page });
      return;
    }
  };

  const onDeleteCourseFromGroup = (id: number) => {
    setSelectedData(undefined);
    if (!Array.isArray(courses) || !companyId) return;
    setPageLoading(true);
    const selectedCourse = courses.find(item => item.id === id);
    if (!selectedCourse) return;
    const newBodyParams: CourseTypes.IRenderProps = {
      ...selectedCourse,
      groupIds: selectedCourse.groupIds.filter(curGroupId => curGroupId !== groupId),
    };
    updateCourse && updateCourse(id, newBodyParams, {
      onSuccess: () => {
        setPageLoading(false);
        getCoursesByAdmin && getCoursesByAdmin(companyId, coursesDefaultQueryParams);
        notification.add({ ...DEFAULT_NOTIFICATION_DATA, description: 'Курс успешно удален из данной группы' });
      },
      onError: () => {
        setPageLoading(false);
        notification.add(
          {
            ...DEFAULT_NOTIFICATION_DATA,
            type: NotificationType.Danger,
            description: 'Курс не удалился с данной группы',
          });
      },
    });
  };

  const onDeleteTaskFromGroup = (id: number) => {
    setSelectedData(undefined);
    if (!Array.isArray(exercises?.exercises)) return;
    setPageLoading(true);
    const selectedTask = exercises?.exercises.find(item => item.id === id);
    if (!selectedTask) return;
    const newBodyParams: TaskTypes.IBodyProps = {
      name: selectedTask.name,
      publishDate: selectedTask.publishDatetime,
      status: selectedTask.status,
      type: selectedTask.type,
      uuid: selectedTask.uuid,
      rewardAmount: selectedTask.rewardAmount,
      description: selectedTask.description,
      minutesToFinish: selectedTask.minutesToFinish,
      groupIds: selectedTask.groupIds.filter(curGroupId => curGroupId !== groupId),
    };
    updateTask && updateTask(newBodyParams, id, {
      onSuccess: () => {
        setPageLoading(false);
        getExercises && getExercises(exercisesDefaultQueryParams);
        notification.add({ ...DEFAULT_NOTIFICATION_DATA, description: 'Задание успешно удалено из данной группы' });
      },
      onError: () => {
        setPageLoading(false);
        notification.add(
          {
            ...DEFAULT_NOTIFICATION_DATA,
            type: NotificationType.Danger,
            description: 'Задание не удалилось с данной группы',
          });
      },
    });
  };

  const onDeleteClick = (selectedData: TabContentTypes.ISelectedData) => {
    if (selectedData.type === Type.EXERCISE) {
      onDeleteTaskFromGroup(selectedData.id);
      return;
    }
    if (selectedData.type === Type.COURSE) {
      onDeleteCourseFromGroup(selectedData.id);
      return;
    }
  };

  const getModalDescription = (mode: Type) => {
    if (mode === Type.EXERCISE) return 'выбранное задание';
    if (mode === Type.COURSE) return 'выбранный курс';
    return 'вырбанную игру';
  };

  const onSort = (label: string, sortDirection: SortDirection, mode: Type) => {
    if (mode === Type.EXERCISE) {
      setExercisePage(1);
      getExercises && getExercises(
        {
          ...exercisesDefaultQueryParams,
          order_field: (sortDirection !== SortDirection.Default) ? `${label}_${sortDirection}` : undefined,
          page: 1,
        });
      return;
    }
  };

  return (
    <div className="tab-content pt-32">
      <div className="mb-32">
        <Typography variant="h1">Контент</Typography>
        <Typography
          variant="text"
          className="ml-8"
        >
          ({total})
        </Typography>
      </div>
      <div className="mb-16">
        {tags.map(n => (
          <Button
            key={n.id}
            variant="subtext"
            color="grey_additional_2"
            className={classNames(
              'tab-content-type__button mr-16 py-8 px-20',
              { 'tab-content-type__button--active': currentTag.id === n.id },
            )}
            onClick={() => setCurrentTag(n)}
          >
            {n.name}
          </Button>
        ))}
      </div>
      <Table
        loading={tableLoading}
        headerData={currentTag.headerData}
        bodyData={currentTag.bodyData}
        onSort={(label: string, sortDirection: SortDirection) => onSort(label, sortDirection, currentTag.mode)}
      />
      <Pagination
        onGetPage={currentTag.onPageClick}
        total={currentTag.total || pageSize}
        page={exercisePage}
        pageSize={pageSize}
        className="mt-16"
      />
      {selectedData && (
        <Modal
          width={422}
          title={'Ограничение доступа'}
          cancelLabel="Отмена"
          deleteLabel="Удалить"
          closeColor="#7A7B82"
          onCloseClick={() => setSelectedData(undefined)}
          onDeleteClick={() => onDeleteClick(selectedData)}
        >
          <div className="d-flex flex-column px-32">
            <Typography variant="text">
              {`Вы действительно хотите удалить ${getModalDescription(selectedData.type)} из данной группы?`}
            </Typography>
          </div>
        </Modal>
      )}
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  courses: state.courseReducer.coursesByAdmin.data,
  coursesTotal: state.courseReducer.coursesByAdmin.total,
  coursesLoading: state.courseReducer.coursesByAdmin.loading,
  exercises: state.taskReducer.tasksAdmin.data,
  exerciseLoading: state.taskReducer.tasksAdmin.loading,
});

const mapDispatchToProps = {
  getCoursesByAdmin,
  updateCourse,
  getExercises: taskActions.getAdminTasks,
  updateTask: taskActions.updateTask,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(TabContent);
