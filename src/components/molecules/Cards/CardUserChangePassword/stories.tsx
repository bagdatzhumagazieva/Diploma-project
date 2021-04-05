import * as React from 'react';
import { storiesOf } from '@storybook/react';
import CardUserChangePassword from 'src/components/molecules/Cards/CardUserChangePassword/index';

storiesOf('Card User Change Password', module)
  .add('basic', () => (
    <div className="container" style={{ backgroundColor: '#F4F5F9', padding: '20px' }}>
      <div style={{ width: '700px' }}>
        <CardUserChangePassword/>
      </div>
    </div>
  ));
