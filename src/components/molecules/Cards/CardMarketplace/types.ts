import { MarketplaceItemTypes } from 'src/store/marketplace/types';

export namespace CardMarketPlaceTypes {
  export interface IProps extends MarketplaceItemTypes.IItemRender {
    className?: string;
    itemType?: string;
  }
}
