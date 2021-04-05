import React from 'react';
import { IRenderBody } from 'src/core/components/types';
import { NotificationTypes } from 'src/components/molecules/Notification/types';

interface IContextProps {
  add: (params: NotificationTypes.IProps) => void;
  remove: (id: string) => void;
  addStateNotification: (notification: IRenderBody) => void;
}

const NotificationContext = React.createContext({} as IContextProps);

export default NotificationContext;
