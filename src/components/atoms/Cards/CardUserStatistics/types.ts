import { IBaseProps } from 'src/core/components/types';

export namespace CardUserStatisticsTypes {
  export interface IProps extends IBaseProps {
    icon: string;
    value: number;
    title: string;
  }
}
