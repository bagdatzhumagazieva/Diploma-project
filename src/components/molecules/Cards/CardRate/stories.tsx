import * as React from 'react';
import { storiesOf } from '@storybook/react';
import CardRate from 'src/components/molecules/Cards/CardRate/index';

storiesOf('Card Rate', module)
  .add('basic', () => (
    <div style={{ backgroundColor: '#F4F5F9', padding: '20px' }}>
      <div className="d-flex justify-content-between" style={{ width: '1176px' }}>
        <CardRate />
      </div>
    </div>
  ));
