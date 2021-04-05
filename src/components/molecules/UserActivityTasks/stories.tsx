import * as React from 'react';
import { storiesOf } from '@storybook/react';

import UserActivityTasks from 'src/components/molecules/UserActivityTasks/index';

import { UserTaskStatuses } from 'src/components/atoms/Cards/CardTask/consts';

storiesOf('User Activity Tasks', module)
  .add('basic', () => (
    <div style={{ backgroundColor: '#F4F5F9', padding: '30px' }}>
      <div style={{ width: '775px' }}>
        <UserActivityTasks
          statusOptions={UserTaskStatuses}
        />
      </div>
    </div>
  ));
