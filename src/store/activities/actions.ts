import { defaultAction } from 'src/store/defaultActions';
import * as api from 'src/store/activities/api';
import { ActivitiesTypes, GET_ACTIVITIES, GET_ACTIVITIES_COUNT } from 'src/store/activities/types';
import { LOCAL_STORAGE } from 'src/core/store/values';

export const getActivities = (params: ActivitiesTypes.IQueryProps, callbacks: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_ACTIVITIES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || '-1';
      return api.getActivities(companyId, params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getActivitiesCount = (callbacks: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_ACTIVITIES_COUNT,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || '-1';
      return api.getActivitiesCount(companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export default {
  getActivities,
  getActivitiesCount,
};
