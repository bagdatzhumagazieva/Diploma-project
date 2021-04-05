import React from 'react';
import classNames from 'classnames';

import Arrow from 'src/components/atoms/Svg/Icons/Arrow';

import { PageButtonTypes } from 'src/components/atoms/PageButton/types';
import './index.scss';

function PageButton(props: PageButtonTypes.IProps) {
  const { direction, children, disabled, active, onClick } = props;

  return (
      <div
        onClick={!disabled ? onClick : undefined}
        className={classNames([
          'page-button',
          { 'page-button--active': active },
          `page-button--${ !disabled ? 'regular' : 'disabled'}`,
          props.className,
        ])}
      >
        {direction && <Arrow direction={direction} />}
        {children && children}
      </div>
  );
}

export default PageButton;
