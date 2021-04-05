import * as React from 'react';
import { storiesOf } from '@storybook/react';
import CardUserStatistics from 'src/components/atoms/Cards/CardUserStatistics/index';

storiesOf('Card User Statistics', module)
  .add('basic', () => (
    <div className="container">
      <div
        style={{
          width: '209px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {[].map(card => (
          <CardUserStatistics {...card} />
        ))}
      </div>
    </div>
  ));
