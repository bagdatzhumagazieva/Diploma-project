import React from 'react';
import Typography from 'src/components/atoms/Typography';
import { Link } from 'react-router-dom';
import Image from 'src/components/atoms/Image';
import { MarketplaceOrderTypes } from 'src/store/marketplace/types';
import { ReactComponent as SuccessIcon } from 'src/assets/img/icons/success.svg';
import { ReactComponent as ClockIcon } from 'src/assets/img/icons/clock.svg';
import { ReactComponent as XCircleIcon } from 'src/assets/img/icons/x-circle.svg';
import moment from 'moment';

export const MarketplaceOrderTableData = [
  {
    key: 'name',
    name: 'Название товара',
    width: '590px',
    render: (n: MarketplaceOrderTypes.IOrderRender) => (
      <div
      className="d-flex align-items-center"
    >
      <div className="content-task-img-wrap">
        <Image
          alt="my order image"
          src={n.item.images[0].imageThumbnailUrl || ''}
          className="content-task-img"
        />
      </div>
      <Link to="">
        <div className="d-flex flex-column ml-8 cursor-pointer">
          <Typography
            variant="subtext"
          >
            {n.item.name || ''}
          </Typography>
          <Typography
            variant="xsmall"
            color="grey_additional_2"
          >
            {n.item.description || ''}
          </Typography>
        </div>
      </Link>
    </div>
    ),
    sort: true,
  },
  {
    key: 'status',
    name: 'Статус заказа',
    width: '383px',
    render: (n: MarketplaceOrderTypes.IOrderRender) => (
      <div className="d-flex align-items-center">
        {n.status === MARKETPLACE_ORDER_STATUS[0].value ?
          <SuccessIcon className="shop-order__status-icon" />  : (
          n.status === MARKETPLACE_ORDER_STATUS[1].value ?
          <ClockIcon height={20} width={18} className="shop-order__status-icon--pending" /> :
          <XCircleIcon width={18} className="shop-order__status-icon" />
          )}
        <Typography
          variant="subtext"
          classNames="ml-16"
        >
          {MARKETPLACE_ORDER_STATUS.find(e => e.value === n.status)?.name || '-'}
        </Typography>
      </div>
    ),
    sort: true,
  },
  {
    key: 'date',
    name: 'Дата заказа',
    width: '213px',
    render: (n: MarketplaceOrderTypes.IOrderRender) => (
      <div className="d-flex">
        <Typography
          variant="subtext"
          classNames="ml-8"
        >
          {n.createdAt && moment(n.createdAt).format('DD.MM.YYYY, hh:mm')}
        </Typography>
      </div>
    ),
    sort: true,
  },
];

export const MARKETPLACE_ORDER_STATUS = [
  {
    value: 'FINISHED',
    name: 'Оплачен',
  },
  {
    value: 'PENDING',
    name: 'Ожидает',
  },
  {
    value: 'CANCELLED',
    name: 'Отменен',
  },
];
