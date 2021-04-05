import { defaultAction } from 'src/store/defaultActions';
import * as api from './api';
import {
  GET_INVITATIONS,
  CREATE_INVITATIONS,
  UPLOAD_EXCEL_INVITATIONS,
  CREATE_INVITATIONS_FROM_EXCEL,
  DELETE_INVITATIONS,
  RESEND_INVITATIONS,
  InvitationTypes,
} from 'src/store/invitation/types';
import { LOCAL_STORAGE } from 'src/core/store/values';

export const getInvitations = (params: InvitationTypes.IGetInvitationsBodyParams, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_INVITATIONS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getInvitations(params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ invitations: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const createEmployeesInvitations = (employees: InvitationTypes.IInvitationBodyParams[], callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: CREATE_INVITATIONS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.createInvitations(employees, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ createdInvitationsState: response }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const createExcelEmployeesInvitations = (companyId: number, employees: InvitationTypes.IInvitationExcelResponseProps[], callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: CREATE_INVITATIONS_FROM_EXCEL,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.createInvitationsFromExcel(companyId, employees, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ createdInvitationsState: response }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const uploadExcelInvitation = (file: File, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: UPLOAD_EXCEL_INVITATIONS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.uploadExcelInvitation(file, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ excelInvitationList: response }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const clearCreatedInvitationsState = () => {
  return (dispatch: any) => {
    dispatch({
      type: CREATE_INVITATIONS.success,
      activenessState: null,
    });
    dispatch({
      type: UPLOAD_EXCEL_INVITATIONS.success,
      excelInvitationList: null,
    });
  };
};

export const clearUpdatedInvitationsState = () => {
  return (dispatch: any) => {
    dispatch({
      type: DELETE_INVITATIONS.success,
      deletedInvitationsState: null,
    });
    dispatch({
      type: RESEND_INVITATIONS.success,
      resentInvitationsState: null,
    });
  };
};

export const deleteInvitations = (invitationIds: number[], callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: DELETE_INVITATIONS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.deleteInvitations(invitationIds, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ deletedInvitationsState: { ...response, count: invitationIds.length } }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const resendInvitations = (invitationIds: number[], callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: RESEND_INVITATIONS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.resendInvitations(invitationIds, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ resentInvitationsState: { ...response } }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export default {
  getInvitations,
  createEmployeesInvitations,
  createExcelEmployeesInvitations,
  clearCreatedInvitationsState,
  uploadExcelInvitation,
  deleteInvitations,
  resendInvitations,
  clearUpdatedInvitationsState,
};
