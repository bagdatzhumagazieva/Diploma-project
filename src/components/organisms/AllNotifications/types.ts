import { NotificationsTypes } from 'src/store/notifications/types';

export namespace AllNotificationsTypes {
  export interface IProps {
    notifications?: NotificationsTypes.IRenderProps[];
    total?: number;
    loading?: boolean;
    getNotification?: (params: NotificationsTypes.IQueryParams) => void;
  }
}
