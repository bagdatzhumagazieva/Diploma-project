import { IBaseProps, IRenderBody } from 'src/core/components/types';
import { CompaniesTypes } from 'src/store/company/types';
import { BranchesTypes } from 'src/store/branch/types';

export namespace CompanyStructureTypes {
  export interface IProps extends IBaseProps {
    companyId: number;
    company?: CompaniesTypes.IRenderProps;
    companyLoading?: boolean;
    branches?: BranchesTypes.IRenderProps[];
    branchesLoading?: boolean;
    addedBranchState?: IRenderBody<{id: number}>;
    addBranchToCompany?(data: ICompanyNewBranchBody, companyId: number): void;
    getBranches?(companyId: number): void;
    getCompanyExcel?(companyId: number): void;
    clearChangedBranchState?(): void;
  }
}

export interface ICompanyNewBranchBody {
  name: string;
  is_active: boolean;
  parent_branch_id?: number;
  company_id?: number;
}
