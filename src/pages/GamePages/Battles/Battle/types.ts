import { RouteComponentProps } from 'react-router';
import { AttemptBattleTypes, BattleTestTypes } from 'src/store/battles/types';
import { CourseCompleteTypes } from 'src/store/courseComplete/types';
import { ProfileTypes } from 'src/store/profile/types';

export namespace BattlePageTypes {
  export interface IProps extends RouteComponentProps{
    battleTests?: BattleTestTypes.IRenderProps;
    battleLoading?: boolean;
    attemptBattleResponse?: AttemptBattleTypes.IRenderProps[];
    profile?: ProfileTypes.IResponseProps;
    attemptBattleLoading?: boolean;
    battleTestsError?: string;

    clearAttemptBattle?(): void;
    createBattleTest?(data: CourseCompleteTypes.IQuestionCompleteBody, battleId: number, companyId: number,
                      callback?: any): void;
    getBattleStatus?(battleId: number, companyId: number, callback?: any): void;
    getBattleTest?(companyId: number, battleId: number, callback?: any): void;
  }
}
