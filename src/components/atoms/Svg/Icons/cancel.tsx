import React from 'react';
import { IconProps } from 'src/core/components/types';

function CancelIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={props.className ? `cancel-icon ${props.className}` : 'cancel-icon'}
      onClick={props.onClick}
    >
      <path
        stroke={props.color || '#282F4A'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M18 6L6 18M6 6l12 12"
      />
    </svg>
  );
}

export default CancelIcon;
