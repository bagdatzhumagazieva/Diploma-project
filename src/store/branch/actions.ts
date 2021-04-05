import { defaultAction } from 'src/store/defaultActions';
import * as api from './api';
import { GET_BRANCHES, ADD_BRANCH, GET_BRANCH_BY_ID, UPDATE_BRANCH, DELETE_BRANCH } from './types';
import { ICompanyNewBranchBody } from 'src/components/organisms/CompanyComponents/CompanyStructure/types';
import { LOCAL_STORAGE } from 'src/core/store/values';

export const getBranches = (companyId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_BRANCHES,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getBranches(companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ branches: response.data.branches }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const addBranch = (data: ICompanyNewBranchBody, companyId: number, callbacks: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: ADD_BRANCH,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.addBranch(data, companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => {
      getBranches(companyId)(dispatch, getState);
      return { addedBranchState: response };
    },
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getBranchById = (branchId: number, companyId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_BRANCH_BY_ID,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getBranchById(branchId, companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ branchById: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const updateBranch = (branchId: number, companyId: number, branchData: ICompanyNewBranchBody, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: UPDATE_BRANCH,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.updateBranch(branchId, companyId, branchData, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => {
      dispatch({
        type: GET_BRANCH_BY_ID.success,
        branchById: response.data,
      });
      getBranches(companyId)(dispatch, getState);
      return { updatedBranchState: response };
    },
    onError: (response: any) => ({ errorMessage: response.message }),
  });
};

export const deleteBranch = (branchId: number, companyId: number, inheritanceBranchId?: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: DELETE_BRANCH,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.deleteBranch(
        branchId, companyId, token || getState().authReducer.login.data.token, inheritanceBranchId,
      );
    },
    onSuccess: (response: any) => {
      return { deletedBranch: response };
    },
    onError: (response: any) => ({ errorMessage: response.message }),
  });
};

export const clearChangedBranchState = () => {
  return (dispatch: any) => {
    dispatch({
      type: UPDATE_BRANCH.success,
      activenessState: null,
    });
    dispatch({
      type: DELETE_BRANCH.success,
      changedEmployeeBranchState: null,
    });
    dispatch({
      type: ADD_BRANCH.success,
      changedEmployeeBranchState: null,
    });
  };
};

export default{
  getBranches,
  addBranch,
  getBranchById,
  updateBranch,
  deleteBranch,
  clearChangedBranchState,
};
