import React, { useEffect, useState, useMemo } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { mapPropsToAttributes } from 'src/core/components';

import activitiesActions from 'src/store/activities/actions';

import Button from 'src/components/atoms/Button';
import Pagination from 'src/components/atoms/Pagination';
import TasksWithTypes from 'src/components/molecules/UserActivityTasks/tasksWithTypes.index';

import { UserActivityTasksTypes } from 'src/components/molecules/UserActivityTasks/types';
import { IUserTask } from 'src/components/atoms/Cards/CardTask/types';
import { ActivitiesTypes } from 'src/store/activities/types';
import { USER_TASK_STATUSES, TASK_TYPES } from 'src/components/atoms/Cards/CardTask/consts';
import { parseExercisesToTask } from 'src/components/molecules/UserActivityTasks/consts';
import './index.scss';

function UserActivityTasks(props: UserActivityTasksTypes.IProps) {
  const {
    statusOptions, total, companyId,
    getActivitiesCount, getActivities, activities, activitiesCount,
  } = props;
  const pageSize = 10;
  const [statusByType, setStatusByType] = useState(TASK_TYPES[0].type);
  const [statusTasks, setStatusTasks] = useState(USER_TASK_STATUSES.AWAITING);
  const defaultParams = {
    page: 1,
    pageSize: 10,
    progress: 'not_started',
    entityType: TASK_TYPES[0].type,
  };
  const [bodyParams, setBodyParams] = useState(defaultParams);

  const attributes = mapPropsToAttributes<UserActivityTasksTypes.IProps>(
    props, 'user-activity-tasks', 'd-flex', 'flex-column',
  );
  const propsTasks: IUserTask[] = useMemo(
    () => activities ? activities.map(activities => parseExercisesToTask(activities)) : [],
    [activities],
  );

  const onClickStatusByType = (status: string) => {
    setStatusByType(status);
  };

  useEffect(
    () => {
      if (typeof companyId !== 'number') return;
      getActivitiesCount && getActivitiesCount();
      setBodyParams(defaultParams);
    },
    [companyId],
  );

  useEffect(
    () => {
      let progress = 'not_started';
      if (statusTasks === USER_TASK_STATUSES.CURRENT) {
        progress = 'in_progress';
      } else if (statusTasks === USER_TASK_STATUSES.COMPLETED) {
        progress = 'finished';
      }

      const params = {
        ...bodyParams,
        progress,
        entityType: statusByType,
      };
      getActivities && getActivities(params);
    },
    [statusTasks, statusByType, bodyParams],
  );

  const onTaskStatusClick = (status: string) => () => {
    setStatusTasks(status);
    setBodyParams(
      {
        ...bodyParams,
        page: 1,
        pageSize: 10,
      });
  };

  const onPaginationPageClick = (page: number) => {
    setBodyParams({ ...bodyParams, page });
  };

  const getStatusCount = (index: number, activitiesCount?: ActivitiesTypes.IRenderActivitiesCountProps) => {
    if (activitiesCount) {
      const key = Object.keys(activitiesCount).find((activitiesCount, indexCount) => indexCount === index);
      return key ? activitiesCount[key] : 0;
    }
    return '0';
  };

  return (
    <div {...attributes}>
      <div className="user-activity-tasks__status-options">
        {statusOptions.map((status, index) => (
          <Button
            key={status.status}
            variant="text"
            onClick={onTaskStatusClick(status.status)}
            classNames={classNames(
              'status-options__button', 'p-0', 'py-12',
              { 'status-options__button--active': statusTasks === status.status },
              { 'status-options__button--middle': index === 1 },
            )}
          >
            {status.title} {getStatusCount(index, activitiesCount)}
          </Button>
        ))}
      </div>
      <TasksWithTypes
        key={statusTasks}
        curTaskStatus={statusByType}
        typeOptions={TASK_TYPES}
        tasks={propsTasks}
        onClickStatusByType={onClickStatusByType}
        classNames="p-24 pb-0 user-activity-tasks__tasks-with-types"
      />
      <Pagination
        pageSize={pageSize}
        total={total || pageSize}
        className="mt-16"
        onGetPage={onPaginationPageClick}
      />
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  activities: state.activitiesReducer.activities.data,
  activitiesLoading: state.activitiesReducer.activities.loading,
  total: state.activitiesReducer.activities.total,
  activitiesCount: state.activitiesReducer.activitiesCount.data,
});

const mapDispatchToProps = {
  getActivities: activitiesActions.getActivities,
  getActivitiesCount: activitiesActions.getActivitiesCount,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(UserActivityTasks);
