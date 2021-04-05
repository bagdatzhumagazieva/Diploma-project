import { IUserEditing } from 'src/components/molecules/Cards/CardUserEditing/types';
import { ProfileTypes } from 'src/store/profile/types';
import { ILoadTypes } from 'src/core/store/types';
import { AchievementTypes } from 'src/store/achievement/types';
import { CertificateTypes } from 'src/store/certificate/types';
import { EmploymentTypes } from 'src/store/employment/types';
import { CompaniesTypes } from 'src/store/company/types';

export declare namespace ProfilePageTypes {
  export interface IProps {
    profile?: ProfileTypes.IRenderProps;
    error?: string;
    successPassword?: any;
    loadingPassword?: boolean;
    employment?: EmploymentTypes.IRenderProps;
    avatar?: ILoadTypes<any>;
    company?: CompaniesTypes.IRenderProps;

    onGetProfile?(): void;
    onUpdateProfile?(data: ProfileTypes.IUpdateBodyProps, callback?: any): void;
    onChangePassword?(data: ProfileTypes.IChangePasswordRequest, callback?: any): void;
    onUploadAvatar?(file: any, uuid: string, callback?: any): void;
    getCompanyById?(companyId: number): void;
  }

  export interface TabSettingsProps {
    errorMessage?: string;
    successPassword?: any;
    loadingPassword?: boolean;
    userInformation?: IUserEditing;
    onSaveClick?(data: ProfileTypes.IUpdateBodyProps): void;
    onClickChangePassword?(data: IUserEditing, callback?: any): void;
  }
}

export namespace TabAchievementTypes {
  export interface IProps {
    companyId?: number;
    achievements?: AchievementTypes.IRenderProps[];
    achievementsCount?: AchievementTypes.IRenderAchievementCountProps;
    total?: number;
    nextPage?: number | null;
    getAchievements?(params: AchievementTypes.IQueryProps): void;
    getAchievementsCount?(): void;
    loading?: boolean;
  }
}

export namespace TabCertificateTypes {
  export interface IProps {
    companyId?: number;
    certificates?: CertificateTypes.IRenderProps[];
    total?: number;
    getCertificates?(params: CertificateTypes.IQueryProps): void;
  }
}

export namespace TabActivityTypes {
  export interface IProps {
    companyId?: number;
  }
}
