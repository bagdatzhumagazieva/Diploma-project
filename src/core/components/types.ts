import React, { CSSProperties, DOMAttributes } from 'react';
import { NotificationType } from 'src/components/molecules/Notification/types';

export type ClassNames = string | boolean | object | any[];

/**
 * Base attributes of any tag.
 */
export interface IBaseAttributes {
    /**
     * Tags id.
     */
  id?: string;
    /**
     * Tags role.
     */
  role?: string;
    /**
     * Tags style.
     */
  style?: CSSProperties;
    /**
     * Tags class name.
     */
  className?: string;
    /**
     * data-tip is necessary, because <ReactTooltip /> finds the tooltip via this attribute
     */
  'data-tip'?: boolean;
    /**
     * data-for corresponds to the id of <ReactTooltip />
     */
  'data-for'?: string;
}

/**
 * Props of the component that supports ripples.
 */
export interface IRippleProps {
    /**
     * Indicates if component needs to be rippled.
     */
  ripple?: boolean;
}

/**
 * Props of the component that supports covers.
 */
export interface ICoverProps {
    /**
     * Indicates if component needs to be covered.
     */
  covered?: boolean;
    /**
     * Indicates if component needs to be disabled.
     */
  disabled?: boolean;
}

/**
 * Props of the component that implements Preloader.
 */
export interface ILoadingProps {
    /**
     * Indicates if component needs to be covered by Preloader.
     */
  loading?: boolean;
}

/**
 * Static components base props.
 */
export interface IBaseProps extends IBaseAttributes {
    /**
     * Component wrappers classNames.
     */
  classNames?: ClassNames;
}

/**
 * Standard html base components.
 */
export interface IBaseAttributeProps<T extends Element> extends DOMAttributes<T>, IBaseProps {
}

/**
 * Props of the component that supports hint.
 */
export interface IHintProps {
  hint?: string;
}

export interface IconProps extends IBaseProps {
  color?: string;
  onClick?(event: React.MouseEvent<SVGElement | HTMLDivElement>): void;
  direction?: 'up' | 'down' | 'right' | 'left';
  className?: string;
  active?: boolean;
  isPosAbsolute?: boolean;
}

export interface IResponseBody<T = {}> {
  code: 0;
  description: string;
  data?: T | any;
}

export interface IRenderBody<T = {}> {
  responseType: NotificationType;
  description: string;
  data?: T;
}
