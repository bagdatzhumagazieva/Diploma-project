import { CourseDetailTypes } from 'src/store/course/types';
import { IOption } from 'src/components/molecules/Select/types';

export namespace CoursesContainerTypes {
  export interface IProps {
    title: string;
    pageSize?: number;
    companyId?: number;
    courses: CourseDetailTypes.IRenderProps[];
    total: number;
    loading: boolean;

    setCoursesParams(page: number, filter: IOption, tagIds: number[]): void;
    addCourseToFavorite?(courseId: number, callbacks?: any): void;
    deleteCourseFromFavorite?(courseId: number): void;
  }
}
