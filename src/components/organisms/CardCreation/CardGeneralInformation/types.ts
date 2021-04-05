import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { ITag } from 'src/components/organisms/AdminTags/types';
import { CategoryTypes } from 'src/store/category/types';

export namespace CardGeneralInformationTypes {
  export interface IProps {
    categories?: CategoryTypes.ICategoryRenderProps[];
    generalInformation: IGeneralInformation;
    isQuizCard?: boolean;

    getCategories?(companyId: number, page?: number, pageSize?: number): void;
    onGeneralInfoStepCompleted(info: IGeneralInformation): void;
    createCategory?(companyId: number, data: CategoryTypes.ICreateCategoryBody, callbacks?: any): void;
  }

  export interface IGeneralInformation {
    title: string;
    category?: ITreeOption;
    tags: ITag[];
    isIncludedInBase: boolean;
    imageUrl: string;
    imageThumbnailUrl: string;
  }

  export interface ICreateCategoryBody {
    name: string;
    parentCategory: ITreeOption;
  }
}
