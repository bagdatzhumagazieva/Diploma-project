import React, { useEffect, useState } from 'react';
import { mapPropsToAttributes } from 'src/core/components';
import Typography from 'src/components/atoms/Typography';
import { CheckboxTypes } from 'src/components/molecules/Checkbox/types';
import 'src/components/molecules/Checkbox/index.scss';

function Checkbox(props: CheckboxTypes.IProps) {
  const { title, prompt, disabled, titleVariant, indeterminate, color, labelRef } = props;
  const attributes = mapPropsToAttributes<CheckboxTypes.IProps>(props, 'checkbox d-flex align-items-center', {
    'checkbox--disabled' : disabled,
    'checkbox--indeterminate' : indeterminate,
    'checkbox--prompt' : prompt,
  });
  const { id, ...filteredAttributes } = attributes;
  const [checked, setChecked] = useState(props.isClicked);

  useEffect(
    () => {
      setChecked(props.isClicked);
    },
    [props.isClicked],
  );

  const handleChange = () => {
    props.setClicked && props.setClicked(!checked, id, title);
    setChecked(!checked);
  };

  return (
    <label {...filteredAttributes} ref={labelRef}>
      <div className="d-flex flex-column">
        <Typography
          variant={titleVariant || 'xsmall'}
          className="checkbox__title"
          color={color}
        >
          {title}
        </Typography>
        {prompt && (
          <Typography
            variant="xsmall"
            color="grey_additional_1 d-block mt-4"
          >
            {prompt}
          </Typography>
        )}
      </div>
      <input
        disabled={disabled}
        id={id}
        className="checkbox__input"
        type="checkbox"
        checked={checked || false}
        onChange={handleChange}
      />
      <span className="checkmark" />
    </label>
  );
}

export default Checkbox;
