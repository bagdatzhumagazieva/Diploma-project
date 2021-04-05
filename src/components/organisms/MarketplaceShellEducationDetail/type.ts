import { MarketplaceItemDetailTypes } from 'src/store/marketplace/types';

export namespace MarketplaceShellEducationDetailTypes {
  export interface IProps {
    type: 'shell' | 'education';
    getItemDetail?(companyId: number, itemId: number, callbacks?: any): void;
    marketplaceItemDetail?: MarketplaceItemDetailTypes.IRenderProps;
    marketplaceItemDetailLoading?: boolean;
  }
}
