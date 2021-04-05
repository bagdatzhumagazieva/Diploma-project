import { IOption } from 'src/components/molecules/Select/types';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';

export namespace ModalCreateGroupTypes {
  export interface IProps {
    groups?: IOption[];
    branches?: ITreeOption[];
    errorMessage?: string;
    onClickCreateGroup?(data: ICreateGroupData): void;
    onCLickCreateParametricGroup?(data: ICreateParametricData): void;
    onClickCancel?(): void;
  }

  export interface ICreateGroupData {
    description: string;
    name: string;
  }

  export interface ICreateParametricData {
    name?: string;
    description?: string;
    gender?: string;
    age_from?: number;
    age_to?: number;
    duration_in_system: string;
    branch_id: number;
    group_ids: number[];
  }

  export interface IErrors {
    branchError: string;
    groupError: string;
    durationError: string;
  }
}
