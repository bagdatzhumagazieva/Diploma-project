import { ProgressStatus } from 'src/store/course/types';

export namespace ModuleCardListTypes {
  export interface IProps {
    type: 'card' | 'module';
    data: IItem[];
    loading: boolean;
    link: string;
    curId?: number;
    isTest?: boolean;
    testStatus?: ProgressStatus;
  }

  export interface IItem {
    name: string;
    id: string;
    status: ProgressStatus;
  }
}
