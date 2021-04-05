import { CourseDetailTypes } from 'src/store/course/types';
import { EmploymentTypes } from 'src/store/employment/types';

export namespace EducationTypes {
  export interface IProps {
    userCourses?: CourseDetailTypes.IRenderProps[];
    userCoursesTotal?: number;
    availableCourses?: CourseDetailTypes.IRenderProps[];
    availableCoursesTotal?: number;

    getUserCourses?(params: CourseDetailTypes.IQueryProps): void;
    getAvailableCourses?(params: CourseDetailTypes.IQueryProps): void;
  }
}

export namespace EducationCoursesTypes {
  export interface IProps {
    userCourses: CourseDetailTypes.IRenderProps[];
    userCoursesTotal: number;
    availableCourses: CourseDetailTypes.IRenderProps[];
    availableCoursesTotal: number;
    employment?: EmploymentTypes.IRenderProps;

    addCourseToFavorite?(courseId:number, callbacks?: any): void;
    deleteCourseFromFavorite?(courseId: number): void;
  }
}
