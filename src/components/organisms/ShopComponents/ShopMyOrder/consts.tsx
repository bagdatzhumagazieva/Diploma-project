import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Typography from 'src/components/atoms/Typography';
import Image from 'src/components/atoms/Image';
import coin from 'src/assets/img/icons/coin.svg';
import { addSlash } from 'src/core/components/router';
import { RouterPaths } from 'src/core/enum';
import { ShopOrderTypes } from 'src/store/item/types';

export const TaskTableData = [
  {
    key: 'name',
    name: 'Название приза',
    width: '410px',
    render: (n: ShopOrderTypes.IItemOrderRender) => (
        <div
          className="d-flex align-items-center"
        >
          <div className="content-task-img-wrap">
            <Image
              alt="my order image"
              src={n.images[0].imageThumbnailUrl || ''}
              className="content-task-img"
            />
          </div>
          <Link to="">
            <div className="d-flex flex-column ml-8 cursor-pointer">
              <Typography
                variant="subtext"
              >
                <Link to={`${addSlash(RouterPaths.SHOP_DETAIL)}/${n.id}`}>
                  {n.name || ''}
                </Link>
              </Typography>
              <Typography
                variant="xsmall"
                color="grey_additional_2"
              >
                {n.description || ''}
              </Typography>
            </div>
          </Link>
        </div>
      ),
    sort: true,
  },
  {
    key: 'date',
    name: 'Дата',
    width: '160px',
    render: (n: ShopOrderTypes.IItemOrderRender) => (
      <Typography
        variant="subtext"
      >
        {moment(n.createdAt).utc().format('DD.MM.YYYY, hh:mm')}
      </Typography>
    ),
    sort: true,
  },
  {
    key: 'category',
    name: 'Категория',
    width: '146px',
    render: (n: ShopOrderTypes.IItemOrderRender) => (
        <div className="d-flex">
          <Typography
            variant="subtext"
            classNames="ml-8"
          >
            {n.categoryName}
          </Typography>
        </div>
      ),
  },
  {
    key: 'status',
    name: 'Статус заказа',
    width: '150px',
    render: (n: ShopOrderTypes.IItemOrderRender) => (
        <div className="d-flex">
          <Typography
            variant="subtext"
            classNames="ml-8"
          >
            {n.status === 'PENDING' ? 'В обработке' : 'Доставлен'}
          </Typography>
        </div>
      ),
  },
  {
    key: 'price',
    name: 'Цена',
    width: '128px',
    render: (n: ShopOrderTypes.IItemOrderRender) => (
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
    name: 'Количество',
    width: '132px',
    render: (n: ShopOrderTypes.IItemOrderRender) => (
        <div className="d-flex">
          <Typography
            variant="subtext"
            classNames="ml-8"
          >
            {n.amount}
          </Typography>
        </div>
      ),
    sort: true,
  },
];
