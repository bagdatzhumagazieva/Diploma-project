import React from 'react';
import { mapPropsToAttributes } from 'src/core/components';

export interface IProps {
  direction: 'up' | 'down';
  active?: boolean;
  className?: string;
}

function MiniArrow(props: IProps) {
  const { direction, active } = props;
  const attributes = mapPropsToAttributes<IProps>(props, 'mini-arrow');
  const arrowTransform = { transform: `rotate(${direction === 'up' ? '0deg' : '180deg'})` };

  return (
    <svg
      {...attributes}
      style={{ ...arrowTransform }}
      width="7"
      height="4"
      viewBox="0 0 7 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.5 4L3.5 6.31821e-07L0.5 4L6.5 4Z"
        fill={active ? '#FF9800' : '#B0BAC9'}
      />
    </svg>
  );
}

export default MiniArrow;
