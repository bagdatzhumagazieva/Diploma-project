import { InvitationTypes } from 'src/store/invitation/types';
import { ILoadTypes } from 'src/core/store/types';

export namespace ModalInvitationExcelTypes {
  export interface IProps {
    excelInvitationListState?: ILoadTypes<any>;
    onDiscard?(): void;
    onUploadExcelInvitation?(file: File): void;
    onSendExcelInvitations?(employees: IEmployeeExcelDataObjectsArray): void;
  }

  export interface IEmployeeExcelDataObjectsArray {
    [id: string]: InvitationTypes.IInvitationExcelRenderProps;
  }
}
