import * as React from 'react';
import { storiesOf } from '@storybook/react';
import CardUserAchievement from 'src/components/atoms/Cards/CardUserAchievement/index';
import { ExampleCardUserAchievements } from 'src/components/atoms/Cards/CardUserAchievement/mocks';

storiesOf('Card User Achievement', module)
  .add('basic', () => (
    <div className="container">
      <div style={
        {
          width: '842px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }
      }>
        {ExampleCardUserAchievements.map(item => (
          <CardUserAchievement style={{ width: '28%', marginBottom: '40px' }} {...item} />
        ))}
      </div>
    </div>
  ));
