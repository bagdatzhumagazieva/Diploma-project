import React from 'react';
import { AdminRouterPaths } from 'src/core/enum';
import Typography from 'src/components/atoms/Typography';
import Button from 'src/components/atoms/Button';
import ProgressBar from 'src/components/atoms/ProgressBar';

export const tableHeader = [
  {
    key: 'name',
    name: 'Название',
    width: '300px',
    render: (n: any) => (
      <Button
        type="link"
        to={`${AdminRouterPaths.GROUP_INFO}/${n.id}`}
        variant="text row__index"
        color="grey_additional_1"
      >
        {n.name && n.name.length > 30 ? `${n.name.substr(0, 30)}...` : n.name}
      </Button>
    ),
    sort: true,
  },
  {
    key: 'group_type',
    name: 'Тип групп',
    width: '208px',
    render: (n: any) => (
      <Typography
        variant="text row__index"
        color="grey_additional_1"
      >
        {n.groupType}
      </Typography>
    ),
    sort: true,
  },
  {
    key: 'employee_number',
    name: 'Пользователей',
    width: '170px',
    render: (n: any) => (
      <Typography
        variant="text row__index"
        color="grey_additional_1"
      >
        {n.employeeNumber}
      </Typography>
    ),
    sort: true,
  },
  {
    key: 'volume',
    name: 'Объем контента',
    width: '176px',
    render: (n: any) => (
      <Typography
        variant="text row__index"
        color="grey_additional_1"
      >
        {n.contentAmount}
      </Typography>
    ),
    sort: true,
  },
  {
    key: 'total_activity_percent',
    name: 'Активность',
    width: '220px',
    render: (n: any) => (
      <ProgressBar position="right" percent={n.totalActivityPercent} className="mt-2"/>
    ),
    sort: true,
  },
];
