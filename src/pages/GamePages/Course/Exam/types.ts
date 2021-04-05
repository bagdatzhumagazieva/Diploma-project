import { ModuleTypes } from 'src/store/module/types';
import { CourseDetailTypes } from 'src/store/course/types';
import { EmploymentTypes } from 'src/store/employment/types';
import { CourseCompleteTypes } from 'src/store/courseComplete/types';

export namespace ExamTypes {
  export interface IProps {
    moduleList?: ModuleTypes.IModuleListItem[];
    course?: CourseDetailTypes.IRenderProps;
    employment?: EmploymentTypes.IRenderProps;

    getModuleList?(companyId: number, courseId: number, callbacks?: any): void;
    getCourseDetail?(companyId: number, courseId: number): void;
    startCourseTestComplete?(
      courseId: number, bodyParams: CourseCompleteTypes.ITestCompleteBody, callbacks?: any,
    ): void;
  }
}
