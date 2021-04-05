import { RouteComponentProps } from 'react-router';
import { ProfileTypes } from 'src/store/profile/types';
import { EmploymentTypes } from 'src/store/employment/types';
import { CompaniesTypes } from 'src/store/company/types';
import { BattleStatus, BattleUserStatus } from 'src/core/enum';
import { BattleAggregatorTypes, BattlesEmployeeTypes } from 'src/store/battles/types';

export namespace BattlesTypes {
  export interface IProps extends RouteComponentProps {
    profile?: ProfileTypes.IRenderProps;
    employment?: EmploymentTypes.IRenderProps;
    company?: CompaniesTypes.IRenderProps;
    battles?: IBattle[];
    battlesAggregatorLoading?: boolean;
    battlesAggregator?: BattleAggregatorTypes.IRenderProps;
    createdBattleError?: string;

    createBattle?(data: BattlesEmployeeTypes.IBodyParams, companyId: number, callback?: any): void;
    changeBattleStatus?(battleId: number, companyId: number, status: string, callback?: any): void;
    getBattlesAggregator?(data: BattleAggregatorTypes.IQueryProps): void;
  }

  export interface IBattleAction {
    id: number;
    action: {
      title: string;
      onCLick?(): void;
    };
  }

  export interface IBattle {
    employmentId: number;
    rivalEmploymentId: number;
    rivalUserId: number;
    battleId: number;
    isCreator: boolean | null;
    status: BattleUserStatus;
    userAvatar?: string;
    rivalUserAvatar?: string;
    battleStatus: BattleStatus;
    createdDate: string;
    userFullName: string;
    rivalUserFullName: string;
    rewardAmount: number;
    finishedDateTime: string | null;
    imageUrl: string;
    imageThumbnailUrl: string;
    expiredHours: number;
    rubrics: { id: number, name: string }[];
  }
}
