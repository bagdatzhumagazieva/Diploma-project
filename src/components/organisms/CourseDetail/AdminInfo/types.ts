import { ITag } from 'src/components/organisms/AdminTags/types';
import { CourseDetailContainerTypes } from 'src/components/organisms/CourseDetail/types';
import { CourseDetailTypes, CourseTypes, ProgressStatus } from 'src/store/course/types';

export namespace AdminInfoTypes {
  export interface IProps extends CourseDetailContainerTypes.IVariant {
    description?: string | null;
    certificateImageUrl?: string | null;
    certificateImgUrl?: string;
    tags?: ITag[];
    modules?: CourseDetailTypes.IModuleRender[];
    courseUuid: string;
    courseId: number;
    courseStatistics?: CourseTypes.IStatisticsRender;
    examStatus: ProgressStatus;
    finalResultCertificateId?: number;

    getCourseStatistics?(courseId: number, params: CourseTypes.IStatisticsQuery, callbacks?: any): void;
  }
}
