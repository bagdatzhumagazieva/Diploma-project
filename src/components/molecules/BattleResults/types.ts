import { BattleModalTypes } from 'src/pages/GamePages/Battles/Battle/ModalResult/types';

export declare namespace BattleResultsTypes {
  export interface IProps {
    questionNumber: number;
    curQuestionPos: number;
    time: number;
    avatar1?: string;
    avatar2?: string;
    donePercent: number;
    firstUserResult: IResult[];
    secondUserResult: IResult[];
    usersData?: BattleModalTypes.IProps;
  }

  export interface IResult {
    id: number;
    isCorrect: boolean;
  }
}
