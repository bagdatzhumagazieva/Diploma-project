import { ShopAdminOrderTypes, ShopOrderTypes } from 'src/store/item/types';
import { RouteComponentProps } from 'react-router';

export declare namespace ShopMyOrdersTypes {
  export interface IProps extends RouteComponentProps {
    companyId: number;
    orders?: ShopOrderTypes.IMyOrderRenderProps;
    ordersLoading?: boolean;
    ordersStatus?: ShopAdminOrderTypes.IRenderOrderStatus;

    getMyOrdersStatus?(companyId: number): void;
    getMyOrders?(bodyParams: ShopOrderTypes.IQueryParams): void;
  }
}
