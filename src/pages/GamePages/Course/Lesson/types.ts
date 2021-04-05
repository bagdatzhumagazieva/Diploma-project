import { CourseDetailTypes } from 'src/store/course/types';

export namespace LessonPageTypes {
  export interface IProps {
    cardList?: CourseDetailTypes.ICardDetailRender[];
    cardListLoading?: boolean;
    course?: CourseDetailTypes.IRenderProps;
    courseLoading?: boolean;
    module?: CourseDetailTypes.IModuleShortData;

    startCardComplete?(
      companyId:number, courseId: number, moduleId: number, cardId: number, callbacks?: any,
    ): void;
    finishCardComplete?(courseId: number, moduleId: number, completeId: number, callbacks?: any): void;
    getModuleCardList?(companyId: number, moduleId: number, callbacks?: any): void;
    getCourseDetail?(companyId: number, courseId: number): void;
  }

  export interface IModuleListRules {
    questionsTotal: number;
  }

  export interface ICardCompleteData {
    id: number;
    isFinished: boolean;
  }
}
