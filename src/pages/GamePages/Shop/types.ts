import { RouteComponentProps } from 'react-router';
import { ShopOrderTypes } from 'src/store/item/types';

export declare namespace ShopGameTypes {
  export interface IProps  extends RouteComponentProps  {
    orders?: ShopOrderTypes.IMyOrderRenderProps;
    getMyOrders?(bodyParams: ShopOrderTypes.IQueryParams): void;
  }
}
