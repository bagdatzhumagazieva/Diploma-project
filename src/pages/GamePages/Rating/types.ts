import { BranchesTypes } from 'src/store/branch/types';
import { GroupTypes } from 'src/store/group/types';
import { EmploymentTypes, IEmploymentBodyParams } from 'src/store/employment/types';

export namespace RatingTypes {
  export interface IProps {
    branches?: BranchesTypes.IRenderProps[];
    getBranches?(companyId: number): void;
    groups?: GroupTypes.IRenderProps[];
    getGroups?(params: GroupTypes.IQueryParams, callbacks?: any): void;
    employees?: EmploymentTypes.IRenderProps[];
    getEmployees?(params: IEmploymentBodyParams): void;
    totalEmployees?: number;
    employeesLoading?: boolean;
    companyId?: string;
  }

  // todo add rank
  export interface IRatingTableBody {
    index: number;
    image: string;
    fullName: string;
    points: number;
    subCompany: string;
  }
}

export interface IFilters {
  subCompany: string;
  groups: string;
}
