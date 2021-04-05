import { IUserTask,  IUserTaskType } from 'src/components/atoms/Cards/CardTask/types';
import { IBaseProps } from 'src/core/components/types';
import { ActivitiesTypes } from 'src/store/activities/types';

export namespace UserActivityTasksTypes {
  export interface IProps extends IBaseProps {
    companyId?: number;
    statusOptions: IUserStatus[];
    total?: number;
    activitiesLoading?: boolean;
    activities?:ActivitiesTypes.IRenderProps[];
    activitiesCount?: ActivitiesTypes.IRenderActivitiesCountProps;
    getActivitiesCount?(): void;
    getActivities?(params: ActivitiesTypes.IQueryProps): void;
  }
}

export namespace TasksWithTypesTypes {
  export interface IProps extends IBaseProps {
    typeOptions: IUserTaskType[];
    tasks: IUserTask[];
    curTaskStatus: string;
    onClickStatusByType?(status: string): void;
  }
}

export interface IUserStatus {
  status: string;
  title: string;
}

export interface IUserTaskWithType {
  type: string;
  tasks: IUserTask[];
}
