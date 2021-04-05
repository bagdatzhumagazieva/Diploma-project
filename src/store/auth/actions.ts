import { defaultAction } from 'src/store/defaultActions';
import * as api from './api';
import {
  CREATE_ACTIVATION, GET_LOGIN, GET_USER_ACTIVATION_TOKEN,
  CODE_ACTIVATION, RESEND_ACTIVATION, GET_SOCIAL_LOGIN, AuthTypes,
} from 'src/store/auth/types';
import { addToken } from 'src/store/auth/consts';
import { LOCAL_STORAGE } from 'src/core/store/values';

export const login = (data: any, callbacks: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_LOGIN,
    apiCall: () => api.login(data),
    onSuccess: (response: any) => {
      localStorage.setItem('token', response.token);
      return ({ login: response });
    },
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const socialLogin = (data: any, callbacks: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_SOCIAL_LOGIN,
    apiCall: () => api.socialLogin(data),
    onSuccess: (response: any) => {
      localStorage.removeItem(LOCAL_STORAGE.COMPANY_ID);
      localStorage.removeItem(LOCAL_STORAGE.COMPANY_UUID);
      localStorage.setItem(LOCAL_STORAGE.TOKEN, response.data.token);
      addToken(response.data.token);
      return ({ token: response.data });
    },
    onError: (response: any) => ({ errorMessage: response.message }),
  });
};

export const createActivation = (data: any, callbacks: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: CREATE_ACTIVATION,
    apiCall: () => api.createActivation(data),
    onSuccess: (response: any) => ({ registration: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const confirmActivation = (data: AuthTypes.ConfirmActivationRequest, callbacks: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: CODE_ACTIVATION,
    apiCall: () => api.confirmActivation(data),
    onSuccess: (response: any) => {
      localStorage.setItem(LOCAL_STORAGE.TOKEN, response.data.token);
      localStorage.removeItem(LOCAL_STORAGE.COMPANY_ID);
      localStorage.removeItem(LOCAL_STORAGE.COMPANY_UUID);
      addToken(response.data.token);
      return ({ data: response.data.token });
    },
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const resendActivation = (data: string, callbacks: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: RESEND_ACTIVATION,
    apiCall: () => api.resendActivation(data),
    onSuccess: (response: any) => {},
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getUserActivationToken = (uuid: string, code: string, callbacks: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_USER_ACTIVATION_TOKEN,
    apiCall: () => api.getUserActivationToken(uuid, code),
    onSuccess: (response: any) => {
      response.data && localStorage.setItem(LOCAL_STORAGE.TOKEN, response.data.token);
      localStorage.removeItem(LOCAL_STORAGE.COMPANY_ID);
      localStorage.removeItem(LOCAL_STORAGE.COMPANY_UUID);
      response.data && addToken(response.data.token);
      return ({ login: response.data });
    },
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export default{
  createActivation,
  login,
  socialLogin,
  confirmActivation,
  resendActivation,
  getUserActivationToken,
};
