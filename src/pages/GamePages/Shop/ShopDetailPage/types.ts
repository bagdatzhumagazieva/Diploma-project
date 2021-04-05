import { RouteComponentProps } from 'react-router';
import { ShopGamePrizeTypes, ShopOrderTypes, DetailShopTypes } from 'src/store/item/types';
import { RatingTypes } from 'src/store/rate/types';

export namespace ShopType {
  export interface IProps extends RouteComponentProps {
    item?: DetailShopTypes.IRenderProps;
    itemLoading?: boolean;
    getItem?(itemId: number, callbacks?: any): void;
    createShopOrder?(bodyParams: ShopOrderTypes.IBodyProps[], companyId: number, callback?: any): void;
    createRating?(data: RatingTypes.ICreateBody, callback?: any): void;
  }

  export interface IBasketItem {
    item: ShopGamePrizeTypes.IRenderItem;
    amount: number;
    isSelected?: boolean;
  }
}
