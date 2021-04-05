import { defaultAction } from 'src/store/defaultActions';
import { LOCAL_STORAGE } from 'src/core/store/values';
import * as api from './api';
import {
  DOWNLOAD_PERFORMANCE,
  GET_DATA_COUNT,
  GET_LEARNING_ACTIVITY,
  GET_PERFORMANCE,
  GET_PERFORMANCE_DETAIL,
  GET_ERROR_REPORTS,
  DOWNLOAD_ERROR_REPORT,
  GET_REPORT_ERROR_DETAIL,
  GET_ZEAL_REPORTS,
  DOWNLOAD_ZEAL_REPORT,
  StatisticsPerformanceDownloadTypes,
  StatisticsPerformanceTypes,
  StatisticsPerformanceDetailTypes,
  StatisticsErrorReportTypes,
  StatisticsErrorReportDownloadTypes,
  StatisticsReportErrorDetailTypes,
  StatisticsZealReportTypes,
  StatisticsZealReportDownloadTypes,
} from './types';

export const getDataCount = (companyId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_DATA_COUNT,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getDataCount(companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getLearningActivity = (companyId: number, range: 'day' | 'week', callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_LEARNING_ACTIVITY,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getLearningActivity(companyId, range, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getPerformance = (params: StatisticsPerformanceTypes.IRequestProps, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_PERFORMANCE,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getPerformance(params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const downloadPerformance = (params: StatisticsPerformanceDownloadTypes.IRequestProps, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: DOWNLOAD_PERFORMANCE,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.downloadPerformance(params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
    hasExcel: true,
    withStart: {
      entityId: params.entityId,
    },
  });
};

export const getPerformanceDetail = (params: StatisticsPerformanceDetailTypes.IRequestProps, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_PERFORMANCE_DETAIL,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getPerformanceDetail(params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getErrorReports = (params: StatisticsErrorReportTypes.IRequestProps, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_ERROR_REPORTS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getErrorReports(params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const downloadErrorReport = (params: StatisticsErrorReportDownloadTypes.IRequestProps, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: DOWNLOAD_ERROR_REPORT,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.downloadErrorReport(params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
    hasExcel: true,
    withStart: {
      entityId: params.entityId,
    },
  });
};

export const getErrorDetail = (params: StatisticsReportErrorDetailTypes.IRequestProps, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_REPORT_ERROR_DETAIL,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getErrorDetail(params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getZealReports = (params: StatisticsZealReportTypes.IRequestProps, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_ZEAL_REPORTS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getZealReports(params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const downloadZealReport = (params: StatisticsZealReportDownloadTypes.IRequestProps, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: DOWNLOAD_ZEAL_REPORT,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.downloadZealReport(params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
    hasExcel: true,
  });
};

export default {
  getDataCount,
  getLearningActivity,
  getPerformance,
  downloadPerformance,
  getPerformanceDetail,
  getErrorReports,
  downloadErrorReport,
  getErrorDetail,
  getZealReports,
  downloadZealReport,
};
