import { defaultAction } from 'src/store/defaultActions';
import * as api from 'src/store/media/api';
import { LOCAL_STORAGE } from 'src/core/store/values';
import {
  MediaTypes,
  GET_COMPANY_FILES,
  UPLOAD_COMPANY_BANNER,
  UPLOAD_COMPANY_FILE,
  UPLOAD_COMPANY_LOGO,
  SET_COMPANY_LOGO,
  SET_COMPANY_BANNER,
} from 'src/store/media/types';

export const uploadCompanyFile = (file: File, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: UPLOAD_COMPANY_FILE,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyUuid = localStorage.getItem('company_uuid') || '-1';
      return api.uploadCompanyFile(file, companyUuid, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ uploadedFile: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getCompanyFiles = (params: MediaTypes.ICompanyFilesBodyParams) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    action: GET_COMPANY_FILES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getCompanyFiles(params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ companyFiles: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const uploadCompanyLogo = (file: File, coords: number[], callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: UPLOAD_COMPANY_LOGO,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyUuid = localStorage.getItem('company_uuid') || '-1';
      return api.uploadCompanyLogo(file, coords, companyUuid, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ uploadedLogo: response.data }),
    onError: (response: any) => ({ errorMessage: response.description || response.message }),
  });
};

export const setCompanyLogo = (fileUuid: string, coords: number[], callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: SET_COMPANY_LOGO,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyUuid = localStorage.getItem('company_uuid') || '-1';
      return api.setCompanyLogo(fileUuid, coords, companyUuid, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ uploadedLogo: response.data }),
    onError: (response: any) => ({ errorMessage: response.description || response.message }),
  });
};

export const uploadCompanyBanner = (file: File, coords: number[], callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: UPLOAD_COMPANY_BANNER,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyUuid = localStorage.getItem('company_uuid') || '-1';
      return api.uploadCompanyBanner(file, coords, companyUuid, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ uploadedBanner: response.data }),
    onError: (response: any) => ({ errorMessage: response.description || response.message }),
  });
};

export const setCompanyBanner = (fileUuid: string, coords: number[], callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: SET_COMPANY_BANNER,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyUuid = localStorage.getItem('company_uuid') || '-1';
      return api.setCompanyBanner(fileUuid, coords, companyUuid, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ uploadedBanner: response.data }),
    onError: (response: any) => ({ errorMessage: response.description || response.message }),
  });
};

export const clearAddedCompanyFiles = () => {
  return (dispatch: any) => {
    dispatch({
      type: UPLOAD_COMPANY_FILE.success,
      activenessState: null,
    });
  };
};

export default {
  uploadCompanyFile,
  getCompanyFiles,
  clearAddedCompanyFiles,
  uploadCompanyLogo,
  setCompanyLogo,
  uploadCompanyBanner,
  setCompanyBanner,
};
