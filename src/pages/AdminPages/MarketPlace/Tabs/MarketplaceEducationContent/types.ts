import { MarketplaceCategoryTypes, MarketplaceItemTypes } from 'src/store/marketplace/types';
import { RouteComponentProps } from 'react-router';

export declare namespace MarketPlaceEducationContentTypes {
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
  export interface IMarket {
    id: number;
    image: string;
    title: string;
    description: string;
    rate: number;
    commentCount: number;
    cost: number;
  }
}
