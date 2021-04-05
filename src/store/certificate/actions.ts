import { defaultAction } from 'src/store/defaultActions';
import * as api from 'src/store/certificate/api';
import { CertificateTypes, GET_CERTIFICATES, GET_CERTIFICATE_BY_ID, GET_CERTIFICATES_DOWNLOAD } from 'src/store/certificate/types';
import { LOCAL_STORAGE } from 'src/core/store/values';
import { parseCertificateData } from 'src/store/certificate/parsers';

export const getAchievements = (params: CertificateTypes.IQueryProps, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_CERTIFICATES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getCertificates(params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getCertificateById = (certificateId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_CERTIFICATE_BY_ID,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getCertificateById(certificateId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => parseCertificateData(response.data),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getCertificateDownload = (certificateId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    hasPdf: true,
    action: GET_CERTIFICATES_DOWNLOAD,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getCertificateDownload(certificateId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export default {
  getAchievements,
  getCertificateDownload,
};
