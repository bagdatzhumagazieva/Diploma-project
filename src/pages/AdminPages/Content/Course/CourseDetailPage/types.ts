import { CourseDetailTypes } from 'src/store/course/types';

export declare namespace CourseDetailPageTypes {
  export interface IProps {
    course?: CourseDetailTypes.IRenderProps;
    loading?: boolean;

    getCourseByAdmin?(companyId: number, courseId: number, callbacks?: any): void;
    deleteCourse?(courseId: number, callbacks?: any): void;
    coursesToDraft?(courseIds: number[], callbacks?: any): void;
    coursesToPublish?(courseIds: number[], callbacks?: any): void;
    clearAdminCourse?(): void;
  }
}

export enum Action {
  PUBLISH = 1,
  DRAFT,
  DELETE,
  CHANGE,
}
