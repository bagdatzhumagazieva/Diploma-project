import { IBaseProps, IRenderBody } from 'src/core/components/types';
import { CompaniesTypes } from 'src/store/company/types';
import { BranchesTypes } from 'src/store/branch/types';
import { GroupTypes } from 'src/store/group/types';
import { InvitationTypes } from 'src/store/invitation/types';

export namespace CompanyEmployeesTypes {
  export interface IProps extends IBaseProps {
    companyId: number;
    company?: CompaniesTypes.IRenderProps;
    branches?: BranchesTypes.IRenderProps[];
    groups?: GroupTypes.IRenderProps[];
    createdInvitationsState?: IRenderBody;
    removedEmployeesState?: IRenderBody & { fromRemovalModal: boolean };

    getGroups?(params: GroupTypes.IQueryParams): void;
    getBranches?(companyId: number): void;
    getEmployeesExcel?(): void;
    createEmployeesInvitations?(employees: InvitationTypes.IInvitationBodyParams[]): void;
    createExcelEmployeesInvitations?(
      companyId: number,
      employees: InvitationTypes.IInvitationExcelResponseProps[],
    ): void;
    removeEmployees?(employeeIds: number[], fromRemovalModal?: boolean): void;
    removeExcelEmployees?(
      companyId: number,
      employees: InvitationTypes.IInvitationBodyParams[],
    ): void;
    clearCreatedInvitationsState?(): void;
    clearRemovedEmployeesState?(): void;
  }
}
