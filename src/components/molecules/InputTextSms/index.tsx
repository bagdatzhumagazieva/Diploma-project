import React, { useState } from 'react';
import classNames from 'classnames';
import { onKeyDown } from 'src/utils/helpers';
import { eraseFromObject } from 'src/utils/serialization';

import { InputTextSmsTypes } from 'src/components/molecules/InputTextSms/types';
import 'src/components/molecules/InputTextSms/index.scss';
import Typography from 'src/components/atoms/Typography';

function InputTextSms(props: InputTextSmsTypes.IProps) {
  const {
    value: propValue,
    errorMessage, wrapperClassName, handleEnter }
    = props;
  const [value, setValue] = useState(propValue || '');

  const inputAttributes = eraseFromObject<InputTextSmsTypes.IProps>(
    {
      ...props,
      value,
    },
    'errorMessage', 'classNames', 'focused');

  const inputClassName = classNames(
    'input-text-sms', 'fill_w',
    { 'input-text-sms--error': errorMessage },
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) props.onChange(event);
    setValue(event.target.value);
  };

  return (
    <div className={wrapperClassName || ''}>
      <input
        {...inputAttributes}
        className={inputClassName}
        type="s"
        maxLength={4}
        onChange={onChange}
        onKeyDown={onKeyDown(handleEnter)}
      />
      {errorMessage && (
        <Typography
          className="input-text-sms__error-label color_red mt-8"
          variant="xsmall"
        >
          {errorMessage}
        </Typography>
      )}
    </div>
  );
}

export  default InputTextSms;
