import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Chips from 'src/components/molecules/Chips/index';

storiesOf('Chips', module)
  .add('basic', () => (
    <Router>
      <div className="p-40">
        <div style={{ width: '864px' }}>
          <Chips type="phone" mask="+99999999999" />
          <Chips type="mail" />
        </div>
      </div>
    </Router>
  ));
