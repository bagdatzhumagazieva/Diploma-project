import { RouteComponentProps } from 'react-router';
import { TaskAction } from 'src/components/organisms/ContentComponents/ContentTasks/consts';
import { TaskTypes } from 'src/store/task/types';
import { GroupTypes } from 'src/store/group/types';

export namespace ContentTasksTypes {
  export interface IProps extends RouteComponentProps {
    tasks?: TaskTypes.IRenderAdmin;
    taskLoading?: boolean;
    loadingDeletedTask?: boolean;
    companyId: number;
    groups?: GroupTypes.IRenderProps[];
    taskData: TaskTypes.IRenderAdminExercise[];

    getGroups?(params: GroupTypes.IQueryParams): void;
    updateTask?(bodyParams: TaskTypes.IBodyProps, taskId: number, callback?: any): void;
    deleteTask?(taskIds: number[], callback?: any): void;
    setSelectedTaskData(data: number[]): void;
    getAdminTasks?(bodyParams: TaskTypes.IGetTaskBodyParams, callback?: any): void;
    setTaskData(data: TaskTypes.IRenderAdminExercise[]): void;
  }
  export interface ISelectedData {
    id: number;
    action: TaskAction;
    name: string;
  }
}
