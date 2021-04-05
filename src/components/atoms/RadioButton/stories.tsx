import * as React from 'react';
import { storiesOf } from '@storybook/react';
import RadioButton from 'src/components/atoms/RadioButton/index';

storiesOf('Radio Button', module)
  .add('basic', () => (
    <div className="container">
      <div className="d-flex flex-column">
        <RadioButton
          name="story"
          value="story1"
          label="Номер телефона 1"
          isChecked={false}
        />
        <RadioButton
          name="story"
          value="story2"
          label="Номер телефона 1"
          isChecked={true}
        />
        <RadioButton
          name="story"
          value="story3"
          isChecked={false}
        />

      </div>
    </div>
  ));
