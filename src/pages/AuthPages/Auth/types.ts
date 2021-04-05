import { WithTranslation } from 'react-i18next';
import { ProfileTypes } from 'src/store/profile/types';

export namespace AuthPageTypes {
  export interface IProps extends WithTranslation {
    token?: string;
    errorMessage?: string;
    loadingToken?: boolean;
    unauthorized?: boolean;
    profile?: ProfileTypes.IRenderProps;
    getProfile?(callback?: any): void;
    onGetLogin?(data: any, callback?: any): void;
    onGetSocialLogin?(data: any, callback?: any): void;
  }
}

export interface IAuth {
  login: string;
  password: string;
}
