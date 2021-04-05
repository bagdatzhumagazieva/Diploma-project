import React from 'react';
import { IconProps } from 'src/core/components/types';
import { Degree } from 'src/components/atoms/Svg/Icons/Arrow/enum';

function FilterArrow(props: IconProps) {
  const { active, direction = 'down', isPosAbsolute, color, onClick, className } = props;
  const rotate = Degree[direction];
  const arrowTransform = !isPosAbsolute ?
    { transform: `rotate(${rotate}deg)` } :
    { transform: `translateY(-50%) rotate(${rotate}deg)` };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      style={{ ...arrowTransform, minWidth: 16 }}
      className={`arrow ${className ? className : ''}`}
      onClick={onClick}
    >
      <path
        stroke={`${color ? color : active ? '#FF9800' : '#282F4A'}`}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12.666 6L8 10.665 3.333 5.999"
      />
    </svg>
  );
}

export default FilterArrow;
