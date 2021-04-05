import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';

import Sidebar from 'src/components/molecules/Sidebar/index';
import { SidebarData, fillElementsNames } from 'src/components/molecules/Sidebar/consts';

storiesOf('Sidebar', module)
  .add('basic', () => (
    <Router>
      <div className="container">
        <div style={{ width:'220px' }}>
          <Sidebar
            navItems={SidebarData}
            cntTopNavItems={SidebarData.length - 2}
            fillElementsNames={fillElementsNames}
          />
        </div>
      </div>
    </Router>
  ));
