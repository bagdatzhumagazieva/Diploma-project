import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { IOption } from 'src/components/molecules/Select/types';
import { ModalInvitationManualTypes } from 'src/components/organisms/ModalInvitation/ModalInvitationManual/types';
import { ModalInvitationExcelTypes } from 'src/components/organisms/ModalInvitation/ModalInvitationExcel/types';

export namespace ModalInvitationTypes {
  export interface IProps {
    branches?: ITreeOption[];
    groups?: IOption[];
    onDiscard?(): void;
    onSendInvitations?(employees: ModalInvitationManualTypes.IEmployeeDataObjectsArray): void;
    onSendExcelInvitations?(employees: ModalInvitationExcelTypes.IEmployeeExcelDataObjectsArray): void;
    clearCreatedInvitationsState?(): void;
  }
}
