import { IBaseProps } from 'src/core/components/types';

export declare namespace CardBranchTypes {
  export interface IProps extends IBaseProps {
    name: string;
    usersCount: number;
    percent: number;
    branchId: number;
    isRootBranch?: boolean;
  }
}

export enum PercentageColor {
  Red = '240,72,72',
  Yellow = '241,211,52',
  Orange = '236,136,43',
  Green = '42,190,66',
}
