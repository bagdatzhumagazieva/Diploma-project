import { ReactNode } from 'react';
import { IBaseAttributeProps } from 'src/core/components/types';

export namespace PageButtonTypes {
  export interface IProps extends IBaseAttributeProps<HTMLDivElement>{
    direction?: 'up' | 'down' | 'left' | 'right';
    children?: ReactNode;
    disabled?: boolean;
    active?: boolean;
  }
}
