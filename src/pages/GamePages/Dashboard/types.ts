import { ProfileTypes } from 'src/store/profile/types';
import { TaskAggregatorTypes } from 'src/store/task/types';
import { CourseDetailTypes } from 'src/store/course/types';
import { EmploymentTypes } from 'src/store/employment/types';
import { MediaTypes } from 'src/store/media/types';
import { CompaniesTypes, CompanyNews } from 'src/store/company/types';
import { IBattleTypes } from 'src/components/molecules/Cards/CardBattle/types';

export namespace DashboardPageTypes {
  export interface IProps {
    profile?: ProfileTypes.IRenderProps;
    exercises?:TaskAggregatorTypes.IRenderProps[];
    courses?: CourseDetailTypes.IRenderProps[];
    coursesTotal?: number;
    employment?: EmploymentTypes.IRenderProps;
    uploadedCompanyBannerData?: MediaTypes.IRenderProps;
    news?: CompanyNews.IRenderProps[];
    company?: CompaniesTypes.IRenderProps;

    // todo add battles
    battles?: IBattleTypes[];

    onMakeFavorite?(taskId: number, callback?: any): void;
    onDeleteFavorite?(taskId: number, callback?: any): void;
    getExercises?(params: TaskAggregatorTypes.IQueryProps): void;
    getAllCourses?(params: CourseDetailTypes.IQueryProps, callbacks?: any): void;
    onGetNews?(companyId: number): void;
    addCourseToFavorite?(courseId: number, callbacks?: any): void;
    deleteCourseFromFavorite?(courseId: number): void;
    getCompanyById?(companyId: number): void;
  }
}
