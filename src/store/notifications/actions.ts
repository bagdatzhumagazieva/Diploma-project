import { defaultAction } from 'src/store/defaultActions';
import { GET_NOTIFICATION, GET_NOTIFICATION_UNREAD, SEND_NOTIFICATION_READ } from 'src/store/notifications/types';
import { LOCAL_STORAGE } from 'src/core/store/values';
import * as api from 'src/store/notifications/api';
import { IPaginationTypes } from 'src/core/store/types';

export const getNotification = (params: IPaginationTypes, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_NOTIFICATION,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || '-1';
      return api.getNotification(companyId, params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ notifications: response.data }),
    onError: (response: any) => ({ errorMessage: response.description || response.message }),
  });
};

export const getNotificationUnread = (params: IPaginationTypes, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_NOTIFICATION_UNREAD,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || '-1';
      return api.getNotificationUnread(companyId, params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ notifications: response.data }),
    onError: (response: any) => ({ errorMessage: response.description || response.message }),
  });
};

export const sendNotificationRead = (id: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: SEND_NOTIFICATION_READ,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || '-1';
      return api.sendReadNotification(companyId, id, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ notifications: response.data }),
    onError: (response: any) => ({ errorMessage: response.description || response.message }),
  });
};

export default {
  getNotification,
  sendNotificationRead,
  getNotificationUnread,
};
