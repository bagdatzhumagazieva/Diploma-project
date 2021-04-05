import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CardEducation from 'src/components/molecules/Cards/CardEducation/index';
import { ExampleCardEducation } from 'src/components/molecules/Cards/CardEducation/mock';

storiesOf('Card Popular Game', module)
  .add('basic', () => (
    <Router>
      <div className="d-flex justify-content-between py-40" style={{ backgroundColor: '#F4F5F9', width: '1176px' }}>
        {ExampleCardEducation.map(item => (
          <div style={{ width: '376px' }}>
            <CardEducation {...item} />
          </div>
        ))}
      </div>
    </Router>
  ));
