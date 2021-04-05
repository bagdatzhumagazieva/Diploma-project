import React from 'react';
import moment from 'moment';
import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import { BattlesTypes } from 'src/pages/GamePages/Battles/types';
import { BattleStatus, BattleUserStatus, RouterPaths } from 'src/core/enum';
import { BattleAggregatorTypes } from 'src/store/battles/types';
import { TableTypes } from 'src/components/molecules/Table/types';
import { ReactComponent as CoinIcon } from 'src/assets/img/icons/coin.svg';

export const pageSize = 5;

export const HeaderTableStartData: TableTypes.IHeaderData[] = [
  {
    key: 'sortByDate',
    name: 'Дата',
    width: '130px',
    render: (n: BattlesTypes.IBattle) => (
      <Typography
        variant="subtext"
      >
        {moment(n.createdDate).format('DD.MM.YYYY')}
      </Typography>
    ),
    sort: true,
  },
];

export const HeaderTableEndData = (onActionClick: (battle: BattlesTypes.IBattle, isIncome: boolean) => void): TableTypes.IHeaderData[] => [
  {
    key: 'sortByStatus',
    name: 'Статус',
    width: '174px',
    render: (n: BattlesTypes.IBattle) => (
      <div
        className="d-flex align-items-center battle-column-status"
      >
        <Typography variant="subtext">
          {(n.battleStatus === BattleStatus.FINISHED || n.battleStatus === BattleStatus.PENDING) ? (
            n.status === BattleUserStatus.WIN ? 'Победа' : n.status === BattleUserStatus.PENDING
              ? 'Ожидает' : 'Проигрыш') : n.battleStatus === BattleStatus.NEW ? (
            <>
              Истекает через
              <Typography variant="subtext" color="red" className="ml-4">{n.expiredHours} ч.</Typography>
            </>
          ) : getActionStatus(n.battleStatus)}
        </Typography>
      </div>
    ),
    sort: true,
  },
  {
    key: 'sortByRewardAmount',
    name: 'Награда',
    width: '127px',
    render: (n: BattlesTypes.IBattle) => (
      <div
        className="d-flex align-items-center"
      >
        {n.battleStatus === BattleStatus.FINISHED ? (
          <>
            <CoinIcon width={14} height={14} style={{ minWidth: 14 }} className="mr-4" />
            <Typography variant="subtext">{n.rewardAmount}</Typography>
          </>
        ) : (
          <Typography
            variant="subtext"
            color="grey_additional_2"
          >
            Нет данных
          </Typography>
        )}
      </div>
    ),
    sort: true,
  },
  {
    key: 'action',
    name: 'Действия',
    width: '155px',
    render: (n: BattlesTypes.IBattle) => (
      n.battleStatus === BattleStatus.NEW ? (
        <div className="d-flex flex-column">
          <Button
            className="px-8 py-4"
            variant="subtext"
            onClick={() => onActionClick(n, false)}
          >
            {n.isCreator ? 'Отозвать' : 'Отказаться'}
          </Button>
          {!n.isCreator && (
            <Button
              variant="subtext"
              className="px-8 py-4 mt-3"
              onClick={() => onActionClick(n, true)}
            >
              Принять
            </Button>
          )}
        </div>
      ) : n.battleStatus === BattleStatus.PENDING && !n.finishedDateTime ? (
        <>
          <Button
            className="px-8 py-4"
            variant="subtext"
            to={`/${RouterPaths.BATTLE}/${n.battleId}`}
          >
            Проходить
          </Button>
        </>
      ) :(<Typography variant="subtext" color="grey_additional_2">Нет действии</Typography>)
    ),
  },
  {
    key: 'rubrics',
    name: 'Рубрики',
    width: '353px',
    render: (n: BattlesTypes.IBattle) => (
      <>
        {n.rubrics.map(item => (
          <Typography key={item.id} variant="xsmallunderlined" className="mr-4">{item.name}</Typography>
        ))}
      </>
    ),
  },
];

export const parseBattles = (raw: BattleAggregatorTypes.IRenderBattle[]): BattlesTypes.IBattle[] => (
  raw.map(e => {
    const start = moment(new Date);
    const end = moment(e.expiresAt || '');
    return ({
      employmentId: e.employmentId,
      battleId: e.battleId,
      isCreator: e.isCreator,
      rivalEmploymentId: e.rivalEmployment.employmentId,
      status: getBattleUserStatus(e.status),
      userAvatar: e.employment.avatarThumbnailUrl,
      rivalUserAvatar: e.rivalEmployment.avatarThumbnailUrl,
      createdDate: e.createdAt,
      finishedDateTime: e.finishedBattleDatetime,
      battleStatus: getBattleStatus(e.battleStatus),
      rivalUserId: e.rivalEmployment.userId,
      rivalUserFullName: `${e.rivalEmployment.firstName || ''} ${e.rivalEmployment.lastName || ''}`,
      userFullName: `${e.employment.firstName || ''} ${e.employment.lastName || ''}`,
      rewardAmount: e.rewardAmount,
      imageUrl: e.rivalEmployment.avatarUrl || '',
      imageThumbnailUrl: e.rivalEmployment.avatarThumbnailUrl || '',
      expiredHours: Math.floor(moment.duration(end.diff(start)).asHours()),
      rubrics: e.categories.map(c => ({ id: c.categoryId, name: c.categoryName })) || [],
    });
  })
);

export const getBattleStatus = (status: string): BattleStatus => {
  switch (status) {
    case 'NEW': return BattleStatus.NEW;
    case 'REVOKED' : return  BattleStatus.REVOKED ;
    case 'FINISHED' : return  BattleStatus.FINISHED;
    case 'PENDING' : return BattleStatus.PENDING ;
    case 'CANCELED' : return BattleStatus.CANCELED ;
    default: return BattleStatus.EXPIRED;
  }
};

const getBattleUserStatus = (status: string): BattleUserStatus => {
  switch (status) {
    case 'WIN' : return  BattleUserStatus.WIN ;
    case 'LOSE' : return  BattleUserStatus.LOSE;
    default: return BattleUserStatus.PENDING;
  }
};

const getActionStatus = (status: BattleStatus): string => {
  switch (status) {
    case BattleStatus.PENDING: return 'Ожидает';
    case BattleStatus.EXPIRED: return 'Просрочено';
    case BattleStatus.CANCELED : return 'Отказано';
    case BattleStatus.REVOKED : return 'Отозвано';
    default: return 'Нет действии';
  }
};
