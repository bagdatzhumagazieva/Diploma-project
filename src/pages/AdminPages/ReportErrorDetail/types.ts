import { StatisticsReportErrorDetailTypes } from 'src/store/statistics/types';
import { CompaniesTypes } from 'src/store/company/types';
import { BranchesTypes } from 'src/store/branch/types';
import { GroupTypes } from 'src/store/group/types';

export declare namespace ReportErrorDetailTypes {
  export interface IProps {
    getErrorDetail(params: StatisticsReportErrorDetailTypes.IRequestProps): void;
    errorDetail: StatisticsReportErrorDetailTypes.IRenderProps;
    errorDetailLoading: boolean;

    company?: CompaniesTypes.IRenderProps;
    branches?: BranchesTypes.IRenderProps[];
    groups?: GroupTypes.IRenderProps[];
    getGroups(params: GroupTypes.IQueryParams): void;
    getBranches(companyId: number): void;
  }
}
