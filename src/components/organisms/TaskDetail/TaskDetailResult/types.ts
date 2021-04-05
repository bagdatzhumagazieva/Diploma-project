import { EmployeeResultTypes, TaskAggregatorAdminTypes, TaskAggregatorTypes } from 'src/store/task/types';
import { IOption } from 'src/components/molecules/Select/types';

export namespace TaskDetailResultTypes {
  export interface IProps {
    selectedGroups: IOption[];
    usersData: TaskAggregatorAdminTypes.IUserRender[];
    setSelectedGroups(selectedGroups: IOption[]): void;
    companyId: number;
    taskId: number;
  }
  export interface GenInfoProps {
    companyId: number;
    taskId: number;
    selectedGroups:IOption[];
    taskStatistics?: TaskAggregatorAdminTypes.IRenderProps;
    setSelectedGroups(selectedGroups: IOption[]): void;
    onGetGroupExcelResult?(taskId: number, companyId: number, groupIds: number[]): void;
  }

  export interface EmployeeInfoProps {
    companyId: number;
    taskId: number;
    userResult?: TaskAggregatorTypes.IRenderDetailProps;
    taskStatistics?: TaskAggregatorAdminTypes.IRenderProps;
    usersData: TaskAggregatorAdminTypes.IUserRender[];
    onGetUserResult?(params: EmployeeResultTypes.IQueryProps): void;
  }
}
