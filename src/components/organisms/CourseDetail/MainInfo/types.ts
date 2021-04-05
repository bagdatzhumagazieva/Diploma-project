import { ITag } from 'src/components/organisms/AdminTags/types';
import { CourseDetailContainerTypes } from 'src/components/organisms/CourseDetail/types';
import { CourseDetailTypes, ProgressStatus } from 'src/store/course/types';
import { RatingTypes } from 'src/store/rate/types';

export namespace MainInfoTypes {
  export interface IProps extends CourseDetailContainerTypes.IVariant {
    description?: string | null;
    certificateImageUrl?: string | null;
    certificateImgUrl?: string;
    tags?: ITag[];
    modules?: CourseDetailTypes.IModuleRender[];
    className?: string;
    courseUuid: string;
    courseId: number;
    userRating?: number;
    examStatus: ProgressStatus;
    finalResultCertificateId?: number;

    createRating?(data: RatingTypes.ICreateBody, callbacks?: any): void;
    handleRateAdd?(rating: number): void;
  }

  export interface ICardFinalExam extends CourseDetailContainerTypes.IVariant {
    examStatus: ProgressStatus;
    courseId: number;
    certificateId?: number;

    getCertificateDownload?:(id: number) => void;
  }
}
