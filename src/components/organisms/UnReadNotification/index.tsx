import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import notificationActions from 'src/store/notifications/actions';

import Typography from 'src/components/atoms/Typography';
import Pagination from 'src/components/atoms/Pagination';
// import Button from 'src/components/atoms/Button';
// import FilterArrow from 'src/components/atoms/Svg/Table/filterArrow';
import Image from 'src/components/atoms/Image';
import Table from 'src/components/molecules/Table';
import Modal from 'src/components/molecules/Modal';

import { getIcon, NOTIFICATION_TABLE_HEADER } from 'src/components/molecules/ProfileNotification/const';
import { ProfileNotificationTypes } from 'src/components/molecules/ProfileNotification/type';
import { UnReadNotificationTypes } from 'src/components/organisms/UnReadNotification/types';
import { NotificationsTypes } from 'src/store/notifications/types';
import FlagIcon from 'src/assets/img/icons/admin-flag.svg';
import { SortDirection } from 'src/components/molecules/Table/types';
import './index.scss';

function UnReadNotification(props: UnReadNotificationTypes.IProps) {
  const { notifications, getNotification, total, loading, sendNotificationRead } = props;
  const pageSize = 6;
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [curNotification, setCurNotification] = useState<NotificationsTypes.IRenderProps>();
  const [notificationsBodyParams, setNotificationsBodyParams] = useState<NotificationsTypes.IQueryParams>(
    {
      page_size: pageSize,
      page: 1,
      orderField: 'created_at_desc',
    });

  const onPaginationPageClick = (page: number) => {
    setNotificationsBodyParams({ ...notificationsBodyParams, page });
  };

  const onClickNotification = (notification: NotificationsTypes.IRenderProps) => {
    setCurNotification(notification);
    setShowNotification(true);
    sendNotificationRead && sendNotificationRead(notification.id);
  };

  const onSort = (label: string, sortDirection: SortDirection) => {
    const newBodyParams = {
      ...notificationsBodyParams,
      orderField: (sortDirection !== SortDirection.Default) ? `${label}_${sortDirection}` : undefined,
    };
    setNotificationsBodyParams(newBodyParams);
  };

  const notificationsIcon = notifications ? notifications.map((n) => {
    return ({
      ...n,
      icon: getIcon(n.notificationReason, n.entityType),
    });
  }) : [];

  const TableHeader = [
    {
      key: 'bell',
      name: '',
      width: '72px',
      render: (n: ProfileNotificationTypes.INotification) => (
        <div>
          {n.isRead && <div className="notification-read"/>}
        </div>
      ),
    },
    {
      key: 'title',
      name: '????????',
      width: '298px',
      render: (n: ProfileNotificationTypes.INotification) => (
        <div className="d-flex cursor-pointer" onClick={() => onClickNotification(n)}>
          <div className="profile-notification__item__icon"><Image alt="Notification Icon" src={n.icon}/></div>
          <Typography variant={n.isRead ? 'textmed' : 'subtext'} className="mt-12 ml-8">
            {n.title}
            {n.isBattle && '?????????? ???? ??????????'}
          </Typography>
        </div>
      ),
      sort: true,
    },
    ...NOTIFICATION_TABLE_HEADER,
    {
      key: 'created_at',
      name: '???????? ?? ??????????',
      width: '186px',
      render: (n: ProfileNotificationTypes.INotification) => (
        <Typography variant="subtext">
          {moment(n.date).utc().calendar()}
        </Typography>
      ),
      sort: true,
    },
  ];

  useEffect(() => {
    getNotification && getNotification(notificationsBodyParams);
  },        [getNotification, notificationsBodyParams]);

  return (
    <div className="unread-notification">
      <Table
        loading={loading}
        onSort={onSort}
        headerData={TableHeader}
        bodyData={notificationsIcon}
      />
      <Pagination
        pageSize={pageSize}
        total={total || pageSize}
        className="mt-16"
        onGetPage={onPaginationPageClick}
      />
      {showNotification && (
        <Modal
          width={712}
          onCloseClick={() => setShowNotification(false)}
        >
          <div className="mx-32 my-24 d-flex flex-column">
            <div className="d-flex mb-16">
              <div className="ml-0 profile-notification__item__icon">
                <Image alt="Notification Icon" src={curNotification?.icon}/>
              </div>
              <Typography variant={curNotification?.isRead ? 'textmed' : 'subtext'} className="mt-12 ml-8">
                {curNotification?.title}
                {curNotification?.isBattle && '?????????? ???? ??????????'}
              </Typography>
            </div>
            <div className="d-flex mb-16">
              {curNotification?.isFlag && <Image alt="Flag" src={FlagIcon} />}
              <Typography variant="subtext" className="pl-16">
                {curNotification?.sender}
              </Typography>
            </div>
            <Typography variant="text" >
              {curNotification?.description}
            </Typography>
            {/*// TODO: add after appear back*/}
            {/*<div className="d-flex justify-content-end">*/}
            {/*  <Button*/}
            {/*    className="notification-modal-button d-flex align-items-center mt-24"*/}
            {/*    to={curNotification?.entityType === 'course' ? `education/course/${curNotification?.id}` : `/tasks-feed/${curNotification?.id}`}*/}
            {/*  >*/}
            {/*    ?????????????? <FilterArrow direction="right" className="ml-16"/>*/}
            {/*  </Button>*/}
            {/*</div>*/}
          </div>
        </Modal>
      )}
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return ({
    notifications: state.notificationReducer.unreadNotification.data,
    total: state.notificationReducer.unreadNotification.total,
    loading: state.notificationReducer.unreadNotification.loading,
  });
};

const mapDispatchToProps = {
  getNotification: notificationActions.getNotificationUnread,
  sendNotificationRead: notificationActions.sendNotificationRead,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(UnReadNotification);
