import { StatisticsPerformanceTypes } from 'src/store/statistics/types';

export declare namespace ReportPerformancePageTypes {
  export interface IProps {
    getPerformance(params: StatisticsPerformanceTypes.IRequestProps): void;
    performance: StatisticsPerformanceTypes.IRenderProps;
    performanceLoading: boolean;
  }
}
