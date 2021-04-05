import { EmploymentTypes } from 'src/store/employment/types';
import { IOption } from 'src/components/molecules/Select/types';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';

export namespace ModalEmployeeUpdateTypes {
  export interface IProps {
    employee: EmploymentTypes.IRenderProps;
    groupsOptions: IOption[];
    branches?: { branchesOptions: ITreeOption[], selectedTreeOption: ITreeOption };
    companyId: string;
    companyName?: string;
    setUpdatedData?(employee: EmploymentTypes.IUpdateEmployeeBodyProps): void;
    handleCancelClick?(): void;
  }
}
