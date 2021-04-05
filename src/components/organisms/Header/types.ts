import { IBaseProps } from 'src/core/components/types';
import { ILoadTypes } from 'src/core/store/types';
import { CompaniesTypes } from 'src/store/company/types';
import { ProfileTypes } from 'src/store/profile/types';

export namespace HeaderTypes {
  export interface IProps extends IBaseProps {
    profile?: ILoadTypes<ProfileTypes.IRenderProps>;
    isHasNotifications?: boolean;
    userName?: string;
    companyLogo?: string;
    companies?: ILoadTypes<CompaniesTypes.IRenderProps[]>;
    avatar?: ILoadTypes<any>;
    onGetAvatar?(uuid: string): void;
    setPageLoading?(loading: boolean): void;
    logout?(): void;
    onChangeAccountClick?(): void;
  }

  export interface INotificationBlock {
    isHasNotifications?: boolean;
  }

  export interface IAccountBlock {
    companies?: ILoadTypes<CompaniesTypes.IRenderProps[]>;
    profile?: ILoadTypes<ProfileTypes.IRenderProps>;

    onClickLogout?(): void;
    setPageLoading?(loading: boolean): void;
    onChangeAccountClick?(): void;
  }
}
