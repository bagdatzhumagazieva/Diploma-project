import * as React from 'react';
import { storiesOf } from '@storybook/react';

import ProfilePage from 'src/pages/GamePages/Profile/index';
import { BrowserRouter as Router } from 'react-router-dom';

storiesOf('Profile', module)
  .add('basic', () => (
    <Router>
      <ProfilePage/>
    </Router>
  ));
