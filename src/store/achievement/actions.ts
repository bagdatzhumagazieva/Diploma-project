import { defaultAction } from 'src/store/defaultActions';
import * as api from 'src/store/achievement/api';
import { AchievementTypes, GET_ACHIEVEMENTS, GET_ACHIEVEMENTS_COUNT } from 'src/store/achievement/types';
import { LOCAL_STORAGE } from 'src/core/store/values';

export const getAchievements = (params: AchievementTypes.IQueryProps, callbacks: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_ACHIEVEMENTS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || '-1';
      return api.getAchievements(companyId, params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getAchievementsCount = (params: AchievementTypes.IQueryProps, callbacks: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_ACHIEVEMENTS_COUNT,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || '';
      return api.getAchievementsCount(companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export default {
  getAchievements,
  getAchievementsCount,
};
