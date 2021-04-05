import { CourseDetailContainerTypes } from 'src/components/organisms/CourseDetail/types';
import { CourseDetailTypes, ProgressStatus } from 'src/store/course/types';

export namespace CardModuleTypes {
  export interface IProps extends CourseDetailContainerTypes.IVariant {
    id: string;
    index: number;
    title: string;
    status: ProgressStatus;
    testStatus: ProgressStatus;
    cards?: CourseDetailTypes.ICardRender[];
    className?: string;
    courseId: number;
  }
}
