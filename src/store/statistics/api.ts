import { API } from 'src/constants/server';
import { stdApiGET } from 'src/store/defaultApi';
import {
  StatisticsPerformanceDownloadTypes,
  StatisticsPerformanceTypes,
  StatisticsPerformanceDetailTypes,
  StatisticsErrorReportTypes,
  StatisticsErrorReportDownloadTypes,
  StatisticsReportErrorDetailTypes,
  StatisticsZealReportTypes,
  StatisticsZealReportDownloadTypes,
} from './types';

const statisticsUrl = `${API}statistics/`;

export const getDataCount = (companyId: number, token: string) => (
  stdApiGET({ token, url: `${statisticsUrl}count?company_id=${companyId}` })
);

export const getLearningActivity = (companyId: number, range: 'day' | 'week', token: string) => (
  stdApiGET({ token, url: `${statisticsUrl}learning_activity?company_id=${companyId}&range_type=${range}` })
);

export const getPerformance = (params: StatisticsPerformanceTypes.IRequestProps, token: string) => (
  stdApiGET({ token, url: `${statisticsUrl}performance?company_id=${params.companyId}${params.type ? `&entity_type=${params.type}` : ''}&keyword=${params.keyword}` })
);

export const downloadPerformance = (params: StatisticsPerformanceDownloadTypes.IRequestProps, token: string) => (
  stdApiGET({ token, url: `${statisticsUrl}performance/${params.entityId}/export?company_id=${params.companyId}${params.type ? `&entity_type=${params.type}` : ''}&entity_id=${params.entityId}` })
);

export const getPerformanceDetail = (params: StatisticsPerformanceDetailTypes.IRequestProps, token: string) => (
  stdApiGET({ token, url: `${statisticsUrl}performance/${params.entityId}?company_id=${params.companyId}${params.type ? `&entity_type=${params.type}` : ''}${params.branchId ? `&branch_id=${params.branchId}` : ''}${params.groupId ? `&group_id=${params.groupId}` : ''}` })
);

export const getErrorReports = (params: StatisticsErrorReportTypes.IRequestProps, token: string) => (
  stdApiGET({ token, url: `${statisticsUrl}error?company_id=${params.companyId}${params.type ? `&entity_type=${params.type}` : ''}&keyword=${params.keyword}` })
);

export const downloadErrorReport = (params: StatisticsErrorReportDownloadTypes.IRequestProps, token: string) => (
  stdApiGET({ token, url: `${statisticsUrl}error/${params.entityId}/export?company_id=${params.companyId}${params.type ? `&entity_type=${params.type}` : ''}&entity_id=${params.entityId}` })
);

export const getErrorDetail = (params: StatisticsReportErrorDetailTypes.IRequestProps, token: string) => (
  stdApiGET({ token, url: `${statisticsUrl}error/${params.entityId}?company_id=${params.companyId}${params.type ? `&entity_type=${params.type}` : ''}${params.branchId ? `&branch_id=${params.branchId}` : ''}${params.groupId ? `&group_id=${params.groupId}` : ''}` })
);

export const getZealReports = (params: StatisticsZealReportTypes.IRequestProps, token: string) => (
  stdApiGET({ token, url: `${statisticsUrl}zeal/export?company_id=${params.companyId}${params.groupId ? `&group_id=${params.groupId}` : ''}${params.branchId ? `&branch_id=${params.branchId}` : ''}${params.startDate ? `&start_date=${params.startDate}` : ''}${params.endDate ? `&end_date=${params.endDate}` : ''}&keyword=${params.keyword}` })
);

export const downloadZealReport = (params: StatisticsZealReportDownloadTypes.IRequestProps, token: string) => (
  stdApiGET({ token, url: `${statisticsUrl}zeal/export/xls?company_id=${params.companyId}${params.groupId ? `&group_id=${params.groupId}` : ''}${params.branchId ? `&branch_id=${params.branchId}` : ''}${params.startDate ? `&start_date=${params.startDate}` : ''}${params.endDate ? `&end_date=${params.endDate}` : ''}&keyword=${params.keyword}` })
);
