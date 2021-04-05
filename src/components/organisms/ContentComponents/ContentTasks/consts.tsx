import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { addAdminSlash } from 'src/routers/AdminRouters';
import { AdminRouterPaths } from 'src/core/enum';

import Image from 'src/components/atoms/Image';
import Hint from 'src/components/atoms/Hint';
import Typography from 'src/components/atoms/Typography';
import ProgressBar from 'src/components/atoms/ProgressBar';
import { TaskTypes } from 'src/store/task/types';
import Status from 'src/components/atoms/Status';
import { getMicroLearningTitle } from 'src/components/atoms/MicroLearningText/consts';

export const TASK_STATUSES = [
  {
    value: 'DRAFT',
    name: 'В черновике',
  },
  {
    value: 'SCHEDULED',
    name: 'Запланирован',
  },
  {
    value: 'PUBLISHED',
    name: 'Опубликован',
  },
];

export const parseDataTask = (data: TaskTypes.IRenderAdminExercise) : TaskTypes.IBodyProps => ({
  id: data.id,
  uuid: data.uuid,
  groupIds: data.groupIds,
  name: data.name,
  image: data.imageUrl,
  imageThumb: data.imageThumbnailUrl,
  publishDate: data.publishDatetime,
  status: data.status,
  type: data.type,
  rewardAmount: data.rewardAmount,
  description: data.description,
  minutesToFinish: data.minutesToFinish,
});

export const TaskTableData = [
  {
    key: 'status',
    name: '',
    width: '56px',
    render: (n: TaskTypes.IRenderAdminExercise) => (
      <Status status={n.status} />
    ),
  },
  {
    key: 'name',
    name: 'Название',
    width: '456px',
    render: (n: TaskTypes.IRenderAdminExercise) => (
      <div
        className="d-flex align-items-center"
      >
        <div className="content-task-img-wrap">
          <Image
            src={n.imageUrl || ''}
            alt={n.name || ''}
            className="content-task-img"
          />
        </div>
        <Link to={addAdminSlash(`${AdminRouterPaths.TASK_DETAIL}/${n.id}`)}>
          <div className="d-flex flex-column ml-8 cursor-pointer">
            <Typography
              variant="subtext"
              className="mb-2"
            >
              {n.name && n.name.length > 35 ? `${n.name.substr(0, 37)}...` : n.name}
            </Typography>
            <Typography
              variant="xsmall"
              color="grey_additional_2"
              className="d-flex align-items-center mt-4"
            >
              + {n.rewardAmount} монет
              <span className="table__circle mx-12" />
              {n.minutesToFinish || '-' } мин
              <span className="table__circle mx-12" />
              {getMicroLearningTitle(n.type)}
            </Typography>
          </div>
        </Link>
      </div>
    ),
    sort: true,
  },
  {
    key: 'date',
    name: 'Дата',
    width: '168px',
    render: (n: TaskTypes.IRenderAdminExercise) => (
      <Typography
        variant="subtext"
      >
        {moment(n.publishDatetime).format(`DD.MM.YYYY${n.status === 'SCHEDULED' ? ', hh:mm' : ''}`)}
      </Typography>
    ),
    sort: true,
  },
  {
    key: 'group',
    name: 'Группы',
    width: '140px',
    render: (n: TaskTypes.IRenderAdminExercise) => (
      (n.groups && n.groups?.length) > 0 ?
        n.groups.length === 1 ?
          <Typography variant="subtext">
            {(n.groups && n.groups[0].name) || ''}
          </Typography> :
          <div className="d-inline-block">
            <Hint
              interactive
              showOnClick
              hasArrow
              placement="top"
              className="employees-table__group-hint"
              hint={
                <Typography
                  color="blacker"
                  variant="xxsmall"
                  classNames="d-block"
                >
                  {n.groups?.map(e => `${e.name || ''}, `)}
                </Typography>
              }
            >
              <Typography
                className="text-decoration_underline cursor-pointer"
                variant="subtext"
                classNames="content-task-table__group-names"
              >
                {n.groups?.length} групп
              </Typography>
            </Hint>
          </div> :
        <Typography variant="subtext">-</Typography>
    ),
  },
  {
    key: 'activity_percent',
    name: 'Процент исполнения',
    width: '220px',
    render: (n: TaskTypes.IRenderAdminExercise) => (
      <ProgressBar percent={n.activityPercent && n.activityPercent > 100 ? 100 : n.activityPercent || 0} />
    ),
    sort: true,
  },
];

export enum TaskAction {
  DRAFT,
  DELETE,
  PUBLICATE,
}
