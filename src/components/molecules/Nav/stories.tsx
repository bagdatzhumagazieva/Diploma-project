import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from 'src/components/atoms/Svg/Sidebar/dashboard';
import NavItem from 'src/components/molecules/Nav/navItem.index';
import Nav from 'src/components/molecules/Nav/index';

storiesOf('Nav Item', module)
  .add('basic', () => (
    <Router>
      <div className="container">
        <div style={{ width: '220px' }}>
          <Nav>
            <NavItem
              name="dashboard"
              path="dashboard"
              title="Главная"
              isActive={false}
              notifications={2}
              collapsed={true}
              icon={<Dashboard />}
            />
          </Nav>
        </div>
      </div>
    </Router>
  ));
