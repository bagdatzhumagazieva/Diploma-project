import { CourseDetailTypes } from 'src/store/course/types';

export namespace UserCoursesTypes {
  export interface IProps {
    userCourses?: CourseDetailTypes.IRenderProps[];
    userCoursesTotal?: number;
    userCoursesLoading?: boolean;
    getUserCourses?(params: CourseDetailTypes.IQueryProps): void;
  }
}
