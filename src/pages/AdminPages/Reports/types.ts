import { StatisticsCountTypes } from 'src/store/statistics/types';

export declare namespace ReportsPageTypes {
  export interface IProps {
    getDataCount(companyId: number): void;
    dataCount: StatisticsCountTypes.IRenderProps;
    dataCountLoading: boolean;
  }
}
export enum ReportColors {
  YELLOW = '#FECE60',
  GREEN = '#07C498',
  RED = '#FE4957',
  BLUE = '#5C33CD',
}
