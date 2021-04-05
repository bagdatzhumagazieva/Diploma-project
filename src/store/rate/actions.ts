import { defaultAction } from 'src/store/defaultActions';
import { LOCAL_STORAGE } from 'src/core/store/values';
import * as api from 'src/store/rate/api';
import { RatingTypes, CREATE_RATING, GET_MY_RATING } from 'src/store/rate/types';

export const createRating = (data: RatingTypes.ICreateBody, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: CREATE_RATING,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || -1;
      return api.createRate(+companyId, data, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ comment: response }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getMyRating = (companyId: number, uuid: string, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_MY_RATING,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getMyRating(companyId, uuid, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ value: response?.data?.value }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const clearRating = () => (dispatch: any) => {
  dispatch({ type: GET_MY_RATING.clear });
};

export default {
  createRating,
};
