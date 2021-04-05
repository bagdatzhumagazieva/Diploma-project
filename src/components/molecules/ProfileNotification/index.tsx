import React from 'react';
import { RouterPaths } from 'src/core/enum';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Typography from 'src/components/atoms/Typography';
import { getDate } from 'src/utils/format';
import { getIcon } from 'src/components/molecules/ProfileNotification/const';

import Image from 'src/components/atoms/Image';
import Button from 'src/components/atoms/Button';
import Preloader from 'src/components/atoms/Preloader';

import { ProfileNotificationTypes } from 'src/components/molecules/ProfileNotification/type';
import { NotificationsTypes } from 'src/store/notifications/types';
import 'src/components/molecules/ProfileNotification/index.scss';

function ProfileNotification(props: ProfileNotificationTypes.IProps) {
  const { notifications, loading } = props;

  const handleTurnNotification = () => {
    props.history.push(`/${RouterPaths.NOTIFICATION}`);
  };

  const unreadNotification = notifications ? notifications.filter(notification => !notification.isRead) : [];

  return (
    <div className="profile-notification">
      <Typography variant="h1" className="mt-24 pl-24">
        Уведомления
      </Typography>
      <Preloader
        size={30}
        label="Загрузка..."
        loading={!!loading}
        className="mx-auto mt-16"
      >
        {notifications && (
          <>
            <Typography variant="xsmall" color="whiter" className="profile-notification__count">
              {unreadNotification.length}
            </Typography>
            {unreadNotification.splice(0, unreadNotification.length > 6 ? 6 : unreadNotification.length).map(
              (e: NotificationsTypes.IRenderProps, i: number) => (
              <div className="profile-notification__item d-flex p-16 justify-content-between" key={i}>
                <div className="d-flex pl-24">
                  {e.isRead && <div className="profile-notification__item__read ml-24"/>}
                  <div className="profile-notification__item__icon">
                    <Image alt="Notification Icon" src={getIcon(e.notificationReason, e.entityType)}/>
                  </div>
                  {e.isBattle ? (
                    <div className="d-flex flex-column pl-16">
                      <Typography variant="xsmall" color="grey_additional_2">{getDate(e.date)}</Typography>
                      <span>
                        <Typography variant="subtext" color="main_50">{e.from}</Typography>
                        <Typography variant="subtext" color="grey_additional_1">
                           &nbsp; приглашает вас на баттл
                        </Typography>
                      </span>
                      <div className="d-flex mt-16">
                        <Button className="pt-4 pb-4 pl-8 pr-8" variant="xsmall">
                          Принять
                        </Button>
                        <Button
                          variant="xsmall"
                          type="link-black"
                          color="main_50"
                          className="pl-16"
                        >
                          Отклонить
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex flex-column pl-16">
                      <Typography
                        variant="subtext"
                        className="pb-4 cursor-pointer"
                        onClick={handleTurnNotification}
                      >{e.title}</Typography>
                      <Typography variant="subtext" color="grey_additional_1">{e.description}</Typography>
                    </div>
                  )}
                </div>
                <Typography variant="xsmall" color="grey_additional_2">
                  {getDate(e.date)}
                </Typography>
              </div>
            ))}
          </>
        )}
        {notifications && notifications.length > 0 && (
          <Button
            to={`/${RouterPaths.NOTIFICATION}`}
            variant="textmed"
            type="link-black"
            color="main_50"
            className="p-24"
          >
            Все уведомления
          </Button>
        )}
      </Preloader>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  notifications: state.notificationReducer.notification.data,
  loading: state.notificationReducer.notification.loading,
});

export default connect<any>(
  mapStateToProps,
)(withRouter(ProfileNotification));
