import { EmploymentTypes, IEmploymentBodyParams } from 'src/store/employment/types';
import { IOption } from 'src/components/molecules/Select/types';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { ILoadTypes } from 'src/core/store/types';

export namespace ModalEmployeesAdditionToGroupOrBranchTypes {
  export interface IProps {
    companyId?: number;
    type: 'branch' | 'groups';
    groupsOptions: IOption[];
    curGroupId?: number;
    branches: { branchesOptions: ITreeOption[], selectedTreeOption: ITreeOption };
    setUpdatedData?(employee: EmploymentTypes.IUpdateEmployeeBodyProps): void;
    handleCancelClick?(): void;
    employees?: ILoadTypes<EmploymentTypes.IRenderProps[]>;
    getEmployees?(params: IEmploymentBodyParams): void;
    addOrRemoveEmployeesGroups?(
      employeesData: EmploymentTypes.IUpdateEmployeeBodyProps,
      operation: 'add' | 'delete',
    ): void;
    onSubmitClick?(): void;
    curBranchId?: number;
    changeEmployeesBranch?(employeesData: EmploymentTypes.IUpdateEmployeeBodyProps): void;
  }
}
