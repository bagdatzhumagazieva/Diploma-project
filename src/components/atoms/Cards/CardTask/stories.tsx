import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ExampleCardTasksCurrent } from 'src/components/atoms/Cards/CardTask/mocks';
import CardTaskGroup from 'src/components/atoms/Cards/CardTask/CardTaskGroup.index';

storiesOf('Card Task Group', module)
  .add('basic', () => (
    <div className="container">
      <div style={{ width: '728px', padding: '20px' }}>
        <CardTaskGroup isShowAll={true} tasks={ExampleCardTasksCurrent} />
      </div>
    </div>
  ));
