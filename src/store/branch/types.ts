import { IBranch } from 'src/components/molecules/BranchesStructure/types';

export declare namespace BranchesTypes {
  export interface IResponseProps {
    name: string;
    parent_branch_id: number;
    company_id: number;
    created_at: string;
    updated_at: string;
    id: number;
    uuid: string;
    reward_amount: number;
    total_activity_percent: number;
    employee_number: number;
    parent_branch?: IRawBranch | null;
    sub_branches?: IRawBranch[] | null;
  }

  export interface IRenderProps {
    name: string;
    parentBranchId: number | null;
    companyId: number;
    id: number;
    uuid: string;
    rewardAmount?: number;
    activityPercent?: number;
    employeesCount?: number;
    parentBranch?: IBranch | null;
    subBranches?: IBranch[] | null;
  }
}

export interface IRawBranch extends BranchesTypes.IResponseProps {

}

export const GET_BRANCHES = {
  started: 'GET_BRANCHES_START',
  success: 'GET_BRANCHES_SUCCESS',
  failed: 'GET_BRANCHES_FAILED',
};

export const ADD_BRANCH = {
  started: 'ADD_BRANCH_START',
  success: 'ADD_BRANCH_SUCCESS',
  failed: 'ADD_BRANCH_FAILED',
};

export const GET_BRANCH_BY_ID = {
  started: 'GET_BRANCH_BY_ID_START',
  success: 'GET_BRANCH_BY_ID_SUCCESS',
  failed: 'GET_BRANCH_BY_ID_FAILED',
};

export const UPDATE_BRANCH = {
  started: 'UPDATE_BRANCH_START',
  success: 'UPDATE_BRANCH_SUCCESS',
  failed: 'UPDATE_BRANCH_FAILED',
};

export const DELETE_BRANCH = {
  started: 'DELETE_BRANCH_START',
  success: 'DELETE_BRANCH_SUCCESS',
  failed: 'DELETE_BRANCH_FAILED',
};
