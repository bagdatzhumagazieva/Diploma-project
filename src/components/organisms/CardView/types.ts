import { CardTypes } from 'src/store/card/types';
import { ITag } from 'src/components/organisms/AdminTags/types';
import { RatingTypes } from 'src/store/rate/types';

export namespace CardViewTypes {
  export interface IProps {
    card?: ICard;
    className?: string;
    type?: 'web' | 'admin';
    loading?: boolean;
    isShowCardImage?: boolean;
    rating?: number;

    onEndClick?(): void;
    clearRating?(): void;
    toggleCardFavourite?(cardId: number, callback?: any): void;
    getMyRating?(companyId: number, uuid: string, callbacks?: any): void;
    createRating?(data: RatingTypes.ICreateBody, callbacks?: any): void;
  }

  export interface ICard {
    categoryId: string | null;
    category: CardTypes.IRenderCategory | null;
    content: string;
    description: string;
    id: number;
    isKnowledge: boolean;
    isFavourite: boolean;
    minutesToFinish: number;
    name: string;
    tags: ITag[];
    uuid: string;
    imageUrl?: string;
    date?: string;
  }

  export interface IRate {
    newVal?: number;
    savedVal?: number;
  }
}
