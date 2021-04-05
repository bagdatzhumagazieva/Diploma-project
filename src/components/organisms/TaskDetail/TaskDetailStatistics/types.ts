import { TaskStatisticsByGroups } from 'src/store/task/types';

export declare namespace TaskDetailStatisticTypes {
  export interface IProps {
    groupStatistics?: TaskStatisticsByGroups.IRender;
    groupStatisticsLoading?: boolean;
    children?: JSX.Element;
    companyId: number;
    taskId: number;
    onGetTaskStatisticByGroups?(taskId: number, companyId: number): void;
  }
}
