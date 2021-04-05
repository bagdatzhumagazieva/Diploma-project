import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from 'src/components/organisms/Layout/index';

storiesOf('Layout', module)
  .add('basic', () => (
    <div className="">
      <Router>
        <Layout />
      </Router>
    </div>
  ));
