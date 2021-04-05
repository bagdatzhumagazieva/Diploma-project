import { EmploymentTypes } from 'src/store/employment/types';

export declare namespace GroupTypes {
  export interface IResponseProps {
    id: number;
    uuid: string;
    name: string;
    description: string;
    is_active: boolean;
    company_id: number;
    group_type: string;
    total_activity_percent: number;
    employee_number: number;
    content_amount: number;
    employees: EmploymentTypes.IResponseProps[];
  }

  export interface IRenderProps {
    id: number;
    name?: string;
    description?: string;
    groupType?: string;
    employeeNumber?: number;
    totalActivityPercent?: number;
    checkboxChecked?: boolean;
    contentAmount?: number;
  }

  export interface ICreateGroupResponse {
    name: string;
    description: string;
    company_id: string | number;
  }

  export interface ICreateParametricGroupResponse {
    name?: string;
    description?: string;
    company_id: number;
    gender?: string;
    age_from?: number;
    age_to?: number;
    duration_in_system: string;
    branch_id: number;
    group_ids: number[];
  }

  export interface IQueryParams {
    companyId: number;
    page?: number;
    pageSize?: number;
    orderField?: string;
    keyword?: string;
  }
}

export const GET_GROUPS = {
  started: 'GET_GROUPS_START',
  success: 'GET_GROUPS_SUCCESS',
  failed: 'GET_GROUPS_FAILED',
};

export const GET_GROUP_BY_ID = {
  started: 'GET_GROUP_BY_ID_START',
  success: 'GET_GROUP_BY_ID_SUCCESS',
  failed: 'GET_GROUP_BY_ID_FAILED',
};

export const UPDATE_GROUP = {
  started: 'UPDATE_GROUP_START',
  success: 'UPDATE_GROUP_SUCCESS',
  failed: 'UPDATE_GROUP_FAILED',
};

export const DELETE_GROUP = {
  started: 'DELETE_GROUP_START',
  success: 'DELETE_GROUP_SUCCESS',
  failed: 'DELETE_GROUP_FAILED',
};

export const CREATE_GROUP = {
  started: 'CREATE_GROUP_START',
  success: 'CREATE_GROUP_SUCCESS',
  failed: 'CREATE_GROUP_FAILED',
};

export const CREATE_PARAMETRIC_GROUP = {
  started: 'CREATE_PARAMETRIC_GROUP_START',
  success: 'CREATE_PARAMETRIC_GROUP_SUCCESS',
  failed: 'CREATE_PARAMETRIC_GROUP_FAILED',
};

export const DOWNLOAD_GROUP_EMPLOYEES = {
  started: 'DOWNLOAD_GROUP_EMPLOYEES_STARTED',
  success: 'DOWNLOAD_GROUP_EMPLOYEES_SUCCESS',
  failed: 'DOWNLOAD_GROUP_EMPLOYEES_FAILED',
};

export const GET_GROUPS_BY_IDS = {
  started: 'GET_GROUPS_BY_IDS_STARTED',
  success: 'GET_GROUPS_BY_IDS_SUCCESS',
  failed: 'GET_GROUPS_BY_IDS_FAILED',
};
