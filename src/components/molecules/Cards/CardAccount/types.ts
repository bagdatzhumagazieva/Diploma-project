import { IAccountData, ILoadTypes } from 'src/core/store/types';
import { CompaniesTypes } from 'src/store/company/types';

export namespace CardAccountTypes {
  export interface IProps {
    fullName?: string;
    image?: string;
    email?: string;
    className?: string;
    companies?: ILoadTypes<CompaniesTypes.IRenderProps[]>;

    handleCloseClick?(): void;
    onClickLogout?(): void;
    setCompanyId?(companyId: string): void;
    setPageLoading?(loading: boolean): void;
    onChangeAccountClick?(): void;
  }
}

export namespace ModalCardAccountTypes {
  export interface IProps {
    accounts?: Map<string, IAccountData>;
    onModalClose(): void;
    setPageLoading?(loading: boolean): void;
  }
}

export interface IAccount {
  userName: string;
  userMail: string;
  id: string;
  profileLink: string;
  imageSrc?: string;
  companies: ICompany[];
}

export interface ICompany {
  id: string;
  imageSrc?: string;
  name: string;
  notifications?: number;
}
