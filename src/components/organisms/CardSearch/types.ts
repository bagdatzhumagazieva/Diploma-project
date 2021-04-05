import { CategoryTypes } from 'src/store/category/types';
import { CardTypes, IGetCardsQueryParams } from 'src/store/card/types';
import { ILoadTypes } from 'src/core/store/types';
import { IRenderBody } from 'src/core/components/types';
import { ITag } from 'src/components/organisms/AdminTags/types';

export namespace CardSearchTypes {
  export interface IProps {
    companyId?: number;
    asAdmin?: boolean;
    className?: string;
    additionalParams?: { sortBy?: string; isFavourite?: boolean, desc?: boolean, tagIds?: number[] };
    tags?: ITag[];
    categoriesData?: ILoadTypes<CategoryTypes.ICategoryRenderProps[]>;
    cardsData?: ILoadTypes<CardTypes.IRenderProps[]>;
    deletedCardState?: IRenderBody;

    getCategories?(companyId: number, page?: number, pageSize?: number): void;
    getCards?(params: IGetCardsQueryParams): void;
    deleteCard?(cardId: number): void;
    clearCardsState?(): void;
    clearAdminCardsData?(): void;
  }
}
