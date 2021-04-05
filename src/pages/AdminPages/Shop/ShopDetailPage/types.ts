import { ItemBuyerTypes, ShopPrizesTypes } from 'src/store/item/types';

export declare namespace ShopDetailPageTypes {
  export interface IProps {
    itemByAdmin?: ShopPrizesTypes.IRenderItem;
    itemByAdminLoading?: boolean;
    deletePrizes?(companyId: number, id: number, callback?: any): void;
    getItemByAdmin?(companyId: number, itemId: number, callbacks?: any): void;
    getItemBuyers?(params: ItemBuyerTypes.IQueryProps, companyId: number, itemId: number, callbacks?: any): void;
    itemBuyers?: ItemBuyerTypes.IRenderProps;
  }
}
