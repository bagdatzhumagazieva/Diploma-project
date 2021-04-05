import { WithTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router';
import { ProfileTypes } from 'src/store/profile/types';

export namespace RegistrationFormPageTypes {
  export interface IProps extends WithTranslation, RouteComponentProps {
    profile?: ProfileTypes.IRenderProps;
    profileError?: string;
    profileLoading?: boolean;
    onFinishRegistration?(data: any, callback?: any): void;
    getProfile?(): void;
  }

  export interface IProfile {
    name: string;
    username: string;
    email: string;
    phone: string;
    country: string;
    surname: string;
    password: string;
    checkPassword: string;
  }

  export interface IErrors {
    name: string;
    surname: string;
    gender: string;
    password: string;
    checkPassword: string;
    birthDate: string;
    email: string;
    country: string;
    username: string;
    phone: string;
  }
}
