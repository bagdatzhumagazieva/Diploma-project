import { IBaseProps } from 'src/core/components/types';

export namespace StepperTypes {
  export interface IProps extends IBaseProps {
    steps: string[];
    currentStep: number;
    /**
     * Adds it's position before the text (title => 1. title)
     */
    isStepsNumbered?: boolean;
    isStepsClickable?: boolean;
    onStepClick?(step: number): void;
  }
}
