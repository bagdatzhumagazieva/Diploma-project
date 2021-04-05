import { IBaseProps } from 'src/core/components/types';

export namespace CardProfileTypes {
  export interface IProps extends IBaseProps {
    status: string;
    userImage: string;
    userName: string;
    groups: string[];
    branch: string;
    curPoints: number;
    points: number;
    linkShop?: string;
    companyName: string;
    showVerticalLine?: boolean;
  }
}
