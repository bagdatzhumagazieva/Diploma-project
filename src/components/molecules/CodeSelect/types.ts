import React from 'react';
import { IBaseProps } from 'src/core/components/types';

export namespace CodeSelectTypes {
  export interface IProps extends IBaseProps{
    countries: ICountryData[];
    label?: string;
    errorMessage?: string | undefined | false;
    disabled?: boolean;
    onChange?(event: React.ChangeEvent<HTMLInputElement>): void;
    handleEnter?(): void;
  }
}

export interface ICountryData {
  id: number;
  title: string;
  mask: string;
  placeholder: string;
  imgSrc: string;
  staticNumber: string;
}
