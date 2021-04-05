import { ButtonImageUploadTypes } from 'src/components/organisms/ButtonImageUpload/types';
import { IPaginationTypes } from 'src/core/store/types';
import { ItemCategoryTypes } from 'src/store/item/category/types';

export declare namespace ItemTypes {
  export interface IBodyProps {
    name: string;
    description: string;
    price: number | null;
    amount: number | null;
    branchIds: number[] | null;
    groupIds: number[] | null;
    categoryId: number | null;
    images: ButtonImageUploadTypes.IImage[];
  }

  export interface IResponseProps {
    created_at: string;
    updated_at: string;
    id: number;
    uuid: string;
    name: string;
    description: string;
    price: number;
    amount: number;
    branch_ids: number[];
    group_ids: number[];
    category: ItemCategoryTypes.IResponseProps;
    images: ImageResponseProps[];
    bought_amount: number | null;
    is_active: boolean;
  }

  export interface IRenderProps {
    createdAt: string;
    updatedAt: string;
    id: number;
    uuid: string;
    name: string;
    description: string;
    price: number;
    amount: number;
    branchIds: number[];
    groupIds: number[];
    boughtAmount: number | null;
    category: ItemCategoryTypes.IRenderProps;
    images: ImageRenderProps[];
    isActive: boolean;
  }

  export interface ImageResponseProps {
    image_url: string;
    image_thumbnail_url: string;
    order: number;
  }

  export interface ImageRenderProps {
    imageUrl: string;
    imageThumbnailUrl: string;
    order: number;
  }
}

export declare namespace ShopPrizesTypes {
  export interface IQueryProps extends IPaginationTypes {
    groupIds?: number[];
    keyword?: string;
    sortBy?: string;
    desc?: boolean;
  }

  export interface IResponseProps {
    total: number;
    items: IResponseItem[];
  }

  export interface IResponseItem {
    amount: number | null;
    category_id: number | null;
    category_name: string | null;
    description: string;
    entity_id: number;
    entity_uuid: string;
    group_ids: number[];
    image_thumbnail_url: string | null;
    image_url: string | null;

    groups: {
      entity_id: number;
      entity_uuid: string;
      group_type: string | null;
      name: string;
    }[];
    name: string | null;
    number_of_sold: number | null;
    price: number | null;
    rating?: number | null;
    images: {
      entity_id: number;
      entity_uuid: string;
      image_url: string;
      image_thumbnail_url: string;
      order: number
    }[];
  }

  export interface IRenderProps {
    total: number;
    prizes: IRenderItem[];
  }

  export interface IRenderItem {
    amount: number | null;
    categoryId: number | null;
    categoryName: string | null;
    description: string;
    id: number;
    uuid: string;
    groupIds: number[];
    imageThumbnailUrl: string | null;
    imageUrl: string | null;
    groups: {
      id: number;
      uuid: string;
      groupType: string | null;
      name: string;
    }[];
    name: string | null;
    numberOfSold: number | null;
    price: number | null;
    rating?: number | null;
    images: {
      id: number;
      uuid: string;
      imageUrl: string;
      imageThumbnailUrl: string;
      order: number;
    }[];
  }
}

export declare namespace ShopGamePrizeTypes {
  export interface IQueryProps extends IPaginationTypes{
    companyId: number;
    sortBy?: string;
    desc?: boolean;
    categoryIds?: number[];
    filterGroups?: boolean;
  }

  export interface IResponseProps {
    total: number;
    items: IResponseItem[];
    categories: {
      category_name: string;
      total: number;
      category_id: number;
    }[];
    me: {
      reward_amount: number | null;
      reward_available: number | null;
    };
  }

  export interface IResponseItem {
    entity_id: number;
    entity_uuid: string;
    company_id: number;
    name: string;
    price: number;
    rating: number;
    category_name: string | null;
    description: string | null;
    amount: number;
    images: {
      entity_id: number;
      entity_uuid: string;
      image_url: string;
      image_thumbnail_url: string;
      order: number
    }[];
  }

  export interface IRenderProps {
    total: number;
    prizes: IRenderItem[];
    categories: {
      categoryName: string;
      total: number;
      categoryId: number;
    }[];
    userInfo: {
      rewardAmount: number | null;
      rewardAvailable: number | null;
    };
  }

  export interface IRenderItem {
    id: number;
    uuid: string;
    name: string;
    price: number;
    rating: number;
    categoryName: string | null;
    description: string | null;
    amount: number;
    images: {
      id: number;
      uuid: string;
      imageUrl: string;
      imageThumbnailUrl: string;
      order: number
    }[];
  }
}

export declare namespace ShopOrderTypes {
  export interface IBodyProps {
    amount: number;
    itemId: number;
  }

  export interface IQueryParams extends IPaginationTypes {
    companyId: number;
    status?: string;
    orderField?: string;
  }

  export interface IResponseProps {
    amount: number;
    id: number;
    price: number;
    status: string;
    item: {
      description: string;
      name: string;
      images: {
        image_thumbnail_url: string;
        image_url: string;
      }[];
    };
  }

  export interface IRenderProps {
    amount: number;
    id: number;
    price: number;
    status: string;
    description: string;
    name: string;
    imageThumbnailUrl: string;
    imageUrl: string;
  }

  export interface IMyOrderResponseProps {
    total: number;
    item_orders: IItemOrderResponse[];
    total_price: number | null;
  }
  export interface IItemOrderResponse {
    amount: number;
    created_at: string;
    status: string;
    item: {
      id: number;
      amount: number;
      bought_amount: number;
      category: {
        name: string;
      };
      description: string;
      images: {
        image_thumbnail_url: string;
        image_url: string;
      }[];
      name: string;
      price: number;
      uuid: string;
    };
  }

  export interface IMyOrderRenderProps {
    total: number;
    myOrders: IItemOrderRender[];
    totalPrice: number | null;
  }

  export interface IItemOrderRender {
    amount: number;
    createdAt: string;
    id: number;
    status: string;
    uuid: string;
    itemAmount: number;
    boughtAmount: number;
    categoryName: string;
    description: string;
    images: {
      imageThumbnailUrl: string;
      imageUrl: string;
    }[];
    name: string;
    price: number;
  }
}

export declare namespace ItemBuyerTypes {
  export interface IQueryProps {
    desc?: boolean | null;
    sortBy?: string | null;
    page: number | null;
    pageSize: number | null;
  }

  export interface IBodyProps {
    desc?: boolean;
    sortBy?: string;
  }

  export interface IResponseProps {
    total: number;
    page: number;
    page_size: number;
    orders: IResponseItemBuyer[];
  }

  export interface IRenderProps {
    total: number;
    page: number;
    pageSize: number;
    orders: IRenderItemBuyer[];
  }

  export interface IResponseEmployee {
    employment_id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string | null;
    avatar_url: string;
    avatar_thumbnail_url: string;
    reward_available: number | null;
    reward_amount: number | null;
  }

  export interface IRenderEmployee {
    employmentId: number;
    userId: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string | null;
    avatarUrl: string;
    avatarThumbnailUrl: string;
    rewardAvailable: number | null;
    rewardAmount: number | null;
  }

  export interface IResponseItemBuyer {
    entity_id: number;
    entity_uuid: string;
    company_id: number;
    employee: IResponseEmployee;
    status: string;
    created_at: string;
  }

  export interface IRenderItemBuyer {
    entityId: number;
    entityUuid: string;
    companyId: number;
    employee: IRenderEmployee;
    status: string;
    createdAt: string;
  }
}

export declare namespace ShopAdminOrderTypes {
  export interface IQueryParams extends IPaginationTypes {
    companyId: number;
    keyword?: string;
    status?: string;
    creationStartTime?: string;
    creationEndTime?: string;
    shippingStartTime?: string;
    shippingEndTime?: string;
    sortBy?: string | null;
    desc?: boolean | null;
  }

  export interface IResponseProps {
    total: number;
    orders: IResponseOrder[];
  }

  export interface IResponseOrder {
    entity_id: number;
    entity_uuid: string;
    item: {
      entity_id: number | null;
      entity_uuid: string | null;
      name: string | null;
      description: string | null;
      category_name: string | null;
      price: number | null;
      rating: number | null;
      images: {
        entity_id: number | null;
        entity_uuid: string | null;
        image_url: string | null;
        image_thumbnail_url: string | null;
      }[];
    } | null;
    item_id: number;
    status: string;
    amount: number;
    created_at: string;
    updated_at: string;
    employee: {
      avatar_thumbnail_url: string;
      avatar_url: string;
      email: string | null;
      first_name: string | null;
      last_name: string | null;
      reward_amount: number | null;
      reward_available: number | null;
      user_id: number;
      username: string;
    };
  }

  export interface IRenderProps {
    total: number;
    orders: IRenderOrder[];
  }

  export interface IRenderOrder {
    id: number;
    uuid: string;
    item: {
      id: number | null;
      uuid: string | null;
      name: string | null;
      description: string | null;
      categoryName: string | null;
      price: number | null;
      rating: number | null;
      images: {
        id: number | null;
        uuid: string | null;
        imageUrl: string | null;
        imageThumbnailUrl: string | null;
      }[];
    } | null;
    itemId: number;
    status: string;
    amount: number;
    updatedAt: string;
    createdAt: string;
    employee: {
      avatarThumbnailUrl: string;
      avatarUrl: string;
      email: string | null;
      firstName: string | null;
      lastName: string | null;
      rewardAmount: number | null;
      rewardAvailable: number | null;
      userId: number;
      username: string;
    };
  }

  export interface IResponseOrderStatus {
    all_count: number;
    pending_count: number | null;
    finished_count: number | null;
  }

  export interface IRenderOrderStatus {
    allCount: number;
    pendingCount: number | null;
    finishedCount: number | null;
  }
}

export declare namespace DetailShopTypes {
  export interface IResponseProps {
    amount: number;
    branch_ids: number[];
    category_id: number;
    category_name: string;
    comments_amount: number | null;
    description: string | null;
    entity_id: number;
    entity_uuid: string;
    group_ids: number[];
    images: {
      entity_id: number;
      image_thumbnail_url: string;
      image_url: string;
    }[];
    name: string;
    price: number;
    rating: number | null;
  }
  export interface IRenderProps {
    amount: number;
    branchIds: number[];
    categoryId: number;
    categoryName: string;
    commentsAmount: number | null;
    description: string | null;
    id: number;
    uuid: string;
    groupIds: number[];
    images: {
      id: number;
      imageThumbnailUrl: string;
      imageUrl: string;
    }[];
    name: string;
    price: number;
    rating: number | null;
  }
}

export const CREATE_ITEM = {
  started: 'CREATE_ITEM_START',
  success: 'CREATE_ITEM_SUCCESS',
  failed: 'CREATE_ITEM_FAILED',
};

export const GET_ITEM = {
  started: 'GET_ITEM_START',
  success: 'GET_ITEM_SUCCESS',
  failed: 'GET_ITEM_FAILED',
};

export const GET_PRIZES = {
  started: 'GET_PRIZES_START',
  success: 'GET_PRIZES_SUCCESS',
  failed: 'GET_PRIZES_FAILED',
};

export const GET_GAME_PRIZES = {
  started: 'GET_GAME_PRIZES_START',
  success: 'GET_GAME_PRIZES_SUCCESS',
  failed: 'GET_GAME_PRIZES_FAILED',
};

export const DELETE_PRIZES = {
  started: 'DELETE_PRIZES_START',
  success: 'DELETE_PRIZES_SUCCESS',
  failed: 'DELETE_PRIZES_FAILED',
};

export const UPDATE_ITEM = {
  started: 'UPDATE_ITEM_START',
  success: 'UPDATE_ITEM_SUCCESS',
  failed: 'UPDATE_ITEM_FAILED',
};

export const CREATE_SHOP_ORDER = {
  started: 'CREATE_SHOP_ORDER_START',
  success: 'CREATE_SHOP_ORDER_SUCCESS',
  failed: 'CREATE_SHOP_ORDER_FAILED',
};

export const GET_MY_ORDERS = {
  started: 'GET_MY_ORDERS_START',
  success: 'GET_MY_ORDERS_SUCCESS',
  failed: 'GET_MY_ORDERS_FAILED',
};

export const GET_ADMIN_ORDERS = {
  started: 'GET_ADMIN_ORDERS_START',
  success: 'GET_ADMIN_ORDERS_SUCCESS',
  failed: 'GET_ADMIN_ORDERS_FAILED',
};

export const GET_ITEM_BY_ADMIN = {
  started: 'GET_ITEM_BY_ADMIN_START',
  success: 'GET_ITEM_BY_ADMIN_SUCCESS',
  failed: 'GET_ITEM_BY_ADMIN_FAILED',
};

export const GET_ITEM_BUYERS = {
  started: 'GET_ITEM_BUYERS_START',
  success: 'GET_ITEM_BUYERS_SUCCESS',
  failed: 'GET_ITEM_BUYERS_FAILED',
};

export const GET_ORDER_STATUSES = {
  started: 'GET_ORDER_STATUSES_START',
  success: 'GET_ORDER_STATUSES_SUCCESS',
  failed: 'GET_ORDER_STATUSES_FAILED',
};

export const UPDATE_ORDER = {
  started: 'UPDATE_ORDER_START',
  success: 'UPDATE_ORDER_SUCCESS',
  failed: 'UPDATE_ORDER_FAILED',
};

export const GET_DETAIL_SHOP = {
  started: 'GET_DETAIL_SHOP_START',
  success: 'GET_DETAIL_SHOP_SUCCESS',
  failed: 'GET_DETAIL_SHOP_FAILED',
};
