import { CourseDetailTypes } from 'src/store/course/types';
import { GroupTypes } from 'src/store/group/types';
import { IOption } from 'src/components/molecules/Select/types';
import { Action } from 'src/pages/AdminPages/Course/CourseDetailPage/types';

export declare namespace ContentCoursesTypes {
  export interface IProps {
    courses?: CourseDetailTypes.IRenderProps[];
    coursesTotal?: number;
    coursesLoading?: boolean;
    groups?: GroupTypes.IRenderProps[];

    getGroups?(params: GroupTypes.IQueryParams, callbacks?: any): void;
    getCoursesByAdmin?(companyId: number, params: CourseDetailTypes.IAdminQuery, callbacks?: any): void;
    handleSelectedIds(ids: number[]): void;
    coursesToDraft?(courseIds: number[], callbacks?: any): void;
    coursesToPublish?(courseIds: number[], callbacks?: any): void;
    deleteCourses?(ids: number[], callbacks?: any): void;
  }

  export interface IFilter {
    page?: number;
    pageSize?: number;
    endTime?: string;
    startTime?: string;
    groups?: IOption[];
    status?: IOption;
    keyword?: string;
    orderField?: string;
    orderDirection?: string;
  }

  export interface ISelectedData {
    id: number;
    action: Action;
    name: string;
  }
}
