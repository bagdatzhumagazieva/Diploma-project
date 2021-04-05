import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { IOption } from 'src/components/molecules/Select/types';
import { EmployeesMultipleInvitationTypes } from 'src/components/molecules/EmployeeInvitation/EmployeeInvitationMultiple/types';
import { ModalInvitationManualTypes } from 'src/components/organisms/ModalInvitation/ModalInvitationManual/types';

export namespace EmployeesInvitationListTypes {
  export interface IProps {
    type: 'mail' | 'phone';
    groups?: IOption[];
    branches?: ITreeOption[];
    employees: ModalInvitationManualTypes.IEmployeeDataObjectsArray;
    showErrors?: boolean;
    onEmployeeDataChange?(employee: ModalInvitationManualTypes.IEmployeeData): void;
    onDeleteEmployee?(employee: ModalInvitationManualTypes.IEmployeeData): void;
    onCreateNewEmployee?(): void;
    onAddMultipleEmployees?(data: EmployeesMultipleInvitationTypes.IMultipleEmployeesParams): void;
  }
}
