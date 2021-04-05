import { RouteComponentProps } from 'react-router';
import { NotificationsTypes } from 'src/store/notifications/types';

export namespace NotificationPageTypes {
  export interface IProps extends RouteComponentProps {
    notifications?: NotificationsTypes.IRenderProps[];
    loading?: boolean;
  }
}
