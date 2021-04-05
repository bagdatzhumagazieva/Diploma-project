import React from 'react';
import { Link } from 'react-router-dom';

import { ShopPrizesTypes } from 'src/store/item/types';
import { addAdminSlash } from 'src/routers/AdminRouters';
import { AdminRouterPaths } from 'src/core/enum';

import Hint from 'src/components/atoms/Hint';
import Typography from 'src/components/atoms/Typography';
import Image from 'src/components/atoms/Image';

import coin from 'src/assets/img/icons/coin.svg';
import { ReactComponent as IconEdit } from 'src/assets/img/icons/edit.svg';
import 'src/pages/AdminPages/Shop/Tabs/Prize/index.scss';

export const PrizeTableData = [
  {
    key: 'name',
    name: 'Название',
    width: '400px',
    render: (n: ShopPrizesTypes.IRenderItem) => (
      <div
        className="d-flex align-items-center"
      >
        <div className="content-task-img-wrap">
          <Image
            src={n.imageThumbnailUrl || ''}
            alt={n.name || ''}
            className="content-task-img"
          />
        </div>
        <Link to={addAdminSlash(`${AdminRouterPaths.SHOP}/${n.id}`)}>
          <div className="d-flex flex-column ml-8 cursor-pointer">
            <Typography
              variant="subtext"
              className="mb-2"
            >
              {n.name && n.name.length > 20 ? `${n.name.substr(0, 20)}...` : n.name}
            </Typography>
            <Typography variant="xsmall" color="grey_additional_2">
              {n.description}
            </Typography>
          </div>
        </Link>
      </div>
    ),
    sort: false,
  },
  {
    key: 'price',
    name: 'Стоимость',
    width: '141px',
    render: (n: ShopPrizesTypes.IRenderItem) => (
      <div className="d-flex align-items-center">
        <Image alt="coin" src={coin} className="content-task-rewards__coin mr-8"/>
        <Typography
          variant="subtext"
          color="main_50"
        >
          {n.price}
        </Typography>
      </div>
    ),
    sort: true,
  },
  {
    key: 'amount',
    name: 'В наличии',
    width: '136px',
    render: (n: ShopPrizesTypes.IRenderItem) => (
      <div className="d-flex">
        <Typography
          variant="subtext"
          classNames="ml-8"
        >
          {n.amount} шт.
        </Typography>
      </div>
    ),
    sort: true,
  },
  {
    key: 'group_ids',
    name: 'Группы',
    width: '140px',
    render: (n: ShopPrizesTypes.IRenderItem) => (
      (n.groups && n.groups?.length) > 0 ?
        n.groups.length === 1 ?
          <Typography variant="subtext">
            {(n.groups && n.groups[0].name) || ''}
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
                  {n.groups?.map(e => `${e.name || ''}, `)}
                </Typography>
              }
            >
              <Typography
                className="text-decoration_underline cursor-pointer"
                variant="subtext"
                classNames="content-task-table__group-names"
              >
                {n.groups?.length} групп
              </Typography>
            </Hint>
          </div> :
        <Typography variant="subtext">-</Typography>
    ),
    sort: true,
  },
  {
    key: 'number_of_sold',
    name: 'Покупателей',
    width: '154px',
    render: (n: ShopPrizesTypes.IRenderItem) => (
      <Typography
        variant="subtext"
        className="d-flex justify-content-center"
      >
        {n.numberOfSold || 0}
      </Typography>
    ),
    sort: true,
  },
  {
    key: 'edit',
    name: '',
    width: '72px',
    render: (n: ShopPrizesTypes.IRenderItem) => (
      <Link to={`${addAdminSlash(AdminRouterPaths.SHOP_EDITION)}/${n.id}`}>
        <IconEdit className="shop-prize__item__icon" />
      </Link>
    ),
  },
];
