import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { IOption } from 'src/components/molecules/Select/types';
import { ModalInvitationManualTypes } from 'src/components/organisms/ModalInvitation/ModalInvitationManual/types';

export namespace EmployeeInvitationTypes {
  export interface IProps {
    type: 'mail' | 'phone';
    groups?: IOption[];
    branches?: ITreeOption[];
    employee: ModalInvitationManualTypes.IEmployeeData;
    showErrors?: boolean;
    onEmployeeDataChange?(employee: ModalInvitationManualTypes.IEmployeeData): void;
    onDeleteEmployee?(employee: ModalInvitationManualTypes.IEmployeeData): void;
  }
}
