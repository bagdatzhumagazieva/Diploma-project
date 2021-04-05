import { GameCreationEditionTypes } from 'src/components/organisms/GameCreationEdition/types';

export namespace HomeworkTypes {
  export interface IProps extends GameCreationEditionTypes.IHomework {
    index: number;
    className?: string;
    disabled?: boolean;
  }
}
