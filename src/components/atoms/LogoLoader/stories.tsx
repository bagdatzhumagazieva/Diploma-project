import * as React from 'react';
import { storiesOf } from '@storybook/react';
import LogoLoader from 'src/components/atoms/LogoLoader/index';
import 'src/components/atoms/LogoLoader/index.scss';

storiesOf('Logo Loader', module)
.add('basic', () => (
  <div className="container">
    <div className="d-flex flex-column">
      <LogoLoader label="Загрузка..."/>
    </div>
  </div>
));
