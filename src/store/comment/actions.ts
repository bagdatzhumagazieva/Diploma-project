import { defaultAction } from 'src/store/defaultActions';
import { LOCAL_STORAGE } from 'src/core/store/values';
import {
  CommentTypes, CREATE_COMMENT, DELETE_COMMENT,
  GET_ROOT_COMMENTS, GET_ROOT_SUB_COMMENTS,
} from 'src/store/comment/types';
import * as api from 'src/store/comment/api';

export const createComment = (companyId: number, data: CommentTypes.ICreateBody, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: CREATE_COMMENT,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.createComment(companyId, data, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getRootComments = (uuid: string, params: CommentTypes.IQueryParams, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_ROOT_COMMENTS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getComments(uuid, params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getRootSubComments = (uuid: string, params: CommentTypes.IQueryParams, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_ROOT_SUB_COMMENTS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getComments(uuid, params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const deleteComment = (companyId: number, commentId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: DELETE_COMMENT,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.deleteComment(companyId, commentId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.code }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const clearComments = () => (dispatch: any) => {
  dispatch({ type: GET_ROOT_COMMENTS.clear });
};

export default {
  deleteComment,
  createComment,
  getRootComments,
  getRootSubComments,
  clearComments,
};
