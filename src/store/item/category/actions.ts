import { defaultAction } from 'src/store/defaultActions';
import * as api from 'src/store/item/category/api';
import {
  ItemCategoryTypes, GET_ITEM_CATEGORIES, CREATE_CATEGORIES,
} from 'src/store/item/category/types';
import { LOCAL_STORAGE } from 'src/core/store/values';

export const getItemCategories = (params: ItemCategoryTypes.IQueryParams, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_ITEM_CATEGORIES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getItemCategories(params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => {
      return { data: response.data };
    },
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const createCategory = (name: string, companyId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: CREATE_CATEGORIES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.createCategory(name, companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => {
      return { data: response.data };
    },
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export default {
  getItemCategories,
  createCategory,
};
