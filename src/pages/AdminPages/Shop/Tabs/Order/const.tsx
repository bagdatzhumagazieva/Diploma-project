import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Typography from 'src/components/atoms/Typography';
import { ShopAdminOrderTypes } from 'src/store/item/types';
import Image from 'src/components/atoms/Image';
import { addAdminSlash } from 'src/routers/AdminRouters';
import { AdminRouterPaths } from 'src/core/enum';
import { ReactComponent as SuccessIcon } from 'src/assets/img/icons/success.svg';
import { ReactComponent as ClockIcon } from 'src/assets/img/icons/clock.svg';
import { ReactComponent as XCircleIcon } from 'src/assets/img/icons/x-circle.svg';
import 'src/pages/AdminPages/Shop/Tabs/Order/index.scss';

export const OrderTableData = [
  {
    key: 'created_at',
    name: 'Дата заказа',
    width: '189px',
    render: (n: ShopAdminOrderTypes.IRenderOrder) => (
      <Typography variant="subtext">
        {n.createdAt && moment(n.createdAt).format('DD.MM.YYYY, hh:mm')}
      </Typography>
    ),
    sort: true,
  },
  {
    key: 'employee',
    name: 'Покупатель',
    width: '222px',
    render: (n: ShopAdminOrderTypes.IRenderOrder) => (
      <div className="d-flex align-items-center">
        <Image alt="avatar" className="shop-order__user-avatar" src={n.employee.avatarThumbnailUrl || ''} />
        <Typography
          variant="subtext"
          color="main_50"
          className="ml-8"
        >
          {`${n.employee.firstName} ${n.employee.lastName}`}
        </Typography>
      </div>
    ),
    sort: true,
  },
  {
    key: 'name',
    name: 'Название приза',
    width: '400px',
    render: (n: ShopAdminOrderTypes.IRenderOrder) => (
      <div
        className="d-flex align-items-center"
      >
        <div className="content-task-img-wrap">
          <Image
            src={n.item?.images[0]?.imageThumbnailUrl || ''}
            alt={n.item?.name || ''}
            className="content-task-img"
          />
        </div>
        <Link to={addAdminSlash(`${AdminRouterPaths.SHOP}/${n.itemId}`)}>
          <div className="d-flex flex-column ml-8 cursor-pointer">
            <Typography
              variant="subtext"
              className="mb-2"
            >
              {n.item?.name && n.item?.name.length > 20 ? `${n.item?.name.substr(0, 20)}...` : n.item?.name || '-'}
            </Typography>
            <Typography variant="xsmall" color="grey_additional_2">
              {n.item?.description || '-'}
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
    width: '161px',
    render: (n: ShopAdminOrderTypes.IRenderOrder) => (
      <div className="d-flex align-items-center">
        {n.status === ORDER_STATUSES[0].value ?
          <SuccessIcon className="shop-order__status-icon" />  : (
          n.status === ORDER_STATUSES[1].value ?
          <ClockIcon height={20} width={18} className="shop-order__status-icon--pending" /> :
          <XCircleIcon width={18} className="shop-order__status-icon" />
          )}
        <Typography
          variant="subtext"
          classNames="ml-16"
        >
          {ORDER_STATUSES.find(e => e.value === n.status)?.name || '-'}
        </Typography>
      </div>
    ),
    sort: true,
  },
  {
    key: 'updated_at',
    name: 'Дата Доставки',
    width: '189px',
    render: (n: ShopAdminOrderTypes.IRenderOrder) => (
      <Typography variant="subtext">
        {n.updatedAt && moment(n.updatedAt).format('DD.MM.YYYY, hh:mm')}
      </Typography>
    ),
    sort: true,
  },
];

export const ORDER_STATUSES = [
  {
    value: 'FINISHED',
    name: 'Доставлен',
  },
  {
    value: 'PENDING',
    name: 'Ожидает',
  },
  {
    value: 'CANCELLED',
    name: 'Не доставлен',
  },
];
