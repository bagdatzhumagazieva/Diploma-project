import { defaultAction } from 'src/store/defaultActions';
import { GET_GAME_TEMPLATE, TemplateTypes } from 'src/store/game/template/types';
import { LOCAL_STORAGE } from 'src/core/store/values';
import * as api from 'src/store/game/template/api';

export const getTemplates = (params?: TemplateTypes.IQueryParams, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_GAME_TEMPLATE,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN) || '';
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || '';
      if (typeof +companyId !== 'number') return;
      return api.getTemplate(token, +companyId, params);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};
