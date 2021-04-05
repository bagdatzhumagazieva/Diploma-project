import { defaultAction } from 'src/store/defaultActions';
import * as api from './api';
import {
  SEARCH_EMPLOYEES,
  SEARCH_GLOBAL,
  SearchTypes,
} from 'src/store/search/types';
import { LOCAL_STORAGE } from 'src/core/store/values';

export const searchEmployees = (employee: SearchTypes.ISearchBodyParams, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: SEARCH_EMPLOYEES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.searchEmployees(employee, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ searchedEmployees: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const clearSearchedEmployees = () => {
  return (dispatch: any) => {
    dispatch({
      type: SEARCH_EMPLOYEES.success,
      removedEmployeesState: null,
    });
  };
};

export const searchGlobal = (companyId: number, keyword: string, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: SEARCH_GLOBAL,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.searchGlobal(token || getState().authReducer.login.data.token, companyId, keyword);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export default {
  searchEmployees,
  clearSearchedEmployees,
  searchGlobal,
};
