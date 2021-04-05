import { RouteComponentProps } from 'react-router';
import { TaskAggregatorTypes, TaskTypes } from 'src/store/task/types';

export namespace TaskCreationEditionTypes  {
  export interface IProps extends RouteComponentProps  {
    type: 'create' | 'edit';
    loadingCard?: boolean;
    loadingTask?: boolean;
    loadingDeletedTask?: boolean;
    loadingUpdatedTask?: boolean;
    taskId?: number;
    taskLoading?: boolean;
    detailTask?: TaskAggregatorTypes.IRenderDetailProps;

    clearCardsState?(): void;
    getTask?(taskId: number, callback?: any): void;
    updateTask?(bodyParams: TaskTypes.IBodyProps, taskId: number, callback?: any): void;
    deleteTask?(taskIds: number[], callback?: any): void;
    createTask?(bodyParams: TaskTypes.IBodyProps, companyId: number, callback?: any): void;
  }
}
