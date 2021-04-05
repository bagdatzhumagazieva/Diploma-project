import { defaultAction } from 'src/store/defaultActions';
import * as api from 'src/store/tag/api';
import {
  GET_TAGS, CREATE_TAG, TagsTypes, GET_TAGS_BY_PARAMS,
  DELETE_TAG, GET_TAGS_BY_IDS, EDIT_TAG,
} from 'src/store/tag/types';
import { LOCAL_STORAGE } from 'src/core/store/values';

export const getTags = (params: TagsTypes.IQueryParams, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_TAGS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getTags(params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ tags: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getTagsByIds = (params: TagsTypes.IQueryParams, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_TAGS_BY_IDS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getTagsByIds(params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ tags: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const createTag = (companyId: number, tagName: string, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: CREATE_TAG,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.createTag(companyId, tagName, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ createdTagState: response }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getTagsByParams = (params: TagsTypes.IQueryParams, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_TAGS_BY_PARAMS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getTagsByParams(params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const deleteTag = (companyId: number, groupId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: DELETE_TAG,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.deleteTag(companyId, groupId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ deletedTagState: response }),
    onError: (response: any) => ({ errorMessage: response.message }),
  });
};

export const editTag = (tagId: number, name: string, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: EDIT_TAG,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || '';
      return api.editTag(companyId, tagId, name, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => response,
    onError: (response: any) => ({ errorMessage: response.message }),
  });
};

export const clearTagsState = () => {
  return (dispatch: any) => {
    dispatch({ type: CREATE_TAG.success, createdTagState: null });
  };
};

export default {
  getTags,
  createTag,
  editTag,
  clearTagsState,
  getTagsByParams,
  deleteTag,
  getTagsByIds,
};
