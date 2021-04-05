import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Loader from 'src/components/atoms/Loader/index';

storiesOf('Loader', module)
.add('basic', () => (
  <div className="container">
    <div className="d-flex flex-column">
      <Loader label="Загрузка..."/>
    </div>
  </div>
));
