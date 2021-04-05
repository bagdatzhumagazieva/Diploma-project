import React from 'react';
import classNames from 'classnames';
import { mapPropsToAttributes } from 'src/core/components';
import Typography from 'src/components/atoms/Typography';
import { StepperTypes } from 'src/components/atoms/Stepper/types';
import 'src/components/atoms/Stepper/index.scss';

function Stepper(props: StepperTypes.IProps) {
  const { steps, currentStep, isStepsNumbered, onStepClick: propsOnStepClick, isStepsClickable } = props;
  const attributes = mapPropsToAttributes<StepperTypes.IProps>(props, 'stepper');
  const onStepClick = (step: number) => () => propsOnStepClick && propsOnStepClick(step);

  return (
    <div {...attributes}>
      {steps.map((n, i) => (
        <div
          key={i}
          className={classNames(
            'stepper__step d-flex align-items-center',
            { 'cursor-pointer': isStepsClickable },
            { 'stepper__step--passed cursor-pointer': i < currentStep },
            { 'stepper__step--active cursor-pointer': i === currentStep },
          )}
        >
          <div className="stepper__dot" />
          <Typography
            variant="textmed"
            className="stepper__title"
            onClick={(isStepsClickable || i < currentStep) ? onStepClick(i) : undefined}
          >
            {`${isStepsNumbered ? `${i + 1}. ` : ''}${n}`}
          </Typography>
        </div>
      ))}
    </div>
  );
}

export default Stepper;
