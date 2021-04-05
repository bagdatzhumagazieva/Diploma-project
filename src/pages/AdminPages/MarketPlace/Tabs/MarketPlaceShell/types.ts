import { MarketplaceItemTypes, MarketplaceCategoryTypes } from 'src/store/marketplace/types';
import { RouteComponentProps } from 'react-router';

export namespace MarketPlaceShellTypes {
  export interface IProps extends RouteComponentProps {
    getMarketplaceItems?(params: MarketplaceItemTypes.IQueryParams, callbacks?: any): void;
    marketplaceItems?: MarketplaceItemTypes.IRenderProps;
    marketplaceItemsLoading?: boolean;
    marketplaceItemsError?: string;
    marketplaceItemsTotal?: number;
    companyId: number;
    filterCategories?: MarketplaceCategoryTypes.ICategoryRender[];
    getFilterCategories?(params: MarketplaceCategoryTypes.IQueryParams, callbacks?: any): void;
  }

  export interface ICategory {
    id: number;
    name: string;
    count: number;
  }

  export interface IMarket {
    id: number;
    image: string;
    title: string;
    description: string;
    rate: number;
    commentCount: number;
    cost: number;
    status?: 'buy' | 'bought';
  }
}
