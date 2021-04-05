import { IBaseProps } from 'src/core/components/types';

export namespace CardUserAchievementTypes {
  export interface IProps extends IBaseProps {
    icon: string;
    title: string;
    subtitle: string;
    coins: number;
    lastItemRef?: any;
  }
}
