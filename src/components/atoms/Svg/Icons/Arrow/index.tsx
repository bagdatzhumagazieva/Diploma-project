import * as React from 'react';
import { IconProps } from 'src/core/components/types';
import { Degree } from 'src/components/atoms/Svg/Icons/Arrow/enum';

function Arrow(props: IconProps) {
  const { color, direction = 0 } = props;
  const rotate = Degree[direction];

  return (
    <svg
      width="12"
      height="8"
      viewBox="0 0 12 8"
      style={{ transform: `rotate(${rotate}deg)` }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.00094 7.43722C5.78588 7.43722 5.57084 7.3549 5.40688 7.19061L0.247146 2.01815C-0.08108 1.68912 -0.08108 1.15565 0.247146 0.826753C0.57524 0.497853 1.1073 0.497853 1.43555 0.826753L6.00094 5.40363L10.5664 0.826913C10.8946 0.498013 11.4266 0.498013 11.7547 0.826913C12.083 1.15581 12.083 1.68928 11.7547 2.01831L6.59501 7.19077C6.43096 7.35509 6.21593 7.43722 6.00094 7.43722Z"
        fill={`${color || '#25283C'}`}
      />
    </svg>
  );
}

export default Arrow;
