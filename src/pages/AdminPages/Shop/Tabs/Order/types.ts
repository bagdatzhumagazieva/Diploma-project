import { RouteComponentProps } from 'react-router';
import { ShopAdminOrderTypes } from 'src/store/item/types';
import { IOption } from 'src/components/molecules/Select/types';

export namespace OrderTypes {
  export interface IProps  extends RouteComponentProps {
    companyId: number;
    orders?: ShopAdminOrderTypes.IResponseProps;
    ordersLoading?: boolean;
    getAdminOrders?(params: ShopAdminOrderTypes.IQueryParams, callbacks?: any): void;
    updateOrder?(orderId: number, callbacks?: any): void;
  }

  export interface IFilter {
    status?: IOption;
    dateCreation?: any;
    dateShipping?: any;
  }
}
