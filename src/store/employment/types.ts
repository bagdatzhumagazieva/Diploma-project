import { IPaginationTypes } from 'src/core/store/types';
import { IResponseBody } from 'src/core/components/types';
import { BranchesTypes } from 'src/store/branch/types';
import { GroupTypes } from 'src/store/group/types';

export declare namespace EmploymentTypes {
  export interface IResponseProps {
    user_id: string;
    role: string;
    company_id: number;
    branch_id: string;
    first_name: string;
    middle_name: string;
    last_name: string;
    id: number;
    uuid: string;
    branch: BranchesTypes.IResponseProps;
    group_ids: number[];
    is_blocked: boolean;
    groups: GroupTypes.IResponseProps[];
    last_login_time: string;
    total_activity_percent: number;
    birth_date: string;
    phone: string;
    email: string;
    gender: string;
    reward_amount: number;
    reward_available: number;
    reward_spent: number;
    avatar_thumbnail_url?: string;
    avatar_url?: string;
    company: any;
  }

  export interface IRenderProps {
    id: number;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    userId?: string;
    role?: string;
    companyId?: number;
    branchId?: string;
    groupIds?: number[];
    isBlocked?: boolean;
    uuid?: string;
    branch?: BranchesTypes.IRenderProps;
    groups?: GroupTypes.IRenderProps[];
    lastLoginTime?: string;
    activityPercent?: number;
    birthDate: string;
    phone: string;
    email: string;
    gender: string;
    isChecked?: boolean;
    fullName: string;
    rewardAmount: number;
    rewardAvailable: number;
    rewardSpent: number;
    avatarThumbnailUrl: string;
    avatarUrl: string;
    companyName: string;
  }

  export interface IUpdateEmployeeResponseProps extends IResponseBody {
    isBlocked?: boolean;
    operation?: 'add' | 'delete';
  }

  export interface IUpdateEmployeeBodyProps {
    isBlocked?: boolean;
    branchId?: number;
    employeeIds?: number[];
    groupIds?: number[];
    role?: string;
    companyId?: number;
  }
}

export interface IEmploymentBodyParams extends IPaginationTypes {
  branch_id?: number;
  branch_ids?: number[];
  company_id?: number;
  group_ids?: number[];
  order_field?: string;
  keyword?: string;
  last_login_time_from?: string;
  last_login_time_to?: string;
  not_group_id?: number;
  without_groups?: boolean;
  with_blocked?: boolean;
  is_active?: string;
}

export interface IGetEmploymentByUserId {
  company_id?: number;
}

export const GET_EMPLOYEES = {
  started: 'GET_EMPLOYEES_START',
  success: 'GET_EMPLOYEES_SUCCESS',
  failed: 'GET_EMPLOYEES_FAILED',
};

export const GET_EMPLOYEES_EXCEL = {
  started: 'GET_EMPLOYEES_EXCEL_START',
  success: 'GET_EMPLOYEES_EXCEL_SUCCESS',
  failed: 'GET_EMPLOYEES_EXCEL_FAILED',
};

export const GET_EMPLOYMENT_BY_COMPANY_ID = {
  started: 'GET_EMPLOYMENT_BY_COMPANY_ID_START',
  success: 'GET_EMPLOYMENT_BY_COMPANY_ID_SUCCESS',
  failed: 'GET_EMPLOYMENT_BY_COMPANY_ID_FAILED',
  clear: 'GET_EMPLOYMENT_BY_COMPANY_ID_CLEAR',
};

export const GET_FILTERED_EMPLOYEES = {
  started: 'GET_FILTERED_EMPLOYEES_START',
  success: 'GET_FILTERED_EMPLOYEES_SUCCESS',
  failed: 'GET_FILTERED_EMPLOYEES_FAILED',
};

export const UPDATE_EMPLOYEE_ACTIVENESS = {
  started: 'UPDATE_EMPLOYEE_ACTIVENESS_START',
  success: 'UPDATE_EMPLOYEE_ACTIVENESS_SUCCESS',
  failed: 'UPDATE_EMPLOYEE_ACTIVENESS_FAILED',
};

export const CHANGE_EMPLOYEE_BRANCH = {
  started: 'CHANGE_EMPLOYEE_BRANCH_START',
  success: 'CHANGE_EMPLOYEE_BRANCH_SUCCESS',
  failed: 'CHANGE_EMPLOYEE_BRANCH_FAILED',
};

export const DELETE_EMPLOYEES = {
  started: 'DELETE_EMPLOYEES_START',
  success: 'DELETE_EMPLOYEES_SUCCESS',
  failed: 'DELETE_EMPLOYEES_FAILED',
};

export const ADD_GROUPS_TO_EMPLOYEES = {
  started: 'ADD_GROUPS_TO_EMPLOYEES_START',
  success: 'ADD_GROUPS_TO_EMPLOYEES_SUCCESS',
  failed: 'ADD_GROUPS_TO_EMPLOYEES_FAILED',
};

export const SEND_PASSWORDS_TO_EMPLOYEES = {
  started: 'SEND_PASSWORDS_TO_EMPLOYEES_START',
  success: 'SEND_PASSWORDS_TO_EMPLOYEES_SUCCESS',
  failed: 'SEND_PASSWORDS_TO_EMPLOYEES_FAILED',
};

export const REMOVE_INVITATIONS_FROM_EXCEL = {
  started: 'REMOVE_INVITATIONS_FROM_EXCEL_START',
  success: 'REMOVE_INVITATIONS_FROM_EXCEL_SUCCESS',
  failed: 'REMOVE_INVITATIONS_FROM_EXCEL_FAILED',
};

export const UPDATE_EMPLOYEE = {
  started: 'UPDATE_EMPLOYEE_START',
  success: 'UPDATE_EMPLOYEE_SUCCESS',
  failed: 'UPDATE_EMPLOYEE_FAILED',
};
