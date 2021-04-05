import { defaultAction } from 'src/store/defaultActions';
import * as api from './api';
import {
  CHANGE_EMPLOYEE_BRANCH,
  GET_EMPLOYEES,
  GET_EMPLOYEES_EXCEL,
  UPDATE_EMPLOYEE_ACTIVENESS,
  DELETE_EMPLOYEES,
  ADD_GROUPS_TO_EMPLOYEES,
  SEND_PASSWORDS_TO_EMPLOYEES,
  REMOVE_INVITATIONS_FROM_EXCEL,
  UPDATE_EMPLOYEE,
  GET_FILTERED_EMPLOYEES,
  GET_EMPLOYMENT_BY_COMPANY_ID,
  IEmploymentBodyParams,
  EmploymentTypes,
} from 'src/store/employment/types';
import { InvitationTypes } from 'src/store/invitation/types';
import { LOCAL_STORAGE } from 'src/core/store/values';

export const getEmployees = (params: IEmploymentBodyParams, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_EMPLOYEES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getEmployees(params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ employees: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getEmployeesExcel = (callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    hasExcel: true,
    action: GET_EMPLOYEES_EXCEL,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || '-1';
      return api.getEmployeesExcel(companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ excel: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getEmploymentByCompanyId = (companyId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_EMPLOYMENT_BY_COMPANY_ID,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getEmploymentByCompanyId(companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ employment: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getFilteredEmployees = (params: IEmploymentBodyParams, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_FILTERED_EMPLOYEES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getEmployees(params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ filteredEmployees: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const updateEmployeesActiveness = (employeeData: EmploymentTypes.IUpdateEmployeeBodyProps, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: UPDATE_EMPLOYEE_ACTIVENESS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.updateEmployee(employeeData, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ activenessState: { ...response, isBlocked: employeeData.isBlocked } }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const changeEmployeesBranch = (employeeData: EmploymentTypes.IUpdateEmployeeBodyProps, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: CHANGE_EMPLOYEE_BRANCH,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.updateEmployee(employeeData, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ changedEmployeeBranchState: response }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const updateEmployee = (employeeData: EmploymentTypes.IUpdateEmployeeBodyProps, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: UPDATE_EMPLOYEE,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.updateEmployee(employeeData, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ updatedEmployee: response }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const deleteEmployees = (employeeIds: number[], fromRemovalModal?: boolean, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: DELETE_EMPLOYEES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.deleteEmployees(employeeIds, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({
      removedEmployeesState: { ...response, fromRemovalModal, count: employeeIds.length },
    }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const addOrRemoveEmployeesGroups = (employeeData: EmploymentTypes.IUpdateEmployeeBodyProps, operation: 'add' | 'delete', callbacks?: any) =>
  (dispatch: any, getState: any) => {
    defaultAction(dispatch, getState, {
      callbacks,
      action: ADD_GROUPS_TO_EMPLOYEES,
      apiCall: () => {
        const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
        return api.addOrRemoveEmployeesGroups(
          employeeData, operation, token || getState().authReducer.login.data.token,
        );
      },
      onSuccess: (response: any) => ({ addOrRemoveEmployeesGroupsState: { ...response, operation } }),
      onError: (response: any) => ({ errorMessage: response.description }),
    });
  };

export const sendPasswordsToEmployees = (employeeIds: number[], companyId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: SEND_PASSWORDS_TO_EMPLOYEES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.sendPasswordsToEmployees(employeeIds, companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ sentPasswordsState: response }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const removeExcelEmployees = (companyId: number, employees: InvitationTypes.IInvitationExcelResponseProps[], callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: REMOVE_INVITATIONS_FROM_EXCEL,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.removeEmployeesFromExcel(companyId, employees, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ removedEmployeesState: { ...response, count: employees.length } }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const clearChangedEmployeesState = () => {
  return (dispatch: any) => {
    dispatch({
      type: UPDATE_EMPLOYEE_ACTIVENESS.success,
      activenessState: null,
    });
    dispatch({
      type: CHANGE_EMPLOYEE_BRANCH.success,
      changedEmployeeBranchState: null,
    });
    dispatch({
      type: ADD_GROUPS_TO_EMPLOYEES.success,
      addOrRemoveEmployeesGroupsState: null,
    });
    dispatch({
      type: SEND_PASSWORDS_TO_EMPLOYEES.success,
      sentPasswordsState: null,
    });
    dispatch({
      type: UPDATE_EMPLOYEE.success,
      updatedEmployee: null,
    });
    dispatch({
      type: DELETE_EMPLOYEES.success,
      removedEmployeesState: null,
    });

  };
};

export const clearEmployeeState = () => {
  return (dispatch: any) => (
    dispatch({
      type: GET_EMPLOYMENT_BY_COMPANY_ID.clear,
    }));
};

export const clearRemovedEmployeesState = () => {
  return (dispatch: any) => {
    dispatch({
      type: REMOVE_INVITATIONS_FROM_EXCEL.success,
      removedEmployeesState: null,
    });
    dispatch({
      type: DELETE_EMPLOYEES.success,
      removedEmployeesState: null,
    });
  };
};

export const clearFilteredEmployees = () => {
  return (dispatch: any) => {
    dispatch({
      type: GET_FILTERED_EMPLOYEES.success,
      filteredEmployees: null,
    });
  };
};

export default{
  getEmployees,
  getEmploymentByCompanyId,
  updateEmployeesActiveness,
  changeEmployeesBranch,
  deleteEmployees,
  addOrRemoveEmployeesGroups,
  sendPasswordsToEmployees,
  removeExcelEmployees,
  clearChangedEmployeesState,
  clearRemovedEmployeesState,
  updateEmployee,
  getFilteredEmployees,
  getEmployeesExcel,
  clearFilteredEmployees,
};
