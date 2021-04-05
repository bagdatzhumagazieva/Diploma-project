import { RouteComponentProps } from 'react-router';
import { RegistrationPageTypes } from 'src/pages/AuthPages/Registration/types';

export namespace ResetPageTypes {
  export interface IProps extends RouteComponentProps{
    registration?: any;
    registrationError?: string;
    registrationLoading?: boolean;
    onCreateActivation?(data:RegistrationPageTypes.IRegistrationData): void;
  }
}
