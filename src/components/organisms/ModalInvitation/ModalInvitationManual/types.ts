import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { IOption } from 'src/components/molecules/Select/types';

export namespace ModalInvitationManualTypes {
  export interface IProps {
    branches?: ITreeOption[];
    groups?: IOption[];
    onDiscard?(): void;
    onSendInvitations?(employees: IEmployeeDataObjectsArray): void;
  }

  export interface IEmployeeDataObjectsArray {
    [id: string]: IEmployeeData;
  }

  export interface IEmployeeData {
    id: string;
    selectedBranch: ITreeOption;
    groups: IOption[];
    phone?: string;
    mail?: string;
    errors: {
      email: string;
      branch: string;
      phone: string;
    };
  }
}
