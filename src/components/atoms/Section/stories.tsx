import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Section from 'src/components/atoms/Section/index';

storiesOf('Section', module)
  .add('basic', () => (
    <Router>
      <div style={{ backgroundColor: '#F4F5F9', padding: '40px' }}>
        <div style={{ width: '776px' }}>
          <Section title="Обучение" link="link"/>
        </div>
      </div>
    </Router>
  ));
