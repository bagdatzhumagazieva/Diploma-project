import React from 'react';
import moment from 'moment';

import Image from 'src/components/atoms/Image';
import Hint from 'src/components/atoms/Hint';
import Typography from 'src/components/atoms/Typography';

import { TableTypes } from 'src/components/molecules/Table/types';
import { CourseDetailTypes, Status } from 'src/store/course/types';
import { ICardGame } from 'src/components/molecules/Cards/CardGame/types';
import { ContentGamesTypes } from 'src/components/organisms/ContentComponents/ContentGames/types';
import { GameAdminTypes } from 'src/store/game/types';
import StatusComponent from 'src/components/atoms/Status';

export const GAME_STATUSES = [
  {
    value: 'DRAFT',
    name: 'В черновике',
  },
  {
    value: 'PUBLISHED',
    name: 'Опубликован',
  },
];

export const TABLE_HEADER = (onNameClick: (id: number) => void): TableTypes.IHeaderData[] => [
  {
    key: 'status',
    name: '',
    width: '56px',
    render: (n: CourseDetailTypes.IRenderProps) => (
      <StatusComponent status={n.status as string} />
    ),
  },
  {
    key: 'name.raw',
    name: 'Название',
    width: '499px',
    render: (n: ICardGame) => (
      <div
        className="d-flex align-items-center"
      >
        <div className="table__image-wrapper">
          <Image
            src={n.imageUrl || ''}
            alt={n.name}
            className="fill_w"
          />
        </div>
        <div
          className="d-flex flex-column ml-8 cursor-pointer text-overflow"
          style={{ width: 'calc(100% - 36px)' }}
        >
          <Typography
            variant="subtext"
            className="text-overflow fill_w cursor-pointer"
            onClick={() => onNameClick(n.id)}
          >
            {n.name || '-'}
          </Typography>
          <Typography
            variant="xsmall"
            color="grey_additional_2"
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
    key: 'template_id',
    name: 'Оболочка',
    width: '228px',
    render: (n: ICardGame) => (
      <Typography
        variant="subtext"
      >
        {n.template}
      </Typography>
    ),
    sort: true,
  },
  {
    key: 'group_ids',
    name: 'Группы',
    width: '140px',
    render: (n: ICardGame) => (
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
    key: 'created_at',
    name: 'Создан',
    width: '119px',
    render: (n: ICardGame) => (
      <Typography
        variant="subtext"
      >
        {n.createdAt ? moment(n.createdAt).format('DD.MM.YYYY') : '-'}
      </Typography>
    ),
    sort: true,
  },
];

export const DEFAULT_GAMES_FILTERS: ContentGamesTypes.IFilter = {
  page: 1,
  pageSize: 10,
};

export const parserGameResponse = (data: GameAdminTypes.IRenderGame[]): ICardGame[] => {
  return data.map(raw => ({
    id: raw.id,
    name: raw.name || '',
    description: raw.description || '',
    createdAt: raw.createdAt || '',
    cntLevels: 0,
    numberOfViews: raw.numberOfViews || 0,
    rewardAmount: raw.rewardAmount || 0,
    templateId: raw.templateId,
    template: raw.template,
    passedLevels: raw.levels?.map((n, index) => ({
      levelNum: index + 1,
      title: n.name || '',
      link: '',
    })),
    leaders: raw.topPlayers.map((n, index) => ({
      // TODO: add rank after back
      rank: n.username,
      userName: n.username,
      userImage: n.avatarThumbnailUrl,
      coins: n.rewardAmount,
    })),
    imageUrl: raw.imageUrl || '',
    imageThumbnailUrl: raw.imageThumbnailUrl || '',
    minutesToFinish: raw.minutesToFinish || 0,
    link: 'string',
    rating: raw.rating || 0,
    groups: raw.groups.map(e => ({ value: e.value, name: e.name })),
    status: raw?.status === Status.DRAFT ? Status.DRAFT : Status.PUBLISHED,
  }));
};
