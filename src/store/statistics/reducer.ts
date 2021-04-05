import { combineReducers } from 'redux';
import { ActionType, ILoadTypes } from 'src/core/store/types';
import {
  StatisticsCountTypes,
  StatisticsLearningActivityTypes,
  StatisticsPerformanceTypes,
  StatisticsPerformanceDetailTypes,
  StatisticsErrorReportTypes,
  StatisticsReportErrorDetailTypes,
  StatisticsZealReportTypes,
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
} from './types';
import {
  parseDataCount,
  parseLearningActivity,
  parsePerformance,
  parsePerformanceDetail,
  parseErrorReport,
  parseErrorReportDetail,
  parseZealReport,
} from './parsers';

const dataCount = (
  state = { data: null, loading: false },
  action: ActionType<StatisticsCountTypes.IResponseProps>,
): ILoadTypes<StatisticsCountTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_DATA_COUNT.started:
      return {
        data: null,
        loading: true,
      };
    case GET_DATA_COUNT.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_DATA_COUNT.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      return {
        data: parseDataCount(action.data),
        loading: false,
      };
    default:
      return state;
  }
};

const learningActivity = (
  state = { data: null, loading: false },
  action: ActionType<StatisticsLearningActivityTypes.IResponseProps>,
): ILoadTypes<StatisticsLearningActivityTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_LEARNING_ACTIVITY.started:
      return {
        data: null,
        loading: true,
      };
    case GET_LEARNING_ACTIVITY.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_LEARNING_ACTIVITY.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      return {
        data: parseLearningActivity(action.data),
        loading: false,
      };
    default:
      return state;
  }
};

const performance = (
  state = { data: null, loading: false },
  action: ActionType<StatisticsPerformanceTypes.IResponseProps>,
): ILoadTypes<StatisticsPerformanceTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_PERFORMANCE.started:
      return {
        data: null,
        loading: true,
      };
    case GET_PERFORMANCE.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_PERFORMANCE.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      return {
        data: parsePerformance(action.data),
        loading: false,
      };
    default:
      return state;
  }
};

const downloadedPerformance = (
  state = { data: null, loading: false },
  action: ActionType<unknown, { entityId: number }>,
): ILoadTypes<unknown | null, { entityId: number }> => {
  switch (action.type) {
    case DOWNLOAD_PERFORMANCE.started:
      return {
        data: null,
        loading: true,
        withStart: { entityId: action.entityId },
      };
    case DOWNLOAD_PERFORMANCE.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case DOWNLOAD_PERFORMANCE.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      return {
        data: action.data,
        loading: false,
      };
    default:
      return state;
  }
};

const performanceDetail = (
  state = { data: null, loading: false },
  action: ActionType<StatisticsPerformanceDetailTypes.IResponseProps>,
): ILoadTypes<StatisticsPerformanceDetailTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_PERFORMANCE_DETAIL.started:
      return {
        data: null,
        loading: true,
      };
    case GET_PERFORMANCE_DETAIL.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_PERFORMANCE_DETAIL.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      return {
        data: parsePerformanceDetail(action.data),
        loading: false,
      };
    default:
      return state;
  }
};

const errorReports = (
  state = { data: null, loading: false },
  action: ActionType<StatisticsErrorReportTypes.IResponseProps>,
): ILoadTypes<StatisticsErrorReportTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_ERROR_REPORTS.started:
      return {
        data: null,
        loading: true,
      };
    case GET_ERROR_REPORTS.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_ERROR_REPORTS.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      return {
        data: parseErrorReport(action.data),
        loading: false,
      };
    default:
      return state;
  }
};

const downloadedErrorReport = (
  state = { data: null, loading: false },
  action: ActionType<unknown, { entityId: number }>,
): ILoadTypes<unknown | null, { entityId: number }> => {
  switch (action.type) {
    case DOWNLOAD_ERROR_REPORT.started:
      return {
        data: null,
        loading: true,
        withStart: { entityId: action.entityId },
      };
    case DOWNLOAD_ERROR_REPORT.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case DOWNLOAD_ERROR_REPORT.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      return {
        data: action.data,
        loading: false,
      };
    default:
      return state;
  }
};

const errorDetail = (
  state = { data: null, loading: false },
  action: ActionType<StatisticsReportErrorDetailTypes.IResponseProps>,
): ILoadTypes<StatisticsReportErrorDetailTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_REPORT_ERROR_DETAIL.started:
      return {
        data: null,
        loading: true,
      };
    case GET_REPORT_ERROR_DETAIL.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_REPORT_ERROR_DETAIL.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      return {
        data: parseErrorReportDetail(action.data),
        loading: false,
      };
    default:
      return state;
  }
};

const zealReports = (
  state = { data: null, loading: false },
  action: ActionType<StatisticsZealReportTypes.IResponseProps>,
): ILoadTypes<StatisticsZealReportTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_ZEAL_REPORTS.started:
      return {
        data: null,
        loading: true,
      };
    case GET_ZEAL_REPORTS.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_ZEAL_REPORTS.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      return {
        data: parseZealReport(action.data),
        loading: false,
      };
    default:
      return state;
  }
};

const downloadedZealReport = (
  state = { data: null, loading: false },
  action: ActionType<unknown>,
): ILoadTypes<unknown | null> => {
  switch (action.type) {
    case DOWNLOAD_ZEAL_REPORT.started:
      return {
        data: null,
        loading: true,
      };
    case DOWNLOAD_ZEAL_REPORT.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case DOWNLOAD_ZEAL_REPORT.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      return {
        data: action.data,
        loading: false,
      };
    default:
      return state;
  }
};

const statisticsReducer = combineReducers({
  dataCount,
  learningActivity,
  performance,
  downloadedPerformance,
  performanceDetail,
  errorReports,
  downloadedErrorReport,
  errorDetail,
  zealReports,
  downloadedZealReport,
});

export default statisticsReducer;
