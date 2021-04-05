import { ShopGamePrizeTypes } from 'src/store/item/types';
import { RouteComponentProps } from 'react-router';
import { EmploymentTypes } from 'src/store/employment/types';

export namespace ShopContentTypes {
  export interface IProps extends RouteComponentProps {
    companyId: number;
    prizes?: ShopGamePrizeTypes.IRenderProps;
    prizeLoading?: boolean;
    employment?: EmploymentTypes.IRenderProps;

    getPrizes?(params: ShopGamePrizeTypes.IQueryProps): void;
    getEmploymentByCompanyId?(companyId: number): void;
  }
  export interface IType {
    id: number;
    title: string;
    count: number;
    value?: string;
  }
}
