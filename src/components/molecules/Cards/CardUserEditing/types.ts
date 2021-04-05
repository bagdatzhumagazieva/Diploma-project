import { IDatePicker } from 'src/components/molecules/DatePicker/types';
import { IBaseProps } from 'src/core/components/types';
import { ProfileTypes } from 'src/store/profile/types';

export namespace CardUserEditingTypes {
  export interface IProps extends IBaseProps {
    isEmailDisabled?: boolean;
    isPhoneNumberDisabled?: boolean;
    userImage: string;
    userInformation?: IUserEditing;
    onSaveClick?(data: ProfileTypes.IUpdateBodyProps): void;
  }

  export interface IError {
    firstName?: string;
    secondName?: string;
  }
}

export interface IUserEditing {
  firstName: string;
  secondName: string;
  date: IDatePicker;
  gender: string | null;
  email: string;
  phoneNumber: string;
  avatar?: any;
  changedAvatar?: string;
  countryCode: string;
}
