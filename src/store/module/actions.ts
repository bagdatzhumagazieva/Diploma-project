import { defaultAction } from 'src/store/defaultActions';
import {
  CREATE_MODULES, GET_MODULES, UPDATE_MODULES,
  DELETE_MODULES, ModuleTypes, GET_MODULES_LIST,
} from 'src/store/module/types';
import { LOCAL_STORAGE } from 'src/core/store/values';
import * as api from 'src/store/module/api';
import { getDetailCourseInfo } from 'src/store/course/api';

export const createModules = (courseId: number, bodyParams: ModuleTypes.IRenderProps[], callbacks: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: CREATE_MODULES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.createModules(courseId, bodyParams, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.code }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const updateModules = (courseId: number, bodyParams: ModuleTypes.IRenderProps[], callbacks: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: UPDATE_MODULES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.updateModules(courseId, bodyParams, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.code }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getModules = (courseId: number, companyId: number, callbacks: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_MODULES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getModules(courseId, companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const deleteModules = (courseId: number, moduleIds: number[], callbacks: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: DELETE_MODULES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.deleteModules(courseId, moduleIds, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getModuleList = (companyId: number, courseId: number, callbacks: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_MODULES_LIST,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return getDetailCourseInfo(companyId, courseId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export default {
  createModules,
  getModules,
  updateModules,
  deleteModules,
  getModuleList,
};
