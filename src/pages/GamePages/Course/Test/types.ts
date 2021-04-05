import { CourseCompleteTypes } from 'src/store/courseComplete/types';
import { EmploymentTypes } from 'src/store/employment/types';
import { QuestionStatus } from 'src/pages/GamePages/Course/Test/consts';
import { CourseDetailTypes, ProgressStatus } from 'src/store/course/types';

export namespace ModuleTestTypes {
  export interface IProps {
    cardList?: CourseDetailTypes.ICardDetailRender[];
    cardListLoading?: boolean;
    employment?: EmploymentTypes.IRenderProps;
    course?: CourseDetailTypes.IRenderProps;
    testStatus?: ProgressStatus;

    startModuleTestComplete?(
      courseId: number, moduleId: number, bodyParams: CourseCompleteTypes.ITestCompleteBody, callbacks?: any,
    ): void;
    getTestQuestionAnswer?(moduleTestCompleteId: number, attemptQuestionId: number, callbacks?: any): void;
    getModuleCardList?(companyId: number, moduleId: number, callbacks?: any): void;
    getCourseDetail?(companyId: number, courseId: number): void;
  }

  export interface IModuleData {
    id: string;
    name: string;
    isFinalModule?: boolean;
  }

  export interface ICurNextModule {
    currentModule: IModuleData | undefined;
    nextModule: IModuleData | undefined;
  }

  export interface ModalTestResult {
    type: 'course' | 'module';
    isSuccess: boolean;
    courseId: number;
    curModuleId?: number;
    isLastModule?: boolean;
    nextModuleId?: string;
    curModuleFirstCardId?: number;
  }
}

export namespace CountDownTimerTypes {
  export interface IProps {
    timeLimit: number;
    handleTimeUp?(): void;
    status: QuestionStatus;
  }
}
