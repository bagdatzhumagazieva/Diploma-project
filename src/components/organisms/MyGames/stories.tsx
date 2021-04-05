import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MyGamesPage from 'src/components/organisms/MyGames/index';

storiesOf('My Games Page', module)
  .add('basic', () => (
    <Router>
      <div style={{ backgroundColor: '#F4F5F9', padding: '20px' }}>
        <MyGamesPage companyId={1}/>
      </div>
    </Router>
  ));
