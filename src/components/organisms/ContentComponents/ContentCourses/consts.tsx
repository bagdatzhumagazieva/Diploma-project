import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import Typography from 'src/components/atoms/Typography';
import Image from 'src/components/atoms/Image';
import Hint from 'src/components/atoms/Hint';

import { TableTypes } from 'src/components/molecules/Table/types';
import { CourseDetailTypes } from 'src/store/course/types';
import { ContentCoursesTypes } from 'src/components/organisms/ContentComponents/ContentCourses/types';
import 'src/components/organisms/ContentComponents/ContentCourses/index.scss';
import Status from 'src/components/atoms/Status';

export const TABLE_HEADER: TableTypes.IHeaderData[] = [
  {
    key: 'status',
    name: '',
    width: '56px',
    render: (n: CourseDetailTypes.IRenderProps) => (
      <Status status={n.status as string} />
    ),
  },
  {
    key: 'name',
    name: 'Название',
    width: '536px',
    render: (n: CourseDetailTypes.IRenderProps) => (
      <div
        className="d-flex align-items-center"
      >
        <div className="course-img-wrap">
          <Image
            src={n.imageUrl || ''}
            alt={n.name}
            className="course-img"
          />
        </div>
        <div
          className="d-flex flex-column ml-8 cursor-pointer text-overflow"
          style={{ width: 'calc(100% - 36px)' }}
        >
          <Link to={`/admin/content/course/${n.id}`}>
            <Typography
              variant="subtext"
              className="text-overflow fill_w"
            >
              {n.name || '-'}
            </Typography>
          </Link>
          <Typography
            variant="xsmall"
            color="grey_additional_2 d-flex align-items-center"
          >
            + {n.rewardAmount} монет
            <span className="table__circle mx-12" />
            {n.minutesToFinish || '-' } мин
          </Typography>
        </div>
      </div>
    ),
    sort: true,
  },
  {
    key: 'format',
    name: 'Формат',
    width: '134px',
    render: () => (
      <Typography
        variant="subtext"
      >
        Microlearning
      </Typography>
    ),
  },
  {
    key: 'groups',
    name: 'Группы',
    width: '195px',
    render: (n: CourseDetailTypes.IRenderProps) => (
      (Array.isArray(n.groups) && n.groups.length > 0) ?
        n.groups.length === 1 ?
          <Typography variant="subtext">
            {n.groups[0]?.name || '-'}
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
                  {n.groups.map(item => `${item.name}, `)}
                </Typography>
              }
            >
              <Typography
                className="text-decoration_underline cursor-pointer"
                variant="subtext"
                classNames="content-task-table__group-names"
              >
                {n.groups.length} групп
              </Typography>
            </Hint>
          </div> :
        <Typography variant="subtext">-</Typography>
    ),
    sort: true,
  },
  {
    key: 'createdAt',
    name: 'Создан',
    width: '119px',
    render: (n: CourseDetailTypes.IRenderProps) => (
        <Typography
            variant="subtext"
        >
          {moment(n.createdAt).format('DD.MM.YYYY')}
        </Typography>
    ),
    sort: true,
  },
];

export const COURSE_STATUSES = [
  {
    value: 'DRAFT',
    name: 'В черновике',
  },
  {
    value: 'PUBLISHED',
    name: 'Опубликован',
  },
];

export const DEFAULT_COURSE_FILTERS_DATA: ContentCoursesTypes.IFilter = {
  page: 1,
  pageSize: 10,
  endTime: undefined,
  startTime: undefined,
  groups: [],
  status: undefined,
  keyword: undefined,
  orderField: undefined,
  orderDirection: undefined,
};

export const getQueryParams = (filterData: ContentCoursesTypes.IFilter): CourseDetailTypes.IAdminQuery => ({
  groupIds: filterData.groups?.filter(item => item.checkboxChecked).map(item => +item.value),
  status: filterData.status?.value,
  keyword: filterData.keyword,
  page: filterData.page,
  pageSize: filterData.pageSize,
  startTime: filterData.startTime,
  endTime: filterData.endTime,
  orderField: filterData.orderField,
  orderDirection: filterData.orderDirection,
});
