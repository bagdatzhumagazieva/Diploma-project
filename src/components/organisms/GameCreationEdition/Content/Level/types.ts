import { GameCreationEditionTypes } from 'src/components/organisms/GameCreationEdition/types';

export namespace LevelTypes {
  export interface IProps extends GameCreationEditionTypes.ILevel {
    index: number;
    className?: string;
    disabled?: boolean;

    handleEditedIndex(index: number): void;
    handleCardAddClick(trialIndex: number, levelIndex: number): void;
    handleCardDelete(levelIndex: number, trialIndex: number, cardId: number): void;
  }
}

export namespace LevelAdditionEditionTypes {
  export interface IProps {
    type: 'create' | 'edit';
    data?: IData;
    onActionClick(action: 'cancel' | 'submit', data?: IData, type?: 'create' | 'edit'): void;
    isLevel?: boolean;
    levelIndex?: number;
    isHw?: boolean;
  }

  export interface IData {
    id: string;
    name: string;
    description: string;
  }
}
