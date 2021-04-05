import { GroupTypes } from 'src/store/group/types';
import { BranchesTypes } from 'src/store/branch/types';
import { IPaginationTypes } from 'src/core/store/types';

export declare namespace InvitationTypes {
  export interface IGetInvitationsBodyParams extends IPaginationTypes {
    branch_id?: number;
    company_id?: number;
    keyword?: string;
    group_ids?: number[];
    created_at_time_from?: string;
    created_at_time_to?: string;
    status?: string;
  }

  export interface IInvitationBodyParams {
    email?: string;
    phone?: string;
    branch_id?: number;
    company_id?: number;
    group_ids?: number[];
  }

  export interface IResponseProps {
    id: number;
    email: string;
    phone: string;
    branch: BranchesTypes.IResponseProps;
    groups: GroupTypes.IResponseProps[];
    status: string;
    send_date: string;
  }

  export interface IRenderProps {
    id: number;
    email: string;
    phone: string;
    branch: BranchesTypes.IRenderProps;
    groups: GroupTypes.IRenderProps[];
    status: string;
    sendAt: string;
  }

  export interface IInvitationExcelResponseProps {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    branch_name: string;
    group_names: string[];
  }

  export interface IInvitationExcelRenderProps {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    branchName: string;
    groupNames: string[];
  }
}

export const GET_INVITATIONS = {
  started: 'GET_INVITATIONS_START',
  success: 'GET_INVITATIONS_SUCCESS',
  failed: 'GET_INVITATIONS_FAILED',
};

export const CREATE_INVITATIONS = {
  started: 'CREATE_INVITATIONS_START',
  success: 'CREATE_INVITATIONS_SUCCESS',
  failed: 'CREATE_INVITATIONS_FAILED',
};

export const CREATE_INVITATIONS_FROM_EXCEL = {
  started: 'CREATE_INVITATIONS_FROM_EXCEL_START',
  success: 'CREATE_INVITATIONS_FROM_EXCEL_SUCCESS',
  failed: 'CREATE_INVITATIONS_FROM_EXCEL_FAILED',
};

export const UPLOAD_EXCEL_INVITATIONS = {
  started: 'UPLOAD_EXCEL_INVITATIONS_START',
  success: 'UPLOAD_EXCEL_INVITATIONS_SUCCESS',
  failed: 'UPLOAD_EXCEL_INVITATIONS_FAILED',
};

export const DELETE_INVITATIONS = {
  started: 'DELETE_INVITATIONS_START',
  success: 'DELETE_INVITATIONS_SUCCESS',
  failed: 'DELETE_INVITATIONS_FAILED',
};

export const RESEND_INVITATIONS = {
  started: 'RESEND_INVITATIONS_START',
  success: 'RESEND_INVITATIONS_SUCCESS',
  failed: 'RESEND_INVITATIONS_FAILED',
};
