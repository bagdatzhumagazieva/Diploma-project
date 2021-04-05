import { StatisticsZealReportTypes } from 'src/store/statistics/types';
import { CompaniesTypes } from 'src/store/company/types';
import { BranchesTypes } from 'src/store/branch/types';
import { GroupTypes } from 'src/store/group/types';

export declare namespace ReportZealPageTypes {
  export interface IProps {
    getZealReports(params: StatisticsZealReportTypes.IRequestProps): void;
    zealReports: StatisticsZealReportTypes.IRenderProps;
    zealReportsLoading: boolean;
    downloadedZealReportLoading: boolean;

    company?: CompaniesTypes.IRenderProps;
    branches?: BranchesTypes.IRenderProps[];
    groups?: GroupTypes.IRenderProps[];
    getGroups?(params: GroupTypes.IQueryParams): void;
    getBranches?(companyId: number): void;
    downloadZealReport?(params: StatisticsZealReportTypes.IRequestProps): void;
  }
}
