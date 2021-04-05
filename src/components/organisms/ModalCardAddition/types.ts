import { CategoryTypes } from 'src/store/category/types';
import { CardTypes, IGetCardsQueryParams } from 'src/store/card/types';
import { ICard } from 'src/components/molecules/CardInfomationBlock/types';

export namespace ModalCardAdditionTypes {
  export interface IProps {
    companyId: number;
    cardError?: string;

    cards?: CardTypes.IRenderProps[];
    cardsNextPage?: number | null;
    cardsCurPage?: number | null;
    cardsLoading?: boolean;

    categories?: CategoryTypes.ICategoryRenderProps[];
    categoriesNextPage?: number;
    categoriesLoading?: boolean;

    getCategories?(companyId: number, page?: number, pageSize?: number): void;
    getCards?(params: IGetCardsQueryParams): void;
    getSelectedCard?(card: ICard): void;
    clearCategoriesState?(): void;
  }
}
