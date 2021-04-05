import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { mapPropsToAttributes } from 'src/core/components';

import Button from 'src/components/atoms/Button';
import CardTaskGroup from 'src/components/atoms/Cards/CardTask/CardTaskGroup.index';

import { TasksWithTypesTypes, IUserTaskWithType } from 'src/components/molecules/UserActivityTasks/types';
import { IUserTask, IUserTaskType } from 'src/components/atoms/Cards/CardTask/types';
import './index.scss';

function TasksWithTypes(props: TasksWithTypesTypes.IProps) {
  const { typeOptions, tasks: propsTasks, onClickStatusByType, curTaskStatus } = props;
  const [showAll] = useState(true);

  const attributes = mapPropsToAttributes<TasksWithTypesTypes.IProps>(
    props, 'tasks-with-types', 'd-flex', 'flex-column',
  );

  const filterByType = (type: string):IUserTaskWithType => {
    onClickStatusByType && onClickStatusByType(type);
    return {
      type,
      tasks: propsTasks.filter((task: IUserTask) => type !== 'all' ? task.type === type : task),
    };
  };
  const [curTasks, setCurTasks] = useState<IUserTaskWithType>(filterByType(curTaskStatus));

  const onButtonTypeClick = (type: string) => () => setCurTasks(filterByType(type));

  useEffect(
    () => {
      if (propsTasks) {
        setCurTasks(filterByType(curTaskStatus));
      }
    },
    [propsTasks],
  );

  return (
    <div {...attributes}>
      <div className="mb-28">
        {typeOptions.map((item:IUserTaskType) => (
          <Button
            variant="subtext"
            key={item.type}
            classNames={classNames(
              'tasks-with-types__button', 'mr-16',
              { 'tasks-with-types__button--active': curTasks.type === item.type },
            )}
            onClick={onButtonTypeClick(item.type)}
          >
            {item.title}
          </Button>
        ))}
      </div>
      <CardTaskGroup isShowAll={showAll} tasks={curTasks.tasks} />
    </div>
  );
}

export default TasksWithTypes;
