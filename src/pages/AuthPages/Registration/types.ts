import { WithTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router';

export namespace RegistrationPageTypes {
  export interface IProps extends WithTranslation, RouteComponentProps {
    registration?: any;
    codeConfirmation?: string;
    registrationError?: string;
    registrationLoading?: boolean;
    onSendRegistration?(data: IRegistrationData): void;
  }

  export interface IRegistrationData {
    username?: string;
    phone?: string;
    email?: string;
    activation_type: string;
    reason: string;
  }
}
