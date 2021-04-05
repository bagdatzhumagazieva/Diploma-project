import React from 'react';
import { TableTypes } from 'src/components/molecules/Table/types';
import Typography from 'src/components/atoms/Typography';
import Hint from 'src/components/atoms/Hint';
import { GroupTypes } from 'src/store/group/types';
import Image from 'src/components/atoms/Image';
import { getRole } from 'src/utils/values';

export const ReportZealEmployeesTableHeaderData: TableTypes.IHeaderData[] = [
  {
    key: 'role_name',
    name: 'Имя, Роль',
    localSort: (a: any, b: any) => (a.firstName && b.firstName) ? a?.firstName.localeCompare(b?.firstName) : true,
    render: (n: any) => (
      <div
        className="d-flex align-items-center"
      >
        <div className="employees-table__user-img-wrap">
          <Image
            src={n.avatarThumbnail}
            alt={n.firstName}
            className="employees-table__user-img"
          />
        </div>
        <div className="d-flex flex-column ml-8">
          <Typography
            variant="subtext"
            color="main_50"
            className="mb-8 cursor-pointer"
          >
            {`${n.firstName || '-'} ${n.lastName || '-'}`}
          </Typography>
          <Typography
            color="grey_additional_2"
            variant="xsmall"
            className="mt-6"
          >
            {getRole(n.role).name}
          </Typography>
        </div>
      </div>
    ),
  },
  {
    key: 'branch',
    name: 'Филиал',
    render: (n: any) => (
      <Typography variant="subtext">{n.branchName || '-'}</Typography>
    ),
  },
  {
    key: 'group',
    name: 'Группа',
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
    key: 'cardsCount',
    name: 'Пройденных карточек',
    textAlign: 'center',
    localSort: (a: any, b: any) => a.cardsCount - b.cardsCount,
    render: (n: any) => (
      <Typography
        variant="subtext"
        classNames="d-block"
      >
        {n.cardsCount}
      </Typography>
    ),
  },
  {
    key: 'spentTime',
    name: 'Время на обучение',
    textAlign: 'center',
    localSort: (a: any, b: any) => a.spentTime - b.spentTime,
    render: (n: any) => (
      <Typography
        variant="subtext"
        classNames="d-block"
      >
        {n.spentTime}
      </Typography>
    ),
  },
];
