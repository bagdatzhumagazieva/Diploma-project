import { defaultAction } from 'src/store/defaultActions';
import * as api from './api';
import {
  GET_COMPANIES,
  GET_COMPANIES_BY_ID,
  GET_COMPANY_ADMINS,
  SET_COMPANY_ID,
  GET_COMPANY_NEWS,
  GET_COMPANY_EXCEL,
} from './types';
import { LOCAL_STORAGE } from 'src/core/store/values';

export const getCompanies = (callbacks: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_COMPANIES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getCompanies(token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ companies: [...response.data.companies] }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const setCompanyId = (data: string) => {
  localStorage.setItem(LOCAL_STORAGE.COMPANY_ID, data);
  return (dispatch: any) => {
    dispatch(
      {
        type: SET_COMPANY_ID,
        companyId: data,
      });
  };
};

export const getCompanyById = (companyId: number, callbacks: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_COMPANIES_BY_ID,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getCompanyById(companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ company: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getCompanyExcel = (companyId: number, callbacks: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_COMPANY_EXCEL,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getCompanyExcel(companyId, token || getState().authReducer.login.data.token);
    },
    onError: (response: any) => ({ errorMessage: response.description }),
    hasExcel: true,
  });
};

export const getCompanyAdmins = (companyId: number, callbacks: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_COMPANY_ADMINS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getCompanyAdmins(companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ admins: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getCompanyNews = (companyId: number, callbacks: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_COMPANY_NEWS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getCompanyNews(companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ news: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export default {
  getCompanyById,
  getCompanies,
  getCompanyAdmins,
  setCompanyId,
  getCompanyExcel,
  getCompanyNews,
};
