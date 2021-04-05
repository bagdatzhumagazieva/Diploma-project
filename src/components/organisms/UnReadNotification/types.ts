import { NotificationsTypes } from 'src/store/notifications/types';
import { IPaginationTypes } from 'src/core/store/types';

export namespace UnReadNotificationTypes {
  export interface IProps {
    notifications?: NotificationsTypes.IRenderProps[];
    total?: number;
    loading?: boolean;
    getNotification?: (params: IPaginationTypes) => void;
    sendNotificationRead?: (id: number) => void;
  }
}
