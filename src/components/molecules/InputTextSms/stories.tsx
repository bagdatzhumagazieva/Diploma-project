import * as React from 'react';
import { storiesOf } from '@storybook/react';
import InputTextSms from 'src/components/molecules/InputTextSms/index';

storiesOf('Input Text Sms', module)
  .add('basic', () => (
    <div className="container">
      <div className="d-flex flex-column" style={{ width: '167px' }}>
        <InputTextSms placeholder="" wrapperClassName="mt-20"/>
        <InputTextSms
          wrapperClassName="mt-20"
          errorMessage="Код неверный"
        />
      </div>
    </div>
  ));
