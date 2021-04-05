import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import CodeSelect from 'src/components/molecules/CodeSelect/index';
import { countriesCode } from 'src/components/molecules/CodeSelect/mock';

storiesOf('Code Select', module)
  .addDecorator(withKnobs)
  .add('basic', () => (
    <div className="container" style={{ height: '700px' }}>
      <div className="d-flex flex-column" style={{ width: '398px', padding: '20px', backgroundColor: 'black' }}>
        <CodeSelect
          classNames="mb-3"
          countries={countriesCode}
        />
        <CodeSelect
          classNames="mb-3"
          countries={countriesCode}
          errorMessage={text('ErrorMessage', 'Учётная запись с указанным телефоном не найдена. Попробуйте ещё раз')}
        />
      </div>
    </div>
  ));
