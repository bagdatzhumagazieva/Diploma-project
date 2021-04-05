import { IBaseProps, IRenderBody } from 'src/core/components/types';
import { EmploymentTypes, IEmploymentBodyParams } from 'src/store/employment/types';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { SortDirection } from 'src/components/molecules/Table/types';
import { ILoadTypes } from 'src/core/store/types';
import { GroupTypes } from 'src/store/group/types';

export namespace TableEmployeesTypes {
  export interface IProps extends IBaseProps {
    employees: EmploymentTypes.IRenderProps[];
    branches: { branchesOptions: ITreeOption[], selectedTreeOption: ITreeOption };
    groups?: { groupsOptions?: ITreeOption[]};
    employeesLoading?: boolean;
    updateEmployeesActiveness?(employeesData: EmploymentTypes.IUpdateEmployeeBodyProps): void;
    updateEmployee?(employeesData: EmploymentTypes.IUpdateEmployeeBodyProps): void;
    changeEmployeesBranch?(employeesData: EmploymentTypes.IUpdateEmployeeBodyProps): void;
    deleteEmployees?(employeeIds: number[]): void;
    addOrRemoveEmployeesGroups?(
      employeesData: EmploymentTypes.IUpdateEmployeeBodyProps,
      operation: 'add' | 'delete',
    ): void;
    sendPasswordsToEmployees?(employeeIds: number[], companyId: number): void;
    onSort?(label: string, sortDirection: SortDirection): void;
    lastItemRef?: any;
    totalEmployees?: number;
    hideOptions?: boolean;
    handleSelectedEmployees?(employees: EmploymentTypes.IRenderProps[]): void;
    emptyDataDescription?: string;
  }
}

export namespace TableEmployeesWithPaginationTypes {
  export interface IProps {
    className?: string;
    employeesCount: number;
    branchId?: string;
    groupId?: string;
    companyId?: number;
    actionButtons?: JSX.Element;
    groupOptions?: GroupTypes.IRenderProps[];
    branches: { branchesOptions: ITreeOption[], selectedTreeOption: ITreeOption };
    groups?: { groupsOptions?: ITreeOption[]};
    employees?: ILoadTypes<EmploymentTypes.IRenderProps[]>;
    changedEmployeeBranch?: IRenderBody;
    deletedEmployee?: IRenderBody & { fromRemovalModal?: boolean };
    updatedEmployeeActiveness?: IRenderBody;
    addOrRemoveEmployeesGroupsState?: IRenderBody;
    sentPasswordsToEmployeesState?: IRenderBody;
    updatedEmployee?: IRenderBody;
    getEmployees?(params: IEmploymentBodyParams): void;
    clearChangedEmployeesState?(): void;
  }
}
