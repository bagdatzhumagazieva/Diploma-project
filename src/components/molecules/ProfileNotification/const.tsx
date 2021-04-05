import React from 'react';
import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';
import { ProfileNotificationTypes } from 'src/components/molecules/ProfileNotification/type';
import { TableTypes } from 'src/components/molecules/Table/types';
import FlagIcon from 'src/assets/img/icons/admin-flag.svg';
import ExerciseIcon from 'src/assets/img/icons/exercise.svg';
import BookIcon from 'src/assets/img/icons/book.svg';
import EatIcon from 'src/assets/img/icons/eatting-point.svg';
import StarIcon from 'src/assets/img/icons/star-circle.svg';
import ShopIcon from 'src/assets/img/icons/shop.svg';

export const NOTIFICATION_TABLE_HEADER: TableTypes.IHeaderData[] = [
  {
    key: 'message',
    name: 'Сообщение',
    width: '382px',
    render: (n: ProfileNotificationTypes.INotification) => (
      <Typography variant={n.isRead ? 'textmed' : 'subtext'}>
        {n.description}
        {n.isBattle && 'Вас вызвали на баттл, скорее примите...'}
      </Typography>
    ),
  },
  {
    key: 'sender',
    name: 'Отправитель',
    width: '182px',
    render: (n: ProfileNotificationTypes.INotification) => (
      <div className="d-flex">
        {n.isFlag && <Image alt="Flag" src={FlagIcon} />}
        <Typography variant="subtext" className="pl-16">
          {n.sender}
        </Typography>
      </div>
    ),
  },
];

export const getIcon = (reason?: string, entityType?: string | null) => {
  if (entityType === 'exercise') {
    return ExerciseIcon;
  }
  if (entityType === 'course') {
    return BookIcon;
  }
  if (entityType === 'game') {
    return EatIcon;
  }
  if (reason === 'new_certificate' || reason === 'certificate_expired' || reason === 'achievement') {
    return StarIcon;
  }
  if (reason === 'custom') {
    return ShopIcon;
  }
  return EatIcon;
};
