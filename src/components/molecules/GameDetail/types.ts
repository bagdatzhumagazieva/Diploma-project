import { ICardGame } from 'src/components/molecules/Cards/CardGame/types';
import { Action } from 'src/pages/AdminPages/Course/CourseDetailPage/types';

export namespace GameDetailTypes {
  export interface IProps extends ICardGame, IVariant {
    modeActions?(mode: Action, id: number, name: string): void;
  }

  export interface IVariant {
    variant: 'admin' | 'web' | 'preview';
  }
}
