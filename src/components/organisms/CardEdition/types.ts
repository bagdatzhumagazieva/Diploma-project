import { CategoryTypes } from 'src/store/category/types';
import { ILoadTypes } from 'src/core/store/types';
import { CardTypes } from 'src/store/card/types';
import { IRenderBody } from 'src/core/components/types';

export namespace CardEditionTypes {
  export interface IProps {
    cardId: number;
    categories?: CategoryTypes.ICategoryRenderProps[];
    adminCardState?: ILoadTypes<CardTypes.IFullRenderProps>;
    isModal?: boolean;
    isQuizCard?: boolean;

    getCategories?(companyId: number): void;
    getCardAsAdmin?(cardId: number): void;
    handleCreationFinished?(data: IRenderBody<CardTypes.IRenderProps>): void;
    handleModalCloseClick?(): void;
  }
}
