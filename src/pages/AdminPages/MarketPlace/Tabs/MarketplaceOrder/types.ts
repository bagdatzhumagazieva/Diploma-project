import { MarketplaceOrderTypes } from 'src/store/marketplace/types';
import { RouteComponentProps } from 'react-router';

export declare namespace MarketPlaceOrderTypes {
  export interface IProps extends RouteComponentProps {
    marketplaceOrders?: MarketplaceOrderTypes.IRenderProps;
    getMyOrders?(params: MarketplaceOrderTypes.IQueryParams, callbacks?: any): void;
    marketplaceOrdersLoading?: boolean;
    companyId: number;
  }
}
