import { CategoryTypes } from 'src/store/category/types';
import { CardTypes } from 'src/store/card/types';
import { IRenderBody } from 'src/core/components/types';
import { CardGeneralInformationTypes } from 'src/components/organisms/CardCreation/CardGeneralInformation/types';
import { CardContentTypes } from 'src/components/organisms/CardCreation/CardContent/types';
import { CardVerificationQuestionTypes } from 'src/components/organisms/CardCreation/CardVerificationQuestion/types';
import { IOption } from 'src/components/molecules/Select/types';

export namespace CardCreationTypes {
  export interface IProps {
    type: 'create' | 'edit';
    categories?: CategoryTypes.ICategoryRenderProps[];
    isModal?: boolean;
    cardId?: number;
    createdCardState?: IRenderBody<CardTypes.IRenderProps>;
    deletedCardState?: IRenderBody;
    updatedCardState?: IRenderBody<CardTypes.IRenderProps>;
    isQuizCard?: boolean;
    questionId?: number;

    content?: CardContentTypes.IContent;
    generalInformation?: CardGeneralInformationTypes.IGeneralInformation;
    verificationQuestions?: CardVerificationQuestionTypes.IVerificationQuestionsTypes;
    selectedQuestionType?: IOption;

    getCategories?(companyId: number, page?: number, pageSize?: number): void;
    clearCategoriesState?(): void;
    createCard?(bodyParams: CardTypes.ICardBodyParams): void;
    updateCard?(cardId: number, bodyParams: CardTypes.ICardBodyParams): void;
    deleteCard?(cardId: number): void;
    handleCreationFinished?(data: IRenderBody<CardTypes.IRenderProps>): void;
    handleModalCloseClick?(): void;
  }
}
