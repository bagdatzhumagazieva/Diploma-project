import { IRenderBody } from 'src/core/components/types';
import { CardTypes } from 'src/store/card/types';

export namespace CardCreationPageTypes {
  export interface IProps {}
}

export namespace ModalCardCreationEditionTypes {
  export interface IProps {
    handleCloseClick?(): void;
    handleCreationFinished?(data: IRenderBody<CardTypes.IRenderProps>): void;
    type: 'create' | 'edit';
    id?: number;
    isQuizCard?: boolean;
  }
}
