import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Checkbox from 'src/components/molecules/Checkbox/index';

storiesOf('Checkbox', module)
  .add('basic', () => (
    <div className="container">
      <div className="d-flex flex-column p-5 w-50">
        <Checkbox
          classNames="mb-3"
          title="Запомнить меня"
        />
        <Checkbox
          classNames="mb-3"
          title="Не запоминай меня"
        />
      </div>
    </div>
  ));
