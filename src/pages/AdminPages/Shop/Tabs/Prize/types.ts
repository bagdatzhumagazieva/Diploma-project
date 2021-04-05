import { RouteComponentProps } from 'react-router';
import { GroupTypes } from 'src/store/group/types';
import { ShopPrizesTypes } from 'src/store/item/types';

export declare namespace PrizeTypes {
  export interface IProps extends RouteComponentProps {
    companyId: number;
    groups?: GroupTypes.IRenderProps[];
    prizes?: ShopPrizesTypes.IRenderProps;
    prizesLoading?: boolean;

    getAdminPrizes?(params: ShopPrizesTypes.IQueryProps, companyId: number, callback?: any): void;
    deletePrizes?(companyId: number, id: number, callback?: any): void;
    getGroups?(params: GroupTypes.IQueryParams): void;
  }
}
