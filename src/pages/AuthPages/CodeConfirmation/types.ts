import { WithTranslation } from 'react-i18next';

export namespace CodeConfirmationPageTypes {
  export interface IProps extends WithTranslation {
    registration?: any;
    codeConfirmation?: string;
    codeConfirmationError?: string;
    codeConfirmationLoading?: boolean;
    onResendActivation?(uuid: string, callback?: any): void;
    onConfirmActivation?(data: any): void;
  }
}
