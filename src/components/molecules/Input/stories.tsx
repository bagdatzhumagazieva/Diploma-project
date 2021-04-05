import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Input from 'src/components/molecules/Input/index';

storiesOf('Input', module)
  .add('basic', () => (
    <div className="container">
      <div className="d-flex flex-column p-5 w-50">
        <Input
          label="Логин"
          type="text"
          placeholder="Введите логин"
          errorMessage="Неверный логин"
          color="black"
          required
          classNames="mb-32"
        />
        <Input
          label="password"
          type="password"
          placeholder="Введите пароль"
          errorMessage="Неверный пароль"
          color="black"
        />
      </div>
    </div>
  ));
