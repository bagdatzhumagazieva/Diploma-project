import { ModalInvitationExcelTypes } from 'src/components/organisms/ModalInvitation/ModalInvitationExcel/types';

export namespace EmployeesInvitationExcelTypes {
  export interface IProps {
    employees: ModalInvitationExcelTypes.IEmployeeExcelDataObjectsArray;
    onDeleteEmployee?(employeeId: string): void;
  }
}
