import { GameCreationEditionTypes } from 'src/components/organisms/GameCreationEdition/types';

export namespace TrialTypes {
  export interface IProps extends GameCreationEditionTypes.ITask {
    index: number;
    className?: string;
    disabled?: boolean;
    onCardAddClick(): void;
    onCardDeleteSubmit(cardId: number): void;
  }
}
