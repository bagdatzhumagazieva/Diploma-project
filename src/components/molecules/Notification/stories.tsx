import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Notification from 'src/components/molecules/Notification/index';
import { NotificationType } from 'src/components/molecules/Notification/types';

storiesOf('Notification', module)
  .add('big', () => (
    <div className="container">
      <div className="d-flex flex-column">
        <Notification
          withIcon
          size="big"
          type={NotificationType.Success}
          title="Success alert!"
          description="Пользователи успешно активированы, очень длинное сообщение"
        />
        <Notification
          size="big"
          type={NotificationType.Info}
          title="Danger alert!"
          description="Пользователи успешно активированы, очень длинное сообщение"
        />
        <Notification
          withIcon
          duration={15000}
          size="big"
          type={NotificationType.Danger}
          title="Warning alert!"
          description="Пользователи успешно активированы"
        />
      </div>
    </div>
  ))
  .add('small', () => (
    <div className="container">
      <div className="d-flex flex-column">
        <Notification
          size="small"
          type={NotificationType.Success}
          title="Success alert!"
          description="Пользователи успешно активированы, очень длинное сообщение"
        />
        <Notification
          size="small"
          type={NotificationType.Info}
          title="Danger alert!"
          description="Пользователи успешно активированы, очень длинное сообщение"
        />
        <Notification
          withIcon
          duration={10000}
          size="small"
          type={NotificationType.Danger}
          title="Warning alert!"
          description="Пользователи успешно активированы"
        />
      </div>
    </div>
  ))
  .add('basic', () => (
    <div className="container">
      <div className="d-flex flex-column">
        <Notification
          size="basic"
          type={NotificationType.Success}
          title="Success alert!"
          description="Пользователи успешно активированы, очень длинное сообщение"
        />
        <Notification
          size="basic"
          type={NotificationType.Info}
          title="Danger alert!"
          description="Пользователи успешно активированы, очень длинное сообщение"
        />
        <Notification
          withIcon
          duration={10000}
          size="basic"
          type={NotificationType.Danger}
          title="Warning alert!"
          description="Пользователи успешно активированы"
        />
      </div>
    </div>
  ));
