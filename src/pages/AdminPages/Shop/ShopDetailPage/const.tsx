import React from 'react';
import { ItemBuyerTypes, ItemTypes } from 'src/store/item/types';
import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';
import moment from 'moment';
import PendingIcon from 'src/assets/img/icons/pending.svg';
import XCircleIcon from 'src/assets/img/icons/x-circle.svg';
import SuccessIcon from 'src/assets/img/icons/success.svg';

export const SHOP_DETAIL_TABS = [
  {
    value: '0',
    title: 'Отзывы',
  },
  {
    value: '1',
    title: 'Покупатели',
  },
];

export enum ShopStatus {
  Failed = 'FAILED',
  Pending = 'PENDING',
  Success = 'SUCCESS',
}

export const SHOP_TABLE_DATA = [
  {
    key: 'name',
    name: 'Покупатель',
    width: '370px',
    render: (n: ItemBuyerTypes.IRenderItemBuyer) => (
      <div className="d-flex align-items-center">
        <Image alt="avatar" className="shop-order__user-avatar" src={n.employee.avatarThumbnailUrl || ''} />
        <Typography
          variant="subtext"
          className="mb-2 ml-8"
        >
          {n.employee.firstName} {n.employee.lastName}
        </Typography>
      </div>
    ),
    sort: true,
  },
  {
    key: 'status',
    name: 'Статус заказа',
    width: '370px',
    render: (n: ItemBuyerTypes.IRenderItemBuyer) => (
      <div className="d-flex align-items-center">
        <Image
          alt={n.status === ShopStatus.Failed ? 'Не доставлен' : (n.status === ShopStatus.Success ? 'Доставлен' : 'Ожидает')}
          src={n.status === ShopStatus.Failed ?
            XCircleIcon : (n.status === ShopStatus.Success ? SuccessIcon : PendingIcon)}
          className="employees-table__status-img"
        />
        <Typography
          variant="subtext"
          className="ml-16"
        >
        {n.status === ShopStatus.Failed ? 'Не доставлен' : (
          n.status === ShopStatus.Success ? 'Доставлен' : 'Ожидает')}
        </Typography>
      </div>
    ),
    sort: true,
  },
  {
    key: 'date',
    name: 'Дата Заказа',
    width: '370px',
    render: (n: ItemBuyerTypes.IRenderItemBuyer) => (
      <div className="d-flex align-items-center">
        <Typography
          variant="subtext"
          className="mb-2"
        >
          {n.createdAt ? moment(n.createdAt).format('DD.MM.YYYY hh:mm') : '-'}
        </Typography>
      </div>
    ),
    sort: true,
  },
];

export const CONVERT_IMAGES_TO_SLIDER = (images: ItemTypes.ImageRenderProps[]) => {
  return images.map(i => ({ imgUrl: i.imageUrl, imgThumbnailUrl: i.imageThumbnailUrl }));
};
