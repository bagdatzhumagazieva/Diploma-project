import * as api from 'src/store/battles/api';
import { defaultAction } from 'src/store/defaultActions';
import { LOCAL_STORAGE } from 'src/core/store/values';
import {
  BattleAggregatorTypes,
  BattleEmployeesTypes,
  BattlesEmployeeTypes,
  CREATE_BATTLE, CREATE_BATTLE_TEST, GET_BATTLE_EMPLOYEES, GET_BATTLE_TEST, GET_BATTLES_AGGREGATOR,
  GET_EMPLOYMENT_BATTLES,
  GET_BATTLE_STATUS,
  CHANGE_BATTLE_STATUS,
  LEAVE_BATTLE,
  GET_BATTLE_BY_ID,
} from 'src/store/battles/types';
import { CourseCompleteTypes } from 'src/store/courseComplete/types';

export const getEmploymentBattles = (companyId: number, employeeId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_EMPLOYMENT_BATTLES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getEmploymentBattle(companyId, employeeId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const createBattle = (data: BattlesEmployeeTypes.IBodyParams, companyId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: CREATE_BATTLE,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.createBattle(data, companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getBattleTest = (companyId: number, battleId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_BATTLE_TEST,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getBattleTests(companyId, battleId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const createBattleTest = (data: CourseCompleteTypes.IQuestionCompleteBody, battleId: number, companyId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: CREATE_BATTLE_TEST,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.createBattleTest(data, battleId, companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getBattleEmployees = (data: BattleEmployeesTypes.IQueryParams, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_BATTLE_EMPLOYEES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getBattleEmployees(data, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getBattlesAggregator = (data: BattleAggregatorTypes.IQueryProps, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_BATTLES_AGGREGATOR,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getBattleList(data, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getBattleStatus = (battleId: number, companyId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_BATTLE_STATUS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.checkBattleStatus(battleId, companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const changeBattleStatus = (battleId: number, companyId: number, status: string, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: CHANGE_BATTLE_STATUS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.changeBattleStatus(battleId, companyId, status, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const leaveBattle = (battleId: number, companyId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: LEAVE_BATTLE,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.leaveBattle(battleId, companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getBattleById = (battleId: number, companyId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_BATTLE_BY_ID,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getBattleById(battleId, companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const clearAttemptBattle = () => (dispatch: any) => {
  dispatch({ type: CREATE_BATTLE_TEST.clear });
};

export default{
  getEmploymentBattles,
  createBattle,
  getBattleTest,
  createBattleTest,
  getBattleEmployees,
  getBattlesAggregator,
  getBattleStatus,
  clearAttemptBattle,
};
