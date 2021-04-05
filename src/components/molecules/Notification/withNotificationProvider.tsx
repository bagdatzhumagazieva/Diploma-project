import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { generateId } from 'src/utils/generation';
import Notification from 'src/components/molecules/Notification/index';
import NotificationContext from 'src/components/molecules/Notification/NotificationContext';
import { IRenderBody } from 'src/core/components/types';
import { NotificationProviderTypes, NotificationTypes } from 'src/components/molecules/Notification/types';

const withNotificationProvider = <P extends object>(Component: React.ComponentType<P>) => {
  function WithNotificationProvider(props: P) {
    const [notifications, setNotifications] = useState<NotificationProviderTypes.IProps[]>([]);

    const add = (params: NotificationTypes.IProps) => {
      const id = generateId();
      setNotifications([...notifications, { id, ...params }]);
    };

    const remove = (id: string) => {
      setNotifications(notifications.filter((n: NotificationProviderTypes.IProps) => n.id !== id));
    };

    const addStateNotification = (notification: IRenderBody) => {
      add({
        type: notification.responseType,
        description: notification.description,
        duration: 5000,
        size: 'small',
        width: '600px',
      });
    };

    const providerValue = useMemo(() => ({ add, remove, addStateNotification }), [notifications]);

    return (
      <NotificationContext.Provider value={providerValue}>
        <Component {...props} />
        {createPortal(
          <div className="notifications-wrapper">
            {notifications.map(n => (
              <Notification
                key={n.id}
                {...n}
                remove={() => remove(n.id)}
              />
            ))}
          </div>,
          document.body,
        )}
      </NotificationContext.Provider>
    );
  }
  return WithNotificationProvider;
};

export default withNotificationProvider;
