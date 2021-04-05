import React from 'react';
import { IBaseProps } from 'src/core/components/types';

export namespace RadioButtonTypes {
  export interface IProps extends IBaseProps{
    /**
     * Name of radio button, please
     * don't forget to give equal name to the group of radio buttons
     */
    name: string;
    /**
     * Value of radio button,
     * each radio button have unique value
     */
    value: string;
    /**
     * Label of radio button,
     * Shows after radio button
     */
    label?: string;
    /**
     * Controls which radio button is active,
     */
    isChecked: boolean;
    labelVariant?: string;
    /**
     * Callback to the parent component to set the clicked radio button value
     */
    setClicked?(event: React.ChangeEvent<HTMLInputElement>): void;
  }
}
