import { GroupTypes } from 'src/store/group/types';
import { BranchesTypes } from 'src/store/branch/types';
import { CompaniesTypes } from 'src/store/company/types';
import { ILoadTypes } from 'src/core/store/types';

export namespace CompanyGroupTypes {
  export interface IProps {
    companyId: number;
    company?: CompaniesTypes.IRenderProps;
    branches?: BranchesTypes.IRenderProps[];
    groups?: ILoadTypes<GroupTypes.IRenderProps[]>;
    parametricGroupError?: string;
    groupData: GroupTypes.IRenderProps[];

    setGroupData(data: GroupTypes.IRenderProps[]): void;
    createGroup?(data: GroupTypes.ICreateGroupResponse, callbacks?: any): void;
    updateGroup?(groupId: number, data: GroupTypes.ICreateGroupResponse, callbacks?: any): void;
    deleteGroup?(groupId: number[], inheritanceGroupId?: number, callbacks?: any): void;
    downloadGroupEmployees?(groupId: number): void;
    getBranches?(companyId: number): void;
    getGroups?(groupsBodyParams: GroupTypes.IQueryParams): void;
    createParametricGroup?(data: GroupTypes.ICreateParametricGroupResponse, callbacks?: any): void;
  }
}

export interface IGroupsBodyParams {
  company_id?: number;
  page?: number;
  page_size?: number;
  order_field?: string;
  keyword?: string;
}
