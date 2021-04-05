import { IBaseAttributeProps } from 'src/core/components/types';
import { TypographyVariants } from 'src/components/atoms/Typography/types';

export namespace InputTypes {
  export interface IProps extends IBaseAttributeProps<HTMLInputElement> {
    type: 'text' | 'password' | 'email' | 'number';
    placeholder?:  string;
    value?: string | number;
    name?: string;
    size?: number;
    disabled?: boolean;
    focused?: boolean;
    errorMessage?: string | undefined | false;
    label?: string;
    variant?: TypographyVariants | string;
    mask?: string;
    formatChars?: { [key: string]: string };
    maskChar?: string;
    color?: string;
    classNames?: string;
    inputClassName?: string;
    hint?: string;
    prompt?: string;
    required?: boolean;
    autoFocus?: boolean;
    icon?: JSX.Element;
  }
}
