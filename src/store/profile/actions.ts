import { defaultAction } from 'src/store/defaultActions';
import * as api from './api';
import {
  UPDATE_PROFILE,
  GET_PROFILE,
  FINISH_REGISTRATION,
  ProfileTypes,
  CHANGE_PASSWORD,
  UPLOAD_AVATAR,
  GET_AVATAR,
} from './types';
import { LOCAL_STORAGE } from 'src/core/store/values';

export const updateProfile = (data: ProfileTypes.IUpdateBodyProps, callbacks: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: UPDATE_PROFILE,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.updateProfile(data, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ profile: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const finishRegistration = (data: ProfileTypes.IFinishRequest, callbacks: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: FINISH_REGISTRATION,
    apiCall: () => api.finishRegistration(data),
    onSuccess: (response: any) => ({ response }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const changePassword = (data: ProfileTypes.IChangePasswordRequest, callbacks: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: CHANGE_PASSWORD,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.changePassword(token || getState().authReducer.login.data.token, data);
    },
    onSuccess: (response: any) => ({ profile: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getProfile = (callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_PROFILE,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getProfile(token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ profile: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const uploadAvatar = (file: any, uuid: string, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: UPLOAD_AVATAR,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.uploadAvatar(token || getState().authReducer.login.data.token, file, uuid);
    },
    onSuccess: (response: any) => ({ image: response }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

// todo maybe delete the method because you can get avatar url from from profile
export const getAvatar = (uuid: string, callbacks: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    hasImage: true,
    action: GET_AVATAR,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getAvatar(token || getState().authReducer.login.data.token, uuid);
    },
    onSuccess: (response: any) => { return { data: response }; },
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export default{
  updateProfile,
  getProfile,
  changePassword,
  finishRegistration,
  uploadAvatar,
  getAvatar,
};
