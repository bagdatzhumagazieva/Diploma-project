import { CourseDetailTypes } from 'src/store/course/types';

export namespace CoursePageTypes {
  export interface IProps {
    course?: CourseDetailTypes.IRenderProps;
    loading?: boolean;
    getCourseDetail?(companyId: number, courseId: number): void;
    clearCourseDetail?(): void;
  }
}
