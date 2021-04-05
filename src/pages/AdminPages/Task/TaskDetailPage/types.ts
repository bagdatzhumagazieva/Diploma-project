import { RouteComponentProps } from 'react-router';
import {
  TaskTypes,
  TaskAggregatorAdminTypes, TaskAggregatorGroupTypes, TaskAggregatorTypes,
} from 'src/store/task/types';

export namespace TaskDetailTypes  {
  export interface IProps extends RouteComponentProps  {
    loadingTask?: boolean;
    loadingDeletedTask?: boolean;
    updatedLoading?: boolean;
    taskStatisticsLoading?: boolean;
    detailTask?: TaskAggregatorTypes.IRenderDetailProps;
    taskStatistics?: TaskAggregatorAdminTypes.IRenderProps;
    taskGroups?: TaskAggregatorGroupTypes.IRenderProps[];

    clearDetailTask?(): void;
    deleteTask?(taskIds: number[], callback?: any): void;
    updateTask?(bodyParams: TaskTypes.IBodyProps, taskId: number, callback?: any): void;
    onGetDetailTask?(taskId: number): void;
    onGetTaskStatistics?(params: TaskAggregatorAdminTypes.IQueryProps): void;
    onGetTaskStatisticsByGroup?(taskId: number, companyId: number): void;
  }
}
