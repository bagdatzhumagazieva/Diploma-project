import React from 'react';
import Typography from 'src/components/atoms/Typography';
import Image from 'src/components/atoms/Image';
import Hint from 'src/components/atoms/Hint';
import moment from 'moment';
import { GroupTypes } from 'src/store/group/types';
import IconCheck from 'src/assets/img/icons/success.svg';
import IconLock from 'src/assets/img/icons/lock.svg';
import ProgressBar from 'src/components/atoms/ProgressBar';
import { TableTypes } from 'src/components/molecules/Table/types';

export const EmployeesTableHeaderData: TableTypes.IHeaderData[] = [
  {
    key: 'branch',
    name: 'Филиал',
    sort: true,
    render: (n: any) => (
      <Typography variant="subtext">{n.branch && n.branch.name}</Typography>
    ),
  },
  {
    key: 'group',
    name: 'Группа',
    sort: true,
    render: (n: any) => (
      (n.groups && n.groups.length) > 0 ?
        n.groups.length === 1 ?
          <Typography variant="subtext">{n.groups[0].name}</Typography> :
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
                  {n.groups.map((m: GroupTypes.IRenderProps) => m.name).join(', ')}
                </Typography>
              }
            >
              <Typography
                className="text-decoration_underline"
                variant="subtext"
                classNames="employees-table__group-names"
              >
                {n.groups.length} групп
              </Typography>
            </Hint>
          </div> :
        <Typography variant="subtext">-</Typography>
    ),
  },
  {
    key: 'status',
    name: 'Статус',
    width: '114px',
    textAlign: 'center',
    sort: true,
    render: (n: any) => (
      <Hint
        interactive
        placement="top"
        className="employees-table__status-hint"
        hint={
          <Typography
            color="whiter"
            variant="xxsmall"
            classNames="d-block"
          >
            {n.isBlocked ? 'Заблокирован' : 'Активен'}
          </Typography>
        }
      >
        <Image
          alt={n.isBlocked ? 'Заблокирован' : 'Активен'}
          src={n.isBlocked ? IconLock : IconCheck}
          className="employees-table__status-img"
        />
      </Hint>
    ),
  },
  {
    key: 'last_login_time',
    sort: true,
    name: 'Был(-а) онлайн',
    render: (n: any) => (
      <Typography variant="subtext">
        {n.lastLoginTime ? moment(n.lastLoginTime).utc().format('DD.MM.YYYY hh:mm') : '-'}
      </Typography>
    ),
  },
  {
    key: 'activity',
    sort: true,
    name: 'Активность',
    render: (n: any) => (
      <ProgressBar
        percent={n.activityPercent}
        position="right"
      />
    ),
  },
];
