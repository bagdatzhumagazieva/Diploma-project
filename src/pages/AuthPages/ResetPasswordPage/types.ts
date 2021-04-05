import { RouteComponentProps } from 'react-router';
import { ProfileTypes } from 'src/store/profile/types';

export namespace ResetPasswordTypes {
  export interface IProps extends RouteComponentProps {
    profile?: ProfileTypes.IResponseProps;
    codeConfirmation?: string;
    profileError?: string;
    profileLoading?: boolean;
    onFinishRegistration?(data: ProfileTypes.IFinishRequest): void;
  }
}
