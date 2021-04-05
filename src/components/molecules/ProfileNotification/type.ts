import { RouteComponentProps } from 'react-router';
import { NotificationsTypes } from 'src/store/notifications/types';

export namespace ProfileNotificationTypes {
  export interface IProps extends RouteComponentProps{
    notifications?: NotificationsTypes.IRenderProps[];
    loading?: boolean;
  }

  export interface INotification {
    icon: string;
    id: number;
    date: string;
    isRead: boolean;
    title?: string;
    description?: string;
    isBattle?: boolean;
    from?: string;
    sender?: string;
    isFlag?: boolean;
  }
}
