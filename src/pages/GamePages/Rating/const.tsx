import React from 'react';
import Typography from 'src/components/atoms/Typography';
import Image from 'src/components/atoms/Image';
import { RatingTypes } from 'src/pages/GamePages/Rating/types';
import { EmploymentTypes, IEmploymentBodyParams } from 'src/store/employment/types';
import { IBranch } from 'src/components/molecules/BranchesStructure/types';
import { IBranch as IBranchScore } from 'src/components/atoms/Cards/CardTotalAmountBranches/types';

export const TABLE_HEADER = [
  {
    key: 'index',
    name: '#',
    width: '132px',
    render: (n: RatingTypes.IRatingTableBody) => (
      <Typography
        variant="text row__index"
        color="grey_additional_1"
      >
        {n.index}
      </Typography>
    ),
    localSort: (a: RatingTypes.IRatingTableBody, b: RatingTypes.IRatingTableBody) => (
      b.index && a.index && a.index - b.index
    ),
  },
  {
    // todo add rank
    key: 'players',
    name: 'Игроки',
    width: '360px',
    render: (n: RatingTypes.IRatingTableBody) => (
      <div
        className="d-flex align-items-center row__players"
      >
        <div className="players__image mr-8">
          <Image
            src={n.image}
            alt="Avatar of the user"
            className="fill players__image__img"
          />
        </div>
        <div className="d-flex flex-column">
          <Typography variant="subtext">{n.fullName}</Typography>
        </div>
      </div>
    ),
  },
  {
    key: 'reward_amount',
    name: 'Кол. баллов',
    width: '186px',
    render: (n: any) => (
      <div
        className="row__points"
      >
        <Typography
          variant="textmed"
          color="whiter"
          className="points__text"
        >
          {n.points}
        </Typography>
      </div>
    ),
    sort: true,
  },
  {
    key: 'sub_company',
    name: 'Филиал',
    width: '198px',
    render: (n: any) => (
      <Typography variant="subtext">{n.subCompany}</Typography>
    ),
  },
];

export const DEF_EMPLOYEE_PARAMS: IEmploymentBodyParams = {
  page_size: 6,
  order_field: 'reward_amount_desc',
};

export const parseEmployeeDataToTableData = (
  employee: EmploymentTypes.IRenderProps, i: number,
  bodyParams: IEmploymentBodyParams, pageSize: number,
): RatingTypes.IRatingTableBody => ({
  index: (!bodyParams.page || bodyParams.page === 1) ? (i + 1) : ((bodyParams.page - 1) * (pageSize + i + 1)),
  image: employee.avatarThumbnailUrl || '',
  fullName: employee.fullName,
  points: employee.rewardAmount,
  subCompany: employee.branch?.name || '',
});

export const parseBranchesToScore = (raw: IBranch): IBranchScore => ({
  name: raw.name,
  amount: raw.rewardAmount || 0,
});
