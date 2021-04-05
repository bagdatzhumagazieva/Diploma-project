import { IBaseAttributeProps } from 'src/core/components/types';

export namespace InputTextSmsTypes {
  export interface IProps extends IBaseAttributeProps<HTMLInputElement> {
    placeholder?: string;
    value?: string | number;
    disabled?: boolean;
    focused?: boolean;
    errorMessage?: string;
    wrapperClassName?: string;
    handleEnter?(): void;
  }
}
