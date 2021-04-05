import React from 'react';
import classNames from 'classnames';
import Typography from 'src/components/atoms/Typography';
import { ReactComponent as PlusIcon } from 'src/assets/img/icons/plus.svg';
import { PlusMinusButtonTypes } from 'src/components/atoms/PlusMinusButton/types';
import 'src/components/atoms/PlusMinusButton/index.scss';

function PlusMinusButton(props: PlusMinusButtonTypes.IProps) {
  const { className, value, maxValue, addValue: propAddValue, delValue } = props;

  const addValue = () => {
    if (propAddValue) {
      if (maxValue) {
        if (value < maxValue) {
          propAddValue();
        }
      } else {
        propAddValue();
      }
    }
  };

  return (
    <div
      className={classNames(
        'plus-minus-button d-flex align-items-center',
        className,
      )}
    >
      <div onClick={delValue} className="icon cursor-pointer d-flex align-items-center p-8">
        <div className="plus-minus-button__minus" />
      </div>
      <Typography variant="subtext" color="main_50" className="mx-12">{value}</Typography>
      <div
        onClick={addValue}
        className="icon cursor-pointer d-flex align-items-center justify-content-center"
      >
        <PlusIcon width={17} height={17} className="plus-minus-button__plus" />
      </div>
    </div>
  );
}

export default PlusMinusButton;
