import {
  MarketplaceOrderTypes,
  MarketplaceItemTypes,
  GET_MARKETPLACE_ORDERS,
  GET_MARKETPLACE_ITEMS,
  GET_MARKETPLACE_ITEM_DETAIL,
  CREATE_ORDER,
  MarketplaceCategoryTypes,
  GET_FILTER_CATEGORIES,
} from 'src/store/marketplace/types';
import { defaultAction } from 'src/store/defaultActions';
import { LOCAL_STORAGE } from 'src/core/store/values';
import * as api from 'src/store/marketplace/api';

export const getMyOrders = (bodyParams: MarketplaceOrderTypes.IQueryParams, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_MARKETPLACE_ORDERS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getMyOrders(bodyParams, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getMarketplaceItems = (bodyParams: MarketplaceItemTypes.IQueryParams, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_MARKETPLACE_ITEMS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getMarketplaceItems(bodyParams, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getItemDetail = (companyId: any, itemId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_MARKETPLACE_ITEM_DETAIL,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getItemDetail(companyId, itemId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const createOrder = (bodyParams: MarketplaceOrderTypes.IBodyParams, companyId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: CREATE_ORDER,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.createOrder(bodyParams, companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getFilterCategories = (bodyParams: MarketplaceCategoryTypes.IQueryParams, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_FILTER_CATEGORIES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getFilterCategories(bodyParams, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => {
      return  { data: response.data };
    },
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export default {
  getMyOrders,
  getMarketplaceItems,
  getItemDetail,
  createOrder,
  getFilterCategories,
};