import { TaskTypes } from 'src/store/task/types';
import { CourseDetailTypes } from 'src/store/course/types';

export namespace ContentPageTypes {
  export interface IProps {
    deleteTask?(taskId: number[], callback?: any): void;
    deleteCourses?(ids: number[], callbacks?: any): void;
    getAdminTasks?(bodyParams: TaskTypes.IGetTaskBodyParams, callbacks?: any): void;
    getCoursesByAdmin?(companyId: number, params: CourseDetailTypes.IAdminQuery, callbacks?: any): void;
  }

  export interface ISelectedData {
    ids: number[];
    type: 'course' | 'task';
  }
}
