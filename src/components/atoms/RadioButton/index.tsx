import React from 'react';
import classNames from 'classnames';
import { mapPropsToAttributes } from 'src/core/components';
import Typography from 'src/components/atoms/Typography';
import { RadioButtonTypes } from 'src/components/atoms/RadioButton/types';
import 'src/components/atoms/RadioButton/index.scss';

function RadioButton(props: RadioButtonTypes.IProps) {
  const { label, isChecked, value, name, labelVariant } = props;
  const attributes = mapPropsToAttributes<RadioButtonTypes.IProps>(
    props, 'radio-button', 'pos_relative');

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.setClicked && props.setClicked(event);
  };

  return (
    <label { ...attributes }>
      {label && (
        <Typography
          variant={labelVariant || 'subtext'}
          color="black"
          className="radio-button__title ml-20"
        >
          {label}
        </Typography>
      )}
      <input
        className="radio pos_absolute"
        name={name}
        value={value}
        checked={isChecked}
        onChange={onInputChange}
        type="radio"
      />
      <div className={classNames('custom-radio', 'pos_absolute',  { 'custom-radio--active' : isChecked })} />
    </label>
  );
}

export default RadioButton;
