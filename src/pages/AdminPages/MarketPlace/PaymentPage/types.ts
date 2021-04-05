import { MarketplaceOrderTypes, MarketplaceItemDetailTypes } from 'src/store/marketplace/types';

export namespace PaymentTypes {
  export interface IProps {
    createOrder?(bodyParams: MarketplaceOrderTypes.IBodyParams, companyId: number, callback?: any): void;
    createdOrder?: MarketplaceOrderTypes.IOrderRender;
    getItemDetail?(companyId: number, itemId: number, callbacks?: any): void;
    marketplaceItemDetail?: MarketplaceItemDetailTypes.IRenderProps;
    marketplaceItemDetailLoading?: boolean;
  }
}
