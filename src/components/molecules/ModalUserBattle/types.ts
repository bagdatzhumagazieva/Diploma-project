import { BattlesEmployeeTypes } from 'src/store/battles/types';

export namespace ModalUserBattleTypes {
  export interface IProps {
    id: number;
    companyId: number;
    battleData?: BattlesEmployeeTypes.IRenderProps;
    battleDataLoading?: boolean;
    buttonAction?: {
      title: string;
      onCLick?(): void;
    };

    getEmploymentBattles?(companyId: number, employeeId: number): void;
  }
}
