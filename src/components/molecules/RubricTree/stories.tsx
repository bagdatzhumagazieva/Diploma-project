import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ExampleGroupRubricTree } from 'src/components/molecules/RubricTree/mocks';
import GroupRubricTree from 'src/components/molecules/RubricTree/GroupRubricTree';

storiesOf('Rubric Tree', module)
  .add('basic', () => (
    <Router>
      <div className="container p-40" style={{ backgroundColor: '#F4F5F9' }}>
        <GroupRubricTree rubrics={ExampleGroupRubricTree} />
      </div>
    </Router>
  ));
