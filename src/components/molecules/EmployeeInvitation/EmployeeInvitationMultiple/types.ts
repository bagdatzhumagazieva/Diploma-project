import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { IOption } from 'src/components/molecules/Select/types';

export namespace EmployeesMultipleInvitationTypes {
  export interface IProps {
    type: 'mail' | 'phone';
    groups?: IOption[];
    branches?: ITreeOption[];
    onAddMultipleEmployees?(data: IMultipleEmployeesParams): void;
    onDiscardClick?(): void;
  }

  export interface IMultipleEmployeesParams {
    inputs?: string[];
    groups?: IOption[];
    selectedBranch?: ITreeOption;
  }
}
