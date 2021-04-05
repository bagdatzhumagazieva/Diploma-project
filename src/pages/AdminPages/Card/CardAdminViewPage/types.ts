import { ILoadTypes } from 'src/core/store/types';
import { CardTypes } from 'src/store/card/types';
import { IRenderBody } from 'src/core/components/types';

export namespace CardAdminViewPageTypes {
  export interface IProps {
    deletedCardState?: IRenderBody;
    fullCardState?: ILoadTypes<CardTypes.IFullRenderProps>;
    getCardFull?(cardId: number): void;
    deleteCard?(cardId: number): void;
  }
}
