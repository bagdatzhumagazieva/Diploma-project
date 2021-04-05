import { CompaniesTypes } from 'src/store/company/types';
import { ILoadTypes } from 'src/core/store/types';
import { MediaTypes } from 'src/store/media/types';
import { IOption } from 'src/components/molecules/Select/types';
import { EmploymentTypes } from 'src/store/employment/types';
import { BranchesTypes } from 'src/store/branch/types';
import { GroupTypes } from 'src/store/group/types';
import { IRenderBody } from 'src/core/components/types';

export declare namespace CompanySettingsTypes {
  export interface IProps {
    admins?: EmploymentTypes.IRenderProps[];
    adminsLoading?: boolean;
    groups?: GroupTypes.IRenderProps[];
    branches?: BranchesTypes.IRenderProps[];
    companyData?: ILoadTypes<CompaniesTypes.IRenderProps>;
    updateEmployee?(employeesData: EmploymentTypes.IUpdateEmployeeBodyProps): void;
    getBranches?(companyId: number): void;
    getGroups?(params: GroupTypes.IQueryParams): void;
    getCompanyById?(companyId: number): void;
    getCompanyAdmins?(companyId: number): void;
    uploadCompanyLogo?(image: File, coords: number[]): void;
    setCompanyLogo?(fileUuid: string, coords: number[]): void;
    uploadCompanyBanner?(image: File, coords: number[]): void;
    setCompanyBanner?(fileUuid: string, coords: number[]): void;
    uploadedCompanyLogoData?: ILoadTypes<MediaTypes.IRenderProps>;
    uploadedCompanyBannerData?: ILoadTypes<MediaTypes.IRenderProps>;
    updatedEmployeeState?: IRenderBody;
  }

  export interface ICompanyInfo {
    title: string;
    language: IOption;
    color: IOption;
  }
}

export enum CompanyColors {
  green = 'green',
  blue = 'blue',
  violet = 'violet',
  red = 'red',
  orange = 'orange',
  yellow = 'yellow',
  turquoise = 'turquoise',
  indigo = 'indigo',
  electricViolet = 'electric-violet',
  rose = 'rose',
  tundora = 'tundora',
}
