import * as React from 'react';
import { storiesOf } from '@storybook/react';
import ImageCertificate from 'src/components/atoms/ImageCertificate/index';
import { ExampleImageCertificate } from 'src/components/atoms/ImageCertificate/mocks';

storiesOf('Certificate Image', module)
  .add('basic', () => (
    <div className="container p-20" style={{ backgroundColor: 'white' }}>
      <div style={{ width: '330px', height: '286px' }}>
        <ImageCertificate {...ExampleImageCertificate} />
      </div>
    </div>
  ));
