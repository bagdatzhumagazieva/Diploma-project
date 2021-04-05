import { defaultAction } from 'src/store/defaultActions';
import { LOCAL_STORAGE } from 'src/core/store/values';
import {
  CREATE_ITEM,
  GET_PRIZES,
  ItemTypes,
  ShopPrizesTypes,
  DELETE_PRIZES,
  GET_ITEM,
  UPDATE_ITEM,
  ShopGamePrizeTypes,
  GET_MY_ORDERS,
  GET_GAME_PRIZES,
  ShopOrderTypes,
  CREATE_SHOP_ORDER,
  GET_ITEM_BY_ADMIN,
  GET_ITEM_BUYERS,
  ItemBuyerTypes,
  ShopAdminOrderTypes,
  GET_ADMIN_ORDERS, GET_ORDER_STATUSES,
  UPDATE_ORDER, GET_DETAIL_SHOP,
} from 'src/store/item/types';
import * as api from 'src/store/item/api';

export const createItem = (bodyParams: ItemTypes.IBodyProps, companyId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: CREATE_ITEM,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.createItem(bodyParams, companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getAdminPrizes = (bodyParams: ShopPrizesTypes.IQueryProps, companyId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_PRIZES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getAdminPrizes(bodyParams, companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getPrizes = (bodyParams: ShopGamePrizeTypes.IQueryProps, companyId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_GAME_PRIZES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getPrizes(bodyParams, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const deletePrizes = (companyId: number, itemId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: DELETE_PRIZES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.deleteItem(companyId, itemId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getItem = (companyId: any, itemId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_ITEM,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getItem(companyId, itemId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const createShopOrder = (bodyParams: ShopOrderTypes.IBodyProps[], companyId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: CREATE_SHOP_ORDER,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.createShopOrder(bodyParams, companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.code }),
  });
};

export const updateItem = (bodyParams: ItemTypes.IBodyProps, itemId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: UPDATE_ITEM,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || -1;
      return api.updateItem(bodyParams, itemId, +companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getMyOrders = (bodyParams: ShopOrderTypes.IQueryParams, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_MY_ORDERS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getMyOrders(bodyParams, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getAdminOrders = (bodyParams: ShopAdminOrderTypes.IQueryParams, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_ADMIN_ORDERS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getAdminOrders(bodyParams, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getItemByAdmin = (companyId: number, itemId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_ITEM_BY_ADMIN,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getItemByAdmin(companyId, itemId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getItemBuyers = (params: ItemBuyerTypes.IQueryProps, companyId: number, itemId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_ITEM_BUYERS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getItemBuyers(params, +companyId, itemId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getOrderStatus = (companyId: number, itemId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_ORDER_STATUSES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getMyOrderStatus(+companyId, itemId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const updateOrder = (orderId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: UPDATE_ORDER,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || -1;
      return api.updateOrder(+companyId, orderId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getDetailShop = (shopId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_DETAIL_SHOP,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || -1;
      return api.getDetailShop(+companyId, shopId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export default {
  createItem,
  getAdminPrizes,
  getItem,
  deletePrizes,
  getPrizes,
  createShopOrder,
  updateItem,
  getMyOrders,
  getAdminOrders,
  getItemByAdmin,
  getItemBuyers,
  getOrderStatus,
  updateOrder,
  getDetailShop,
};
