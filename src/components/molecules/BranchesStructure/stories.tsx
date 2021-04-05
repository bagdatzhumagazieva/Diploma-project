import * as React from 'react';
import { storiesOf } from '@storybook/react';
import BranchesStructure from 'src/components/molecules/BranchesStructure/index';
import { ExampleBranchesStructure } from 'src/components/molecules/BranchesStructure/mock';

storiesOf('Branches Structure', module)
.add('basic', () => (
  <div className="">
    <div style={{ width: '2224', height: '1200', background: '#F4F5F9' }}>
      <BranchesStructure
        branch={ExampleBranchesStructure}
        onAddBranch={() => 0}
      />
    </div>
  </div>
));
