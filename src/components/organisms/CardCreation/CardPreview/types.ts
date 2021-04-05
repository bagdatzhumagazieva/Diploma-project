import { CardGeneralInformationTypes } from 'src/components/organisms/CardCreation/CardGeneralInformation/types';
import { CardContentTypes } from 'src/components/organisms/CardCreation/CardContent/types';
import { CategoryTypes } from 'src/store/category/types';

export namespace CardPreviewTypes {
  export interface IProps {
    type: 'create' | 'edit';
    generalInformation: CardGeneralInformationTypes.IGeneralInformation;
    content: CardContentTypes.IContent;
    categoryPath?: (CategoryTypes.ICategoryRenderProps | null)[] | null;
    onBackClick?(): void;
    onPreviewStepCompleted?(): void;
  }
}
