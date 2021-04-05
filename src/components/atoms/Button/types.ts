import { TypographyVariants } from 'src/components/atoms/Typography/types';
import { IBaseAttributeProps, ICoverProps, IHintProps, IRippleProps } from 'src/core/components/types';

export namespace ButtonTypes {
  export interface IProps extends IBaseAttributeProps<HTMLButtonElement>, ICoverProps, IRippleProps, IHintProps {
    /**
     * If exists, will render Link component from react-router
     * with to props in it.
     */
    to?: string;
    /**
     * If exists, will render default html <a> tag with href in it.
     */
    href?: string;
    /**
     * Will be passed into <a> tag if href presented.
     */
    target?: string;
    /**
     * Will be passed into <button> component if to or href props
     * not presented.
     */
    buttonType?: 'submit' | 'reset' | 'button';
    /**
     * Typography variant of buttons label.
     */
    variant?: TypographyVariants | string;
    /**
     * Sets accent color of the button.
     * Look for vars.scss in src/assets to see available options.
     */
    color?: string;
    /**
     * Disables any user interaction with component.
     */
    disabled?: boolean;
    /**
     * Sets specific styles according design
     */
    type?: string;
    /**
     * HTML button types: submit, button, reset
     * by default it button type will be 'button' type
     */
    htmlTypes?: 'submit' | 'button' | 'reset';
    icon?: string;
    /**
     * Path of the button icon by default
     * the size of icon 24px x 24px,
     * margin from text 8px
     */
    loading?: boolean;
    underlined?: boolean;
  }
}
