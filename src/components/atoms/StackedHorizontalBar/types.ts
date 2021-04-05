import { IBaseProps } from 'src/core/components/types';

export declare namespace StackedHorizontalBarTypes {
  export interface IProps extends IBaseProps{
    dataSet: {
      name: string;
      count: number;
      color: string;
    }[];
  }
}
