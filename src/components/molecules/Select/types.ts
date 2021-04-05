import React from 'react';
import { IBaseProps } from 'src/core/components/types';

export namespace SelectTypes {
  export interface IProps extends IBaseProps {
    /**
     * The name of a specific select component, you can use when you have
     * a group of selects, to handle value of specific select component by one function
     */
    name?: string;
    id?: string;
    staticWidth?: boolean;
    options: IOption[];
    selectedOption?: IOption | null;
    errorMessage?: string;
    icon?: JSX.Element;
    placeholder?: string;
    customTitle?: string;
    withCheckbox?: boolean;
    customOption?: IOption;
    label?: string;
    prompt?: string;
    curVariant?: string;
    disabled?: boolean;
    isPositionFixed?: boolean;
    width?: number;
    withChips?: boolean;
    optionsMaxHeight?: number;
    direction?: 'down' | 'top';
    isStaticDirection?: boolean;
    setSelectedOption?(option: IOption, name?: string): void;
    onCheckboxChanges?(options: IOption[]): void;
    onCustomOptionClick?(options: IOption): void;
  }
}

export interface IOption {
  id?: string;
  value: string;
  name: string;
  disabled?: boolean;
  icon?: JSX.Element;
  checkboxChecked?: boolean;
  level?: number;
  itemRef?: React.Ref<any>;
}

export namespace SelectArrowTypes {
  export interface IProps extends IBaseProps{
    direction: 'up' | 'down';
  }
}
