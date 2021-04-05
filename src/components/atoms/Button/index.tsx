import * as React from 'react';
import { Link } from 'react-router-dom';
import { mapPropsToAttributes } from 'src/core/components';

import { ButtonTypes } from 'src/components/atoms/Button/types';
import 'src/components/atoms/Button/index.scss';

/**
 * Button represents default html <button>, <a> tags and
 * react router Link component, but with styled and Cover/Ripple
 */
export default class Button extends React.Component<ButtonTypes.IProps> {
  public render(): React.ReactNode {
    const {
      children,
      to, href, target,
      color,
      variant,
      hint,
      disabled,
      onClick, onChange, onDoubleClick,
      onMouseEnter,
      type,
      htmlTypes,
      loading,
      underlined,
    } = this.props;
    const attributes = mapPropsToAttributes<ButtonTypes.IProps>(this.props, 'button', {
      [`typography__variant-${variant}`]: variant,
      [`button--type-${type}`]: type,
      [`button--color-${color}`]: color,
      'button--loading': loading,
      'button--underlined': underlined,
      'cursor-not-allowed button--disabled': disabled,
    });

    return to ?
      <Link
        {...attributes}
        to={to}
        title={hint || ''}
        onClick={onClick as any}
        onMouseEnter={onMouseEnter as any}
      >{children}</Link> :
      href ?
        <a
          {...attributes}
          href={href}
          target={target}
          title={hint || ''}
          onClick={onClick as any}
          onMouseEnter={onMouseEnter as any}
        >{children}</a> :
        <button
          {...attributes}
          {...{
            onClick, onChange, onDoubleClick, disabled,
            onMouseEnter,
          }}
          title={hint || ''}
          type={htmlTypes || 'button'}
        > {children}
        </button>;
  }
}
