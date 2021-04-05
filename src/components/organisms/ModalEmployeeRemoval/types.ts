import { ModalInvitationExcelTypes } from 'src/components/organisms/ModalInvitation/ModalInvitationExcel/types';

export namespace ModalEmployeeRemovalTypes {
  export interface IProps {
    onDiscard?(): void;
    onRemoveEmployees?(employeeIds: number[]): void;
    onRemoveExcelEmployees?(employees: ModalInvitationExcelTypes.IEmployeeExcelDataObjectsArray): void;
    clearCreatedInvitationsState?(): void;
  }
}
