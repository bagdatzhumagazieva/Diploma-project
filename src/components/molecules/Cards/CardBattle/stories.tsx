import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CardBattle from 'src/components/molecules/Cards/CardBattle/index';
import { ExampleCardBattle } from 'src/components/molecules/Cards/CardBattle/mocks';

storiesOf('Card Battle', module)
  .add('basic', () => (
    <Router>
      <div className="container p-40">
        <div style={{ width: '394px', padding: '24px' }}>
          {ExampleCardBattle.map(item => (
            <CardBattle className="mb-24" {...item} />
          ))}
        </div>
      </div>
    </Router>
  ));
