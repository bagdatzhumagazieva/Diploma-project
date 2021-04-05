import { IPaginationTypes } from 'src/core/store/types';

export declare namespace MarketplaceOrderTypes {
  export interface IQueryParams extends IPaginationTypes {
    companyId: number;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    orderField?: string;
    keyword?: string;
  }

  export interface IBodyParams {
    amount: number;
    itemId: number;
  }

  export interface IResponseProps {
    total: number;
    item_orders: IOrderResponse[];
  }

  export interface IOrderResponse {
    created_at: string;
    updated_at: string;
    id: number;
    uuid: string;
    user_id: number;
    company_id: number;
    employment_id: number;
    amount: number;
    item: IOrderItemResponse;
    status: string;
    is_active: boolean;
  }

  export interface IOrderRender {
    createdAt: string;
    updatedAt: string;
    id: number;
    uuid: string;
    userId: number;
    companyId: number;
    employmentId: number;
    amount: number;
    item: IOrderItemRender;
    status: string;
    isActive: boolean;
  }

  export interface IRenderProps {
    total: number;
    itemOrders: IOrderRender[];
  }

  export interface IOrderItemResponse {
    created_at: string;
    updated_at: string;
    id: number;
    uuid: string;
    name: string;
    description: string;
    entity_id: number;
    entity_uuid: string;
    type: string;
    price: number;
    amount: number;
    creator_name: string;
    creator_email: string;
    creator_address: string;
    category: ICategoryResponse;
    images: IImageResponse[];
    is_active: boolean;
  }

  export interface ICategoryResponse {
    name: string;
    created_at: string;
    updated_at: string;
    id: number;
    uuid: string;
    is_active: boolean;
    company_id: number;
  }

  export interface ICategoryRender {
    name: string;
    createdAt: string;
    updatedAt: string;
    id: number;
    uuid: string;
    isActive: boolean;
    companyId: number;
  }

  export interface IImageResponse {
    image_url: string;
    image_thumbnail_url: string;
    order: number;
  }

  export interface IImageRender {
    imageUrl: string;
    imageThumbnailUrl: string;
    order: number;
  }

  export interface IOrderItemRender {
    createdAt: string;
    updatedAt: string;
    id: number;
    uuid: string;
    name: string;
    description: string;
    entityId: number;
    entityUuid: string;
    type: string;
    price: number;
    amount: number;
    creatorName: string;
    creatorEmail: string;
    creatorAddress: string;
    category: ICategoryRender;
    images: IImageRender[];
    isActive: boolean;
  }
}

export declare namespace MarketplaceItemTypes {
  export interface IQueryParams extends IPaginationTypes {
    companyId: number;
    entityType: string;
    categoryId?: number;
    sortBy?: string;
    desc?: boolean;
  }

  export interface IResponseProps {
    total: number;
    items: IItemResponse[];
  }

  export interface IRenderProps {
    total: number;
    items: IItemRender[];
  }

  export interface IItemResponse {
    entity_id: number;
    entity_uuid: string;
    name: string;
    description: string;
    price: number;
    category_id: number;
    category_name: string;
    amount: number;
    images: IImageResponse[];
    item_entity_id: number;
    item_entity_uuid: string;
    item_entity_type: string;
    rating: number;
    comments_amount: number;
    created_at: string;
    updated_at: string;
    is_bought: boolean;
  }

  export interface IItemRender {
    entityId: number;
    entityUuid: string;
    name: string;
    description: string;
    price: number;
    categoryId: number;
    categoryName: string;
    amount: number;
    images: IImageRender[];
    itemEntityId: number;
    itemEntityUuid: string;
    itemEntityType: string;
    rating: number;
    commentsAmount: number;
    createdAt: string;
    updatedAt: string;
    isBought: boolean;
  }

  export interface IImageResponse {
    entity_id: number;
    entity_uuid: string;
    image_url: string;
    image_thumbnail_url: string;
    order: number;
  }

  export interface IImageRender {
    entityId: number;
    entityUuid: string;
    imageUrl: string;
    imageThumbnailUrl: string;
    order: number;
  }
}

export declare namespace MarketplaceItemDetailTypes {
  export interface IQueryParams {
    companyId: number;
    itemId: number;
  }

  export interface IResponseProps {
    entity_id: number;
    entity_uuid: string;
    name: string;
    description: string;
    price: number;
    category_id: number;
    category_name: string;
    amount: number;
    images: MarketplaceItemTypes.IImageResponse[];
    item_entity_id: number;
    item_entity_uuid: string;
    item_entity_type: string;
    rating: number;
    comments_amount: number;
    created_at: string;
    updated_at: string;
    is_bought: boolean;
    creator_name: string;
    creator_email: string;
    creator_phone: string;
    creator_address: string;
    similar_items: MarketplaceItemTypes.IItemResponse[];
  }

  export interface IRenderProps {
    entityId: number;
    entityUuid: string;
    name: string;
    description: string;
    price: number;
    categoryId: number;
    categoryName: string;
    amount: number;
    images: MarketplaceItemTypes.IImageRender[];
    itemEntityId: number;
    itemEntityUuid: string;
    itemEntityType: string;
    rating: number;
    commentsAmount: number;
    createdAt: string;
    updatedAt: string;
    isBought: boolean;
    creatorName: string;
    creatorEmail: string;
    creatorPhone: string;
    creatorAddress: string;
    similarItems: MarketplaceItemTypes.IItemRender[];
  }
}

export declare namespace MarketplaceCategoryTypes {
  export interface IQueryParams {
    companyId: number;
    type: string;
  }

  export interface ICategoryResponse {
    category_id: number;
    category_name: string;
    amount: number;
  }

  export interface ICategoryRender {
    categoryId: number;
    categoryName: string;
    amount: number;
  }
}

export const GET_MARKETPLACE_ORDERS = {
  started: 'GET_MARKETPLACE_ORDERS_START',
  success: 'GET_MARKETPLACE_ORDERS_SUCCESS',
  failed: 'GET_MARKETPLACE_ORDERS_FAILED',
};

export const GET_MARKETPLACE_ITEMS = {
  started: 'GET_MARKETPLACE_ITEMS_START',
  success: 'GET_MARKETPLACE_ITEMS_SUCCESS',
  failed: 'GET_MARKETPLACE_ITEMS_FAILED',
};

export const GET_MARKETPLACE_ITEM_DETAIL = {
  started: 'GET_MARKETPLACE_ITEM_DETAIL_START',
  success: 'GET_MARKETPLACE_ITEM_DETAIL_SUCCESS',
  failed: 'GET_MARKETPLACE_ITEM_DETAIL_FAILED',
};

export const CREATE_ORDER = {
  started: 'CREATE_ORDER_START',
  success: 'CREATE_ORDER_SUCCESS',
  failed: 'CREATE_ORDER_FAILED',
};

export const GET_FILTER_CATEGORIES = {
  started: 'GET_FILTER_CATEGORIES_START',
  success: 'GET_FILTER_CATEGORIES_SUCCESS',
  failed: 'GET_FILTER_CATEGORIES_FAILED',
};
