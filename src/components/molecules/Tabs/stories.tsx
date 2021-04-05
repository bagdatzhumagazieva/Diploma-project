import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Tabs from 'src/components/molecules/Tabs';
import { exampleTabs } from 'src/components/molecules/Tabs/mocks';

storiesOf('Tabs', module)
  .add('basic', () => (
    <div className="container">
      <Tabs
        tabOptions={exampleTabs}
        activeId={exampleTabs[0].id}
      >
        <div key={exampleTabs[0].id}>
          Tab Content 1
        </div>
        <div key={exampleTabs[1].id}>
          Tab Content 2
        </div>
        <div key={exampleTabs[2].id}>
          Tab Content 3
        </div>
        <div key={exampleTabs[3].id}>
          Tab Content 4
        </div>
      </Tabs>
    </div>
  ));
