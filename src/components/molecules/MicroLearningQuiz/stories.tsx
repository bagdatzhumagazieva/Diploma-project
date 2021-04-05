import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import MicroLearningQuiz from 'src/components/molecules/MicroLearningQuiz/index';
import {
  ExampleGroupMicroLeaningQuiz,
  ExampleMicroLearningQuiz,
} from 'src/components/molecules/MicroLearningQuiz/mocks';
import GroupMicroLearningQuiz from 'src/components/molecules/MicroLearningQuiz/GroupQuiz';

storiesOf('Micro Learning Quiz', module)
  .add('basic', () => (
    <Router>
      <div style={{ padding: '20px' }}>
        <MicroLearningQuiz {...ExampleMicroLearningQuiz} className="mb-40"/>
        <GroupMicroLearningQuiz questions={ExampleGroupMicroLeaningQuiz} />
      </div>
    </Router>
  ));
