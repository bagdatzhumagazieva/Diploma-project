import { ILoadingProps } from 'src/core/components/types';

export namespace CompanyInfoTypes {
  export interface IProps extends ILoadingProps {
    logo?: string;
    name?: string;
    address?: string;
    subscription?: {
      name?: string;
      endDate?: string;
    };
    employees?: {
      count?: number;
      maxLimit?: number;
    };
    hasSettingsButton?: boolean;
  }
}
