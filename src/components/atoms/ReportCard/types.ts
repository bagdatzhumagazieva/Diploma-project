import { StatisticsPerformanceDownloadTypes, StatisticsErrorReportDownloadTypes } from 'src/store/statistics/types';

export namespace ReportCardTypes {
  export interface IProps {
    reportType: 'performance' | 'error';
    appearance?: 'wide' | 'default';
    id: number;
    createdAt: string;
    type: 'GAME' | 'COURSE';
    imageThumbnail: string;
    minutesToFinish: number;
    name: string;
    numberOfViews: number;
    percentAvg: number;

    downloadPerformance(params: StatisticsPerformanceDownloadTypes.IRequestProps): void;
    downloadErrorReport(params: StatisticsErrorReportDownloadTypes.IRequestProps): void;
    downloadedPerformanceLoading: boolean;
    downloadedPerformanceWithStart: { entityId: number };
    downloadedErrorReportLoading: boolean;
    downloadedErrorReportWithStart: { entityId: number };
  }
}
