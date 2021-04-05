import * as React from 'react';
import { storiesOf } from '@storybook/react';
import Stepper from 'src/components/atoms/Stepper/index';

storiesOf('Stepper', module)
  .add('basic', () => (
    <Stepper
      currentStep={1}
      steps={['Общая информация', 'Контент', 'Проверочный вопрос', 'Прочее']}
    />
  ))
  .add('with numbered steps', () => (
    <Stepper
      isStepsNumbered
      currentStep={2}
      steps={['Общая информация', 'Контент', 'Проверочный вопрос', 'Прочее']}
    />
  ));
