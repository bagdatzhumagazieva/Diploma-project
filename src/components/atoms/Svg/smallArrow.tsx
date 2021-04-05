import React from 'react';
import { IconProps } from 'src/core/components/types';

function SmallArrow(props: IconProps) {
  const { color = '#282F4A', className, onClick } = props;
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      onClick={onClick}
    >
      <path fill={color} d="M9 16.5l6-4.5-6-4.5v9z" />
    </svg>
  );
}

export default SmallArrow;
