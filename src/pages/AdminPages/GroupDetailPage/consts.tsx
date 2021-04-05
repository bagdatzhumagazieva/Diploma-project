import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';
import MicroLearningText from 'src/components/atoms/MicroLearningText';
import coin from 'src/assets/img/icons/coin.svg';
import { addAdminSlash } from 'src/routers/AdminRouters';
import { AdminRouterPaths } from 'src/core/enum';
import { TableTypes } from 'src/components/molecules/Table/types';
import { TaskTypes } from 'src/store/task/types';
import { ITabOption } from 'src/components/molecules/Tabs/types';
import { CourseDetailTypes } from 'src/store/course/types';

export const GROUP_DETAIL_TABS: ITabOption[] = [
  {
    id: '0',
    label: 'Пользователи',
  },
  {
    id: '1',
    label: 'Контент',
  },
];

export const TASK_HEADER: TableTypes.IHeaderData[] = [
  {
    key: 'name',
    name: 'Название',
    width: '606px',
    render: (n: TaskTypes.IRenderAdminExercise) => (
      <div
        className="d-flex align-items-center"
      >
        <div className="tab-content-img-wrap">
          <Image
            src={n.imageThumbnailUrl || ''}
            alt={n.name || ''}
            className="tab-content-img"
          />
        </div>
        <Link to={addAdminSlash(`${AdminRouterPaths.TASK_DETAIL}/${n.id}`)}>
          <div
            className="d-flex flex-column ml-8 cursor-pointer"
          >
            <Typography
              variant="subtext"
            >
              {n.description && n.description.length > 70 ? `${n.description.substr(0, 70)}...` : n.description}
            </Typography>
            <Typography
              variant="xsmall"
              color="grey_additional_2"
            >
              {n.minutesToFinish || '-' } мин
            </Typography>
          </div>
        </Link>
      </div>
    ),
    sort: true,
  },
  {
    key: 'type',
    name: 'Тип',
    width: '186px',
    render: (n: TaskTypes.IRenderAdminExercise) => (
      <MicroLearningText type={n.type} />
    ),
  },
  {
    key: 'reward_amount',
    name: 'Награда',
    width: '127px',
    render: (n: TaskTypes.IRenderAdminExercise) => (
      <Typography
        variant="subtext"
        color="main_50"
        className="d-flex align-items-center"
      >
        <Image
          alt="Coin"
          src={coin}
          style={{
            width: 14,
            height: 14,
          }}
          className="mr-8"
        />
        +{n.rewardAmount}
      </Typography>
    ),
    sort: true,
  },
  {
    key: 'date',
    name: 'Опубликован',
    width: '127px',
    render: (n: TaskTypes.IRenderAdminExercise) => (
      <Typography variant="subtext">
        {n.publishDatetime && moment(n.publishDatetime).format('DD.MM.YYYY')}
      </Typography>
    ),
    sort: true,
  },
];

export const COURSE_HEADER: TableTypes.IHeaderData[] = [
  {
    key: 'name',
    name: 'Название',
    width: '530px',
    render: (n: CourseDetailTypes.IRenderProps) => (
      <div
        className="d-flex align-items-center"
      >
        <div className="tab-content-img-wrap">
          <Image
            src={n.imageThumbnailUrl || ''}
            alt={n.name}
            className="tab-content-img"
          />
        </div>
        <Link to={`admin/content/course/${n.id}`}>
          <div
            className="d-flex flex-column ml-8 cursor-pointer"
          >
            <Typography
              variant="subtext"
            >
              {n.name}
            </Typography>
            <Typography
              variant="xsmall"
              color="grey_additional_2"
            >
              {n.minutesToFinish || '-' } мин
            </Typography>
          </div>
        </Link>
      </div>
    ),
    sort: true,
  },
  {
    key: 'format',
    name: 'Формат',
    width: '264px',
    render: (n: CourseDetailTypes.IRenderProps) => (
      <Typography variant="subtext">Microlearning</Typography>
    ),
    sort: true,
  },
  {
    key: 'rewards',
    name: 'Награда',
    width: '127px',
    render: (n: CourseDetailTypes.IRenderProps) => (
      <Typography
        variant="subtext"
        color="main_50"
        className="d-flex align-items-center"
      >
        <Image
          alt="Coin"
          src={coin}
          style={{
            width: 14,
            height: 14,
          }}
          className="mr-8"
        />
        +{n.rewardAmount}
      </Typography>
    ),
    sort: true,
  },
  {
    key: 'published',
    name: 'Опубликован',
    width: '183px',
    render: (n: CourseDetailTypes.IRenderProps) => (
      <Typography variant="subtext">
        {n.createdAt ? moment(n.createdAt).format('DD.MM.YYYY') : '-'}
      </Typography>
    ),
    sort: true,
  },
];
