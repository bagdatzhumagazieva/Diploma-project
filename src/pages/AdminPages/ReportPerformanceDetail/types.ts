import { StatisticsPerformanceDetailTypes } from 'src/store/statistics/types';
import { CompaniesTypes } from 'src/store/company/types';
import { BranchesTypes } from 'src/store/branch/types';
import { GroupTypes } from 'src/store/group/types';

export declare namespace ReportPerformanceDetailTypes {
  export interface IProps {
    getPerformanceDetail(params: StatisticsPerformanceDetailTypes.IRequestProps): void;
    performanceDetail: StatisticsPerformanceDetailTypes.IRenderProps;
    performanceDetailLoading: boolean;

    company?: CompaniesTypes.IRenderProps;
    branches?: BranchesTypes.IRenderProps[];
    groups?: GroupTypes.IRenderProps[];
    getGroups?(params: GroupTypes.IQueryParams): void;
    getBranches?(companyId: number): void;
  }
}
