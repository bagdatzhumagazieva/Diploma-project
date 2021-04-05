import { CourseTypes } from 'src/store/course/types';

export namespace CourseStatisticsTypes {
  export interface IProps {
    users: IGroupUsers[];
    average: CourseTypes.IAverage[];
    pieChartData: CourseTypes.IGroupData[];
  }

  export interface IGroupUsers {
    groupId: number;
    name: string;
    total: number;
    completed: number;
  }

  export interface IOptions {
    title: string;
    value: number;
    color: string;
    label?: string;
  }

  export interface IStatisticsState {
    isGroupsImportant: boolean | undefined;
    isUserImportant: boolean | undefined;
    isAverageImportant: boolean | undefined;
  }
}
