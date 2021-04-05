import { defaultAction } from 'src/store/defaultActions';
import * as api from 'src/store/category/api';
import {
  GET_CATEGORIES,
  CREATE_CATEGORY,
  GET_CATEGORY_BY_ID,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  CategoryTypes,
} from 'src/store/category/types';
import { LOCAL_STORAGE } from 'src/core/store/values';

export const getCategories = (companyId: number, page: number = 1, pageSize: number = 10, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_CATEGORIES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getCategories(companyId, page, pageSize, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ categories: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getCategoryById = (companyId: number, categoryId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_CATEGORY_BY_ID,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getCategoryById(companyId, categoryId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ category: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const createCategory = (companyId: number, data: CategoryTypes.ICreateCategoryBody, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: CREATE_CATEGORY,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.addCategory(companyId, data, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ createdCategoryState: response }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const updateCategory = (companyId: number, data: CategoryTypes.ICreateCategoryBody, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: UPDATE_CATEGORY,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.updateCategory(companyId, data, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ updatedCategoryState: response }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const deleteCategory = (companyId: number, data: CategoryTypes.IDeleteCategoryData, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: DELETE_CATEGORY,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.deleteCategory(companyId, data, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ deletedCategoryState: response }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const clearChangedCreatedCategoryState = () => {
  return (dispatch: any) => {
    dispatch({ type: CREATE_CATEGORY.success, createdCategoryState: null });
    dispatch({ type: UPDATE_CATEGORY.success, updatedCategoryState: null });
    dispatch({ type: DELETE_CATEGORY.success, deletedCategoryState: null });
  };
};

export const clearCategoriesState = () => (dispatch: any) => {
  dispatch({ type: GET_CATEGORIES.clear });
};

export default {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  clearChangedCreatedCategoryState,
  deleteCategory,
  clearCategoriesState,
};
