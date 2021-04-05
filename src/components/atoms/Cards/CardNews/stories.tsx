import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CardNews from 'src/components/atoms/Cards/CardNews/index';
import { ExampleCardNews } from 'src/components/atoms/Cards/CardNews/mocks';

storiesOf('Card News', module)
  .add('basic', () => (
    <Router>
      <div style={{ backgroundColor: '#F4F5F9', padding: '40px' }}>
        <div style={{ width: '376px', padding: '24px' }}>
          {ExampleCardNews.map(item => (
            <CardNews {...item} className="mb-24" />
          ))}
        </div>
      </div>
    </Router>
  ));
