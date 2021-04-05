import { BranchesTypes } from 'src/store/branch/types';
import { CompaniesTypes } from 'src/store/company/types';
import { ICompanyNewBranchBody } from 'src/components/organisms/CompanyComponents/CompanyStructure/types';
import { GroupTypes } from 'src/store/group/types';
import { IRenderBody } from 'src/core/components/types';

export namespace BranchPageTypes {
  export interface IProps {
    branchById?: BranchesTypes.IRenderProps;
    branchByIdLoading?: boolean;
    company?: CompaniesTypes.IRenderProps;
    companyLoading?: boolean;
    branches?: BranchesTypes.IRenderProps[];
    branchesLoading?: boolean;
    updatedBranchState?: IRenderBody;
    deletedBranch?: IRenderBody;
    groups?: GroupTypes.IRenderProps[];
    getBranches?(companyId: number): void;
    getBranchById?(branchId: number, companyId: number): void;
    getCompanyById?(companyId: number): void;
    updateBranch?(branchId: number, companyId: number, branch: ICompanyNewBranchBody): void;
    deleteBranch?(branchId: number, companyId: number, inheritanceBranchId?: number): void;
    getGroups?(params: GroupTypes.IQueryParams, callbacks?: any): void;
    clearFilteredEmployees?(): void;
    clearChangedBranchState?(): void;
  }
}
