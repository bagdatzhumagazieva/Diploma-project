import { RouteComponentProps } from 'react-router';
import { CategoryTypes } from 'src/store/category/types';
import { BranchesTypes } from 'src/store/branch/types';
import { GroupTypes } from 'src/store/group/types';
import { BattleEmployeesTypes, BattlesEmployeeTypes } from 'src/store/battles/types';

export namespace BattleInvitationTypes {
  export interface IProps extends RouteComponentProps{
    categories?: CategoryTypes.ICategoryRenderProps[];
    branches?: BranchesTypes.IRenderProps[];
    groups?: GroupTypes.IRenderProps[];
    battleEmployees?: BattleEmployeesTypes.IRenderProps[];
    battleEmployeesLoading?: boolean;
    categoriesLoading?: boolean;
    createdBattleError?: string;

    getBattleEmployees?(data: BattleEmployeesTypes.IQueryParams): void;
    getBranches?(companyId: number): void;
    getGroups?(params: GroupTypes.IQueryParams, callbacks?: any): void;
    createBattle?(data: BattlesEmployeeTypes.IBodyParams, companyId: number, callback?: any): void;
    getCategories?(companyId: number, page?: number, pageSize?: number, callbacks?: any): void;
  }

  export interface TableTypes {
    id: number;
    userFullName: string;
    branch: string;
    winAmount: number;
    lostAmount: number;
    imageThumbnailUrl: string;
    groups: {id: number, name: string}[];
  }
}
