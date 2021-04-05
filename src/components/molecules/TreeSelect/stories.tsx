import * as React from 'react';
import { storiesOf } from '@storybook/react';
import TreeSelect from 'src/components/molecules/TreeSelect/index';
import { ExampleTreeOptions } from 'src/components/molecules/TreeSelect/mocks';

storiesOf('Tree Select', module)
  .add('basic', () => (
    <div className="container">
      <div className="d-flex p-5 w-50">
        <TreeSelect
          treeOptions={ExampleTreeOptions}
          selectedTreeOption={ExampleTreeOptions[0]}
        />
      </div>
    </div>
  ))
  .add('with checkboxes', () => (
    <div className="container">
      <div className="d-flex p-5 w-50">
        <TreeSelect
          withCheckbox
          treeOptions={ExampleTreeOptions}
          selectedTreeOption={ExampleTreeOptions[0]}
        />
      </div>
    </div>
  ));
