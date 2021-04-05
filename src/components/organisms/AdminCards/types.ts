import { IRenderBody } from 'src/core/components/types';
import { CardTypes } from 'src/store/card/types';

export namespace AdminCardsTypes {
  export interface IProps {
    companyId?: number;
    createdCardState?: IRenderBody<CardTypes.IRenderProps>;
    deletedCardState?: IRenderBody;
    updatedCardState?: IRenderBody;

    clearCardState?(): void;
  }
}

export namespace UserCardsTypes {
  export interface IProps {}
}
