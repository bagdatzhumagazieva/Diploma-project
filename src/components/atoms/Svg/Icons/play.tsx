import React from 'react';

export interface IProps {
  color?: string;
}

function Play(props: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="34"
      fill="none"
      viewBox="0 0 28 34"
      className="play-icon"
    >
      <path
        fill={props.color || '#fff'}
        d="M26.743 14.722L4.47.464C2.57-.754 0 .57 0 2.757v28.48c0 2.222 2.57 3.512 4.47 2.294l22.273-14.259c1.676-1.039 1.676-3.475 0-4.55z"
      />
    </svg>
  );
}

export default Play;
