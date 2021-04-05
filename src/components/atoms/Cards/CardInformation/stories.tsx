import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CardInformation from 'src/components/atoms/Cards/CardInformation/index';
import { ExampleCardInformations } from 'src/components/atoms/Cards/CardInformation/mocks';

storiesOf('Card Information', module)
  .add('basic', () => (
    <Router>
      <div style={{ padding: '40px', backgroundColor: '#F4F5F9' }}>
        <div className="d-flex flex-wrap justify-content-between" style={{ width: '776px' }}>
          {ExampleCardInformations.map(item => (
            <div style={{ width: '376px', marginBottom: '24px' }} key={item.type}>
              <CardInformation key={item.type} {...item} />
            </div>
          ))}
        </div>
      </div>
    </Router>
  ));
