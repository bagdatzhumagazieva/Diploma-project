import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Arrow from 'src/components/atoms/Svg/Icons/Arrow';

storiesOf('Svg', module)
  .add('basic', () => (
    <Router>
      <div style={{ width: 800, margin: '0 auto', padding: 100 }}>
        <Arrow direction="right" />
      </div>
    </Router>
  ));
