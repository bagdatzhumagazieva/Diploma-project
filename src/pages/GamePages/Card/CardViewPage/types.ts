import { ILoadTypes } from 'src/core/store/types';
import { CardTypes } from 'src/store/card/types';

export namespace CardViewPageTypes {
  export interface IProps {
    fullCardState?: ILoadTypes<CardTypes.IFullRenderProps>;
    getCardFull?(cardId: number): void;
  }
}
