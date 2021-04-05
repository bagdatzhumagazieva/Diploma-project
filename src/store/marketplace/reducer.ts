import { combineReducers } from 'redux';
import { ActionType, ILoadTypes } from 'src/core/store/types';
import {
  MarketplaceOrderTypes,
  MarketplaceItemTypes,
  MarketplaceItemDetailTypes,
  GET_MARKETPLACE_ITEMS,
  GET_MARKETPLACE_ORDERS,
  GET_MARKETPLACE_ITEM_DETAIL,
  CREATE_ORDER,
  GET_FILTER_CATEGORIES,
  MarketplaceCategoryTypes,
} from 'src/store/marketplace/types';
import {
  parseOrderResponse,
  parseItemResponse,
  parseMarketplaceItemDetail,
  parseFilterCategory,
} from 'src/store/marketplace/parsers';

const marketplaceOrders = (
  state = { data: null, loading: false },
  action: ActionType<MarketplaceOrderTypes.IResponseProps>,
): ILoadTypes<MarketplaceOrderTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_MARKETPLACE_ORDERS.started:
      return {
        data: null,
        loading: true,
      };
    case GET_MARKETPLACE_ORDERS.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_MARKETPLACE_ORDERS.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      return {
        data: parseOrderResponse(action.data),
        loading: false,
      };
    default:
      return state;
  }
};

const marketplaceItems = (
  state = { data: null, loading: false },
  action: ActionType<MarketplaceItemTypes.IResponseProps>,
): ILoadTypes<MarketplaceItemTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_MARKETPLACE_ITEMS.started:
      return {
        data: null,
        loading: true,
      };
    case GET_MARKETPLACE_ITEMS.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_MARKETPLACE_ITEMS.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      return {
        data: parseItemResponse(action.data),
        loading: false,
      };
    default:
      return state;
  }
};

const marketplaceItemDetail = (
  state = { data: null, loading: true },
  action: ActionType<MarketplaceItemDetailTypes.IResponseProps>,
): ILoadTypes<MarketplaceItemDetailTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_MARKETPLACE_ITEM_DETAIL.started:
      return {
        data: null,
        loading: true,
      };
    case GET_MARKETPLACE_ITEM_DETAIL.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_MARKETPLACE_ITEM_DETAIL.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      return {
        data: parseMarketplaceItemDetail(action.data),
        loading: false,
      };
    default:
      return state;
  }
};

/* TODO: fix the return type */
const createdOrder = (
  state = { data: null, loading: false },
  action: ActionType<MarketplaceOrderTypes.IOrderResponse>,
): any => {
  switch (action.type) {
    case CREATE_ORDER.started:
      return {
        data: null,
        loading: true,
      };
    case CREATE_ORDER.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case CREATE_ORDER.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      return {
        data: action.data,
        loading: false,
      };
    default:
      return state;
  }
};

const filterCategories = (
  state = { data: null, loading: false },
  action: ActionType<MarketplaceCategoryTypes.ICategoryResponse[]>,
): ILoadTypes<MarketplaceCategoryTypes.ICategoryRender[] | null> => {
  switch (action.type) {
    case GET_FILTER_CATEGORIES.started:
      return {
        data: null,
        loading: true,
      };
    case GET_FILTER_CATEGORIES.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_FILTER_CATEGORIES.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      return {
        data: action.data.map(e => parseFilterCategory(e)),
        loading: false,
      };
    default:
      return state;
  }
};

const marketplaceReducer = combineReducers({
  marketplaceOrders,
  marketplaceItems,
  marketplaceItemDetail,
  createdOrder,
  filterCategories,
});

export default marketplaceReducer;
