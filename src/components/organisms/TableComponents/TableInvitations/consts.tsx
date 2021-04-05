import React from 'react';
import moment from 'moment';
import Hint from 'src/components/atoms/Hint';
import Typography from 'src/components/atoms/Typography';
import { GroupTypes } from 'src/store/group/types';
import { InvitationTypes } from 'src/store/invitation/types';
import { TableTypes } from 'src/components/molecules/Table/types';

export enum InvitationStatus {
  Expired = 'expired',
  Pending = 'pending',
  Accepted = 'accepted',
}
export const INVITATION_STATUSES = [
  {
    value: InvitationStatus.Accepted,
    name: 'Подтвержден',
  },
  {
    value: InvitationStatus.Expired,
    name: 'Просрочен',
  },
  {
    value: InvitationStatus.Pending,
    name: 'В ожидании',
  },
];

export const InvitationsTableHeaderData: TableTypes.IHeaderData[] = [
  {
    key: 'email',
    name: 'Email / телефон',
    render: (n: InvitationTypes.IRenderProps) => (
      <Typography variant="subtext">{n.email} {n.phone}</Typography>
    ),
  },
  {
    key: 'send_date',
    name: 'Дата отправки',
    sort: true,
    width: '166px',
    render: (n: InvitationTypes.IRenderProps) => (
      <Typography variant="subtext">
        {moment(n.sendAt).format('DD.MM.YYYY HH:mm')}</Typography>
    ),
  },
  {
    key: 'branch',
    name: 'Филиал',
    sort: true,
    render: (n: InvitationTypes.IRenderProps) => (
      <Typography variant="subtext">{n.branch && n.branch.name}</Typography>
    ),
  },
  {
    key: 'group',
    name: 'Группа',
    sort: true,
    render: (n: InvitationTypes.IRenderProps) => (
      (n.groups && n.groups.length) > 0 ?
        n.groups.length === 1 ?
          <Typography variant="subtext">{n.groups[0].name}</Typography> :
            <div className="d-inline-block">
            <Hint
              interactive
              showOnClick
              hasArrow
              placement="top"
              className="invitations-table__group-hint"
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
                classNames="invitations-table__group-names"
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
    name: 'Статусы',
    sort: true,
    width: '134px',
    render: (n: InvitationTypes.IRenderProps) => (
      <Typography
        variant="subtext"
        classNames={`invitation__status--${n.status}`}
      >
        {n.status === InvitationStatus.Expired ? 'Просрочен' : (
          n.status === InvitationStatus.Accepted ? 'Подтвержден' : 'В ожидании')}
      </Typography>
    ),
  },
];
