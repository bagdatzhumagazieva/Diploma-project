import React from 'react';
import { IconProps } from 'src/core/components/types';
import 'src/components/atoms/Svg/Plus/index.scss';

function IconPlus(props: IconProps) {
  const { color = '#FF9800', className, onClick } = props;

  return (
    <div
      className={`${className} plus-icon d-flex`}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 16 16"
      >
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M8 3.333v9.334M3.333 8h9.334"
        />
      </svg>
    </div>
  );
}

export default IconPlus;
