import { GroupTypes } from 'src/store/group/types';
import { BranchesTypes } from 'src/store/branch/types';
import { CompaniesTypes } from 'src/store/company/types';
import { IEmploymentBodyParams } from 'src/store/employment/types';

export namespace ShopAvailabilityTypes {
  export interface IProps {
    company?: CompaniesTypes.IRenderProps;
    companyId: number;
    groups?: GroupTypes.IRenderProps[];
    branches?: BranchesTypes.IRenderProps[];
    getBranches?(companyId: number): void;
    getGroups?(params: GroupTypes.IQueryParams): void;
    getEmployees?(params: IEmploymentBodyParams): void;
    employeesTotal?: number;
  }
}
