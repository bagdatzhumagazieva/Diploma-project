import * as React from 'react';
import { storiesOf } from '@storybook/react';
import IconCertificate from 'src/components/atoms/IconCertificate/index';

storiesOf('Icon Certificate', module)
  .add('basic', () => (
    <div className="container">
      <div className="p-40 w-50">
        <IconCertificate/>
      </div>
    </div>
  ));
