import { CourseDetailTypes, ProgressStatus } from 'src/store/course/types';

export namespace ModulePageTypes {
  export interface IProps {
    courseModule?: CourseDetailTypes.IModuleDetailRender;
    cardList?: CourseDetailTypes.ICardDetailRender[];
    cardListLoading?: boolean;
    course?: CourseDetailTypes.IRenderProps;
    testStatus?: ProgressStatus;

    getCourseModule?(companyId: number, moduleId: number, callbacks?: any): void;
    getCourseDetail?(companyId: number, courseId: number): void;
    getModuleCardList?(companyId: number, moduleId: number, callbacks?: any): void;
  }

  export interface IModuleData {
    description: string;
    imageUrl?: string;
  }

  export interface ICardGroup {
    courseId: number;
    moduleId: number;
    cards: CourseDetailTypes.ICardDetailRender[];
  }
}
