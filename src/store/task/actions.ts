import { defaultAction } from 'src/store/defaultActions';
import { LOCAL_STORAGE } from 'src/core/store/values';
import {
  CREATE_TASK, DELETE_TASK, UPDATE_TASK, GET_TASKS_BY_AGGREGATOR,
  CREATE_ATTEMPT_TASK, GET_DETAIL_TASK_AGGREGATOR, CREATE_FAVORITE_TASK,
  DELETE_FAVORITE_TASK, GET_MY_TASKS, GET_TASK_STATISTICS, GET_TASK_STATISTICS_GROUPS,
  GET_USER_RESULT, GET_STATISTICS_BY_GROUP, GET_USER_RESULT_EXCEL, TaskTypes,
  TaskAggregatorTypes, CreateAttemptTask, MyTasks, TaskAggregatorAdminTypes,
  EmployeeResultTypes, GET_ADMIN_TASKS,
} from 'src/store/task/types';
import * as api from 'src/store/task/api';

export const createTask = (bodyParams: TaskTypes.IBodyProps, companyId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: CREATE_TASK,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.createTask(bodyParams, companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const updateTask = (bodyParams: TaskTypes.IBodyProps, taskId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: UPDATE_TASK,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || -1;
      return api.updateTask(bodyParams, taskId, +companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const deleteTask = (taskId: number[], callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: DELETE_TASK,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || -1;
      return api.deleteTask(taskId, +companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => {
      return { deleteTask: response };
    },
    onError: (response: any) => ({ errorMessage: response.message }),
  });
};

export const getTasksByAggregator = (params: TaskAggregatorTypes.IQueryProps, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_TASKS_BY_AGGREGATOR,
    apiCall: () => {
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || '';
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getTasksByAggregator(companyId, params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const createAttemptTask = (taskId: number, bodyParam: CreateAttemptTask.IRender[], callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: CREATE_ATTEMPT_TASK,
    apiCall: () => {
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || -1;
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.createAttemptTask(taskId, bodyParam, +companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getDetailTask = (taskId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_DETAIL_TASK_AGGREGATOR,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || -1;
      return api.getDetailTask(taskId, +companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const makeFavourTask = (taskId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: CREATE_FAVORITE_TASK,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || -1;
      return api.makeFavourTask(taskId, +companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const deleteFavourTask = (taskId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: DELETE_FAVORITE_TASK,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || -1;
      return api.deleteFavourTask(taskId, +companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getMyTasks = (params: MyTasks.IQueryProps, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_MY_TASKS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getMyExercise(params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getTaskStatistics = (params: TaskAggregatorAdminTypes.IQueryProps, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_TASK_STATISTICS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getStatisticsByAggregator(params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getTaskStatisticsByGroup = (taskId: number, companyId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_TASK_STATISTICS_GROUPS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getStatisticsGroupsByAggregator(taskId, companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getUserResult = (params: EmployeeResultTypes.IQueryProps, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_USER_RESULT,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getUserResult(params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getStatisticsByGroups = (taskId: number, companyId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_STATISTICS_BY_GROUP,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getStatisticsByGroupsAggregator(taskId, companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getGroupExcelResult = (taskId: number, companyId: number, groupIds: number[], callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    hasExcel: true,
    action: GET_USER_RESULT_EXCEL,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getGroupExcelResult(taskId, companyId, groupIds, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getAdminTasks = (bodyParam: TaskTypes.IGetTaskBodyParams, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_ADMIN_TASKS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getAdminTasks(bodyParam, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const clearDetailTask = () => (dispatch: any) => {
  dispatch({ type: GET_DETAIL_TASK_AGGREGATOR.clear });
};

export default {
  createTask,
  updateTask,
  deleteTask,
  getTasksByAggregator,
  createAttemptTask,
  getDetailTask,
  makeFavourTask,
  deleteFavourTask,
  getMyTasks,
  getTaskStatistics,
  getTaskStatisticsByGroup,
  getUserResult,
  getStatisticsByGroups,
  getGroupExcelResult,
  getAdminTasks,
  clearDetailTask,
};
