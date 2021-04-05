import { StatisticsErrorReportTypes } from 'src/store/statistics/types';

export declare namespace ReportErrorPageTypes {
  export interface IProps {
    getErrorReports(params: StatisticsErrorReportTypes.IRequestProps): void;
    errorReports: StatisticsErrorReportTypes.IRenderProps;
    errorReportsLoading: boolean;
  }
}
