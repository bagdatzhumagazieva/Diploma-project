import { CourseDetailTypes, CourseTypes, ProgressStatus } from 'src/store/course/types';
import { ITag } from 'src/components/organisms/AdminTags/types';
import { Action } from 'src/pages/AdminPages/Course/CourseDetailPage/types';

export namespace CourseDetailContainerTypes {
  export interface IProps extends CourseTypes.IRenderProps, IVariant {
    className?: string;
    rating?: number;
    minutesToFinish?: number;
    createdAt?: string;
    modules?: CourseDetailTypes.IModuleRender[];
    tags?: ITag[];
    curUrl?: string;
    loading?: boolean;
    userRating?: number;
    examStatus?: ProgressStatus;
    numberOfViews?: number;
    finalResultCertificateId?: number;
  }

  export interface ICard {
    id: number;
    name: string;
    status?: undefined;
  }

  export interface IVariant {
    variant: 'admin' | 'web' | 'preview';
  }
}

export interface IActionData {
  title: string;
  iconJSX: any;
  color: string;
  callback?(): void;
  mode: Action;
}
