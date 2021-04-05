import { CompaniesTypes } from 'src/store/company/types';
import { IGroupsBodyParams } from 'src/components/organisms/CompanyComponents/CompanyGroups/types';

export namespace CompanyPageTypes {
  export interface IProps {
    company?: CompaniesTypes.IRenderProps;
    companyLoading?: boolean;
    getCompanyById?(companyId: number): void;
    getGroups?(groupsBodyParams: IGroupsBodyParams): void;
    deleteGroup?(groupId: number[], inheritanceGroupId?: number, callbacks?: any): void;
  }
}
