import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import InputMask from 'react-input-mask';
import { useOutsideClick } from 'src/hooks/useOutsideClick';
import { eraseFromObject } from 'src/utils/serialization';

import Typography from 'src/components/atoms/Typography';
import ShowPasswordIcon from 'src/components/molecules/Input/index.passwordIcon';
import Hint from 'src/components/atoms/Hint';
import Image from 'src/components/atoms/Image';

import { InputTypes } from 'src/components/molecules/Input/types';
import Info from 'src/assets/img/icons/info.svg';
import 'src/components/molecules/Input/index.scss';

function Input(props: InputTypes.IProps) {
  const {
    type: propType,
    value: propValue,
    placeholder: propPlaceHolder,
    variant: propVariant,
    mask,
    errorMessage,
    label,
    hint,
    prompt,
    icon,
    color: propColor,
    classNames: propClassNames,
    inputClassName: propInputClassName,
    maskChar,
    name,
    disabled,
    required,
    formatChars,
  } = props;

  const [showPassword, setShowPassword] =  useState(false);
  const [value, setValue] = useState(propValue || '');
  const [clickedIcon, setClickedIcon] = useState<boolean>(false);
  const type = propType || 'text';
  const variant = `typography__variant-${propVariant || 'body'}`;
  const color = `color_${propColor || 'black'}`;
  const placeholder = propPlaceHolder || '';
  const inputAttributes = eraseFromObject<InputTypes.IProps>(
    {
      ...props,
      value,
      placeholder,
      name,
      // Removing component props from dom attributes.
    },
    'errorMessage', 'classNames', 'variant', 'focused');

  const wrapperClassName = classNames(
    'input-field', propClassNames,
    { 'input-field--password': type === 'password' },
    { 'input-field--disabled':  disabled },
    { 'input-field__password-icon--disabled':  disabled },
    { 'input-field__password-icon--clicked':  clickedIcon },
    { 'input-field--error':  errorMessage },
  );

  const inputClassName = classNames(
    'input-field__input', variant, color, propInputClassName, 'fill_w',
    { 'input-field__input--password': type === 'password' },
    { 'input-field__content--border': !icon },
  );

  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    if (clickedIcon) setClickedIcon(false);
  });

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (props.onChange) props.onChange(event);
    setValue(event.target.value);
  };

  const toggleShowPasswordComponent = () => {
    setShowPassword(!showPassword);
    setClickedIcon(true);
  };

  useEffect(
    () => {
      setValue(propValue || '');
    },
    [propValue]);

  return (
    <div ref={ref} className={wrapperClassName}>
      {(label || hint) && (
        <div className="d-flex mb-4">
          {label && (
            <Typography
              variant="subtext"
              className="input-field__label"
            >
              {label}{required && <span className="input-field__required ml-1 color_red">*</span>}
            </Typography>
          )}
          {hint && (
            <Hint
              showOnClick
              placement="right-start"
              hint={
                <Typography
                  className="p-1"
                  variant="xxsmall"
                  color="blacker"
                >
                  {hint}
                </Typography>
              }
            >
              <Image
                className="ml-8"
                src={Info}
                alt="info"
              />
            </Hint>
          )}
        </div>
      )}
      <div className={classNames(
        'input-field__content',
        { 'input-field__content--password': type === 'password' },
        { 'input-field__content--border d-flex align-items-center': icon },
      )}>
        {icon}
        {mask ? (
          <InputMask
            {...inputAttributes}
            className={inputClassName}
            mask={mask || ''}
            maskChar={maskChar || '_'}
            type={type}
            onChange={onInputChange}
            formatChars={formatChars}
          />
        ) : (
          <input
            {...inputAttributes}
            type={showPassword ? 'text' : type}
            className={inputClassName}
            onChange={onInputChange}
          />
        )}
        {type === 'password' &&
        <ShowPasswordIcon
            className="input-field__password-icon"
            show={showPassword}
            onClick={toggleShowPasswordComponent}
        />
        }
      </div>
      {errorMessage && (
        <Typography
          className="color_red text-left mt-8"
          variant="xsmall"
        >
          {errorMessage}
        </Typography>
      )}
      {prompt && (
        <Typography
          variant="xsmall"
          color="grey_additional_1"
          className="text-left mt-8"
        >
          {prompt}
        </Typography>
      )}
    </div>
  );
}

export default Input;
