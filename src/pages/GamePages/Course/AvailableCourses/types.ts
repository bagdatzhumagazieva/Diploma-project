import { CourseDetailTypes } from 'src/store/course/types';

export namespace AvailableCoursesPageTypes {
  export interface IProps {
    availableCourses?: CourseDetailTypes.IRenderProps[];
    availableCoursesTotal?: number;
    availableCoursesLoading?: boolean;
    getAvailableCourses?(params: CourseDetailTypes.IQueryProps): void;
  }
}
