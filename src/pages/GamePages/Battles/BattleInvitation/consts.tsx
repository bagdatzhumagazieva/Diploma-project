import React from 'react';
import { Link } from 'react-router-dom';
import { TableTypes } from 'src/components/molecules/Table/types';
import Typography from 'src/components/atoms/Typography';
import Image from 'src/components/atoms/Image';
import { BattleInvitationTypes } from 'src/pages/GamePages/Battles/BattleInvitation/types';
import { BattleEmployeesTypes } from 'src/store/battles/types';
import { ReactComponent as BattleIcon } from 'src/assets/img/icons/battle.svg';
import Hint from 'src/components/atoms/Hint';

export const BattleInvitationHeaderData = (onClickName: (id: number) => void) : TableTypes.IHeaderData[] => [
  {
    key: 'userFullName',
    name: 'Имя, Роль соперника',
    width: '192px',
    render: (n: BattleInvitationTypes.TableTypes) => (
      <div
        className="d-flex align-items-center"
      >
        <div className="table__image-wrapper">
          <Image
            src={n.imageThumbnailUrl || ''}
            alt={n.userFullName || ''}
          />
        </div>
        <div className="d-flex flex-column ml-8" style={{ width: 'calc(100% - 42px)' }}>
          <Link to={'#'} onClick={() => onClickName(n.id)}>
            <Typography
              variant="subtext"
              className="table__user-name mb-2 cursor-pointer"
              color="main_50"
            >
              {n.userFullName}
            </Typography>
          </Link>
        </div>
      </div>
    ),
    sort: true,
  },
  {
    key: 'branch',
    name: 'Филиал',
    width: '206px',
    render: (n: BattleInvitationTypes.TableTypes) => (
      <Typography variant="subtext" className="text-overflow fill_w">{n.branch}</Typography>
    ),
  },
  {
    key: 'statistics',
    name: 'Победы / Поражения',
    width: '206px',
    render: (n: BattleInvitationTypes.TableTypes) => (
      <Typography variant="subtext" className="d-flex align-items-center">
        <BattleIcon className="mr-16" />
        {n.winAmount} / {n.lostAmount}
      </Typography>
    ),
  },
  {
    key: 'groups',
    name: 'Группы',
    width: '146px',
    render: (n: BattleInvitationTypes.TableTypes) => (
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
];

export const parseBattleEmployees = (raw: BattleEmployeesTypes.IRenderProps[]): BattleInvitationTypes.TableTypes[] => (
  raw.map(e => ({
    id: e.userId,
    userFullName: `${(e.firstName || '')} ${(e.lastName || '')}`,
    branch: e.branchName || '',
    winAmount: e.battlesStat.winCount || 0,
    lostAmount: e.battlesStat.loseCount || 0,
    imageThumbnailUrl: e.avatarThumbnailUrl,
    groups: e.groups.map(g => ({ id: g.id, name: g.name })),
  }))
);
