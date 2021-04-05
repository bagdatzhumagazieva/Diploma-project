import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import DropZone from 'src/components/molecules/DropZone/index';
import { excelFileExtensions } from 'src/components/molecules/DropZone/types';

storiesOf('Drop Zone', module)
  .add('basic', () => (
    <Router>
      <div style={{ padding: '24px', width: '976px', height: '600px' }}>
        <DropZone correctFileExtensions={excelFileExtensions} />
      </div>
    </Router>
  ));
