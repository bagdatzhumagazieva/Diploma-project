import React from 'react';

export interface IProps {
  status: boolean;
}

function Circle(props: IProps) {
  const { status } = props;
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        r="4"
        transform="matrix(1 0 0 -1 4 4)"
        fill={status ? '#2ABE42' : '#F04848'}/>
    </svg>
  );
}

export default Circle;
