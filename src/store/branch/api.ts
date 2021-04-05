import { API } from 'src/constants/server';
import { stdApiDELETE, stdApiGET, stdApiPOST, stdApiPUT } from 'src/store/defaultApi';
import { ICompanyNewBranchBody } from 'src/components/organisms/CompanyComponents/CompanyStructure/types';

const getBranchesUrl = `${API}branches/`;

export const getBranches = (companyId: number, token: string) => (
  stdApiGET({ token, url: `${getBranchesUrl}?company_id=${companyId}` })
);

export const addBranch = (data: ICompanyNewBranchBody, companyId: number, token: string) => (
  stdApiPOST({ token, data, url: `${getBranchesUrl}?company_id=${companyId}` })
);

export const getBranchById = (branchId: number, companyId: number, token: string) => (
  stdApiGET({ token, url: `${getBranchesUrl}${branchId}?company_id=${companyId}` })
);

export const updateBranch = (branchId: number, companyId: number, data: ICompanyNewBranchBody, token: string) => (
  stdApiPUT({ token, data, url: `${getBranchesUrl}${branchId}?company_id=${companyId}` })
);

export const deleteBranch = (branchId: number, companyId: number, token: string, inheritanceBranchId?: number) => (
  stdApiDELETE({ token, url: `${getBranchesUrl}${branchId}?company_id=${companyId}${inheritanceBranchId ? `&inheritance_branch_id=${inheritanceBranchId}` : '' }` })
);
