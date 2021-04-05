import React, { useEffect, useState } from 'react';
import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';
import CancelIcon from 'src/components/atoms/Svg/Icons/cancel';

import { NotificationType, NotificationTypes } from 'src/components/molecules/Notification/types';
import iconSuccess from 'src/assets/img/icons/success.svg';
import iconDanger from 'src/assets/img/icons/danger.svg';
import iconWarning from 'src/assets/img/icons/warning.svg';
import iconInfo from 'src/assets/img/icons/icon-notification--info.svg';
import 'src/components/molecules/Notification/index.scss';

function Notification(props: NotificationTypes.IProps) {
  const [showNotification, setNotification] = useState(true);
  const { type, title, description, size, remove, withIcon, duration, width } = props;

  const notificationIcons = {
    [NotificationType.Success]: iconSuccess,
    [NotificationType.Danger]: iconDanger,
    [NotificationType.Warning]: iconWarning,
    [NotificationType.Info]: iconInfo,
  };

  useEffect(
    () => {
      const id = duration && setTimeout(
        () => {
          setNotification(false);
        },
        duration,
      );
      return () => {
        id && clearTimeout(id);
      };
    },
    [],
  );

  return (
    <>
      {showNotification && (
        <div
          style={{ width }}
          className={`d-flex notification align-items-center notification--${type} notification--${size}`}
        >
          {withIcon && (
            <Image
              src={notificationIcons[type]}
              alt={NotificationType[type]}
              classNames="notification__image"
            />
          )}
          <div className={`notification__content--${size} d-flex ${size === 'big' ? 'flex-column' : 'flex-row align-items-center'}`}>
            <Typography
              variant={size === 'big' ? 'h2' : 'textmed'}
              className="notification__title"
            >
              {title}
            </Typography>
            <Typography variant="text">{description}</Typography>
          </div>
          {duration && (
            <CancelIcon className="close-icon ml-auto" onClick={remove} />
          )}
        </div>
      )}
    </>
  );
}

export default Notification;
