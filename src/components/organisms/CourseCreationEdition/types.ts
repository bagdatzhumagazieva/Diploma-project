import { CourseTypes } from 'src/store/course/types';
import { ModuleTypes } from 'src/store/module/types';
import { TagsTypes } from 'src/store/tag/types';

export namespace CourseCreationTypes {
  export interface IProps {
    companyId: number;
    type: 'create' | 'edit';
    course?: CourseTypes.IRenderProps;
    courseId?: number;
    state?: any;
    modules?: ModuleTypes.IRenderProps[];
    tagsByIds?: TagsTypes.IResponseProps[];

    getModules?(courseId: number, companyId: number, callbacks?: any): void;
    getCourse?(courseId: number, callbacks?: any): void;
    createCourse?(bodyParams: CourseTypes.IRenderProps, callbacks?: any): void;
    updateCourse?(courseId: number, bodyParams: CourseTypes.IRenderProps, callbacks?: any): void;
    coursesToDraft?(courseIds: number[], callbacks?: any): void;
    coursesToPublish?(courseIds: number[], callbacks?: any): void;
    createModules?(courseId: number, modules: ModuleTypes.IRenderProps[], callbacks?: any): void;
    updateModules?(courseId: number, modules: ModuleTypes.IRenderProps[], callbacks?: any): void;
    deleteModules?(courseId: number, moduleIds: number[], callbacks?: any): void;
    getTagsByIds?(params: TagsTypes.IQueryParams, callback?: any): void;
    deleteCourse?(id: number, callbacks?: any): void;
    clearCardsState?(): void;
    clearCourse?(): void;
  }

  export interface ICardActionType {
    type: 'create' | 'edit';
    moduleId: string;
    cardId?: number;
    cardIndex?: number;
  }
}
