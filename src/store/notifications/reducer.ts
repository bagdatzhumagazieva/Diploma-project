import { ActionType, ILoadTypes, IPaginationResponseTypes } from 'src/core/store/types';
import { GET_NOTIFICATION, GET_NOTIFICATION_UNREAD, NotificationsTypes } from 'src/store/notifications/types';
import { combineReducers } from 'redux';

export const pareNotification = (raw: NotificationsTypes.IResponseProps): NotificationsTypes.IRenderProps => ({
  date: raw.updated_at,
  isRead: raw.is_read,
  title: raw.title,
  id: raw.id,
  description: raw.text,
  sender: raw.sender,
  isFlag: raw.sender === 'system' || raw.sender === 'admin',
  entityType: raw.entity_type,
  notificationReason: raw.notification_reason,
});

const notification = (
  state = { data: null, loading: false },
  action: ActionType<IPaginationResponseTypes<{ notifications: NotificationsTypes.IResponseProps[] }>>,
): ILoadTypes<NotificationsTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case GET_NOTIFICATION.started:
      return {
        data: null,
        loading: true,
      };
    case GET_NOTIFICATION.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_NOTIFICATION.success:
      if (!action.notifications) {
        return {
          data: null,
          loading: false,
        };
      }
      const { notifications, total } = action.notifications;
      const parsed = notifications.map((n: NotificationsTypes.IResponseProps) => {
        return pareNotification(n);
      });
      return {
        total,
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const unreadNotification = (
  state = { data: null, loading: false },
  action: ActionType<IPaginationResponseTypes<{ notifications: NotificationsTypes.IResponseProps[] }>>,
): ILoadTypes<NotificationsTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case GET_NOTIFICATION_UNREAD.started:
      return {
        data: null,
        loading: true,
      };
    case GET_NOTIFICATION_UNREAD.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_NOTIFICATION_UNREAD.success:
      if (!action.notifications) {
        return {
          data: null,
          loading: false,
        };
      }
      const { notifications, total } = action.notifications;
      const parsed = notifications.map((n: NotificationsTypes.IResponseProps) => {
        return pareNotification(n);
      });
      return {
        total,
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const notificationReducer = combineReducers({ notification, unreadNotification });

export default notificationReducer;
