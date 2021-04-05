import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CardCompanyChoice from 'src/components/molecules/Cards/CardCompanyChoice/index';
import { ExampleCardCompanyChoice } from 'src/components/molecules/Cards/CardCompanyChoice/mocks';

storiesOf('Card Company Choice', module)
  .add('basic', () => (
    <Router>
      <div className="" style={{ backgroundColor: 'white' }}>
        <div style={{ width: '548px' }}>
          <CardCompanyChoice loading={false} {...ExampleCardCompanyChoice} />
        </div>
      </div>
    </Router>
  ));
