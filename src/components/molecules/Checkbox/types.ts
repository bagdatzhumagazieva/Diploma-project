import React from 'react';
import { IBaseProps } from 'src/core/components/types';
import { TypographyVariants } from 'src/components/atoms/Typography/types';

export declare namespace CheckboxTypes {
  export interface IProps extends IBaseProps {
    title?: string;
    titleVariant?: TypographyVariants | string;
    prompt?: string;
    disabled?: boolean;
    color?: string;
    isClicked?: boolean;
    indeterminate?: boolean;
    setClicked?(state: boolean, id?: string, title?: string): void;
    labelRef?: React.Ref<HTMLLabelElement>;
  }
  export interface IState {
    checked: boolean;
  }
}

export enum CheckboxStateTypes {
  Unchecked = 'Unchecked',
  Indeterminate = 'Indeterminate',
  Checked = 'Checked',
}
