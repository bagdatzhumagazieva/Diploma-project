import { defaultAction } from 'src/store/defaultActions';
import * as api from './api';
import {
  GroupTypes, GET_GROUPS, GET_GROUP_BY_ID,
  UPDATE_GROUP, DELETE_GROUP, CREATE_GROUP,
  CREATE_PARAMETRIC_GROUP, DOWNLOAD_GROUP_EMPLOYEES,
  GET_GROUPS_BY_IDS,
} from './types';
import { GroupDetailPageTypes } from 'src/pages/AdminPages/GroupDetailPage/types';
import { LOCAL_STORAGE } from 'src/core/store/values';

export const getGroups = (params: GroupTypes.IQueryParams, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_GROUPS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getGroups(params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getGroupById = (groupId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_GROUP_BY_ID,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || -1;
      return api.getGroupById(+companyId, groupId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ group: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const createGroup = (data: GroupTypes.ICreateGroupResponse, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: CREATE_GROUP,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.createGroup(token || getState().authReducer.login.data.token, data);
    },
    onSuccess: () => {},
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const createParametricGroup = (data: GroupTypes.ICreateParametricGroupResponse, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: CREATE_PARAMETRIC_GROUP,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.createParametricGroup(token || getState().authReducer.login.data.token, data);
    },
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const updateGroup = (groupId: number, groupData: GroupDetailPageTypes.IGroupUpdateBody, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: UPDATE_GROUP,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.updateGroup(groupId, groupData, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => {
      dispatch({
        type: GET_GROUP_BY_ID.success,
        branchById: response.data,
      });
      return { updatedGroup: response.data };
    },
    onError: (response: any) => ({ errorMessage: response.message }),
  });
};

export const deleteGroup = (groupIds: number[], inheritanceGroupId?: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: DELETE_GROUP,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || '';
      return api.deleteGroup(companyId, groupIds, token || getState().authReducer.login.data.token, inheritanceGroupId);
    },
    onSuccess: (response: any) => ({ deletedGroup: response }),
    onError: (response: any) => ({ errorMessage: response.message }),
  });
};

export const downloadGroupEmployees = (groupId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    hasExcel: true,
    action: DOWNLOAD_GROUP_EMPLOYEES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.downloadGroupEmployees(token || getState().authReducer.login.data.token, groupId);
    },
    onError: (response: any) => ({ errorMessage: response.message }),
  });
};

// todo: change the name to avoid misunderstanding
export const getGroupsByIds = (companyId: number, groupIds: number[], callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_GROUPS_BY_IDS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getGroupByIds(companyId, groupIds, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ groups: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export default {
  getGroups,
  getGroupById,
  deleteGroup,
  updateGroup,
  createGroup,
  createParametricGroup,
  downloadGroupEmployees,
  getGroupsByIds,
};
