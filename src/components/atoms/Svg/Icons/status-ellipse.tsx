import React from 'react';

export interface IProps {
  color: string;
  className?: string;
}

function StatusEllipse(props: IProps) {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      style={{ minWidth: '8' }}
      xmlns="http://www.w3.org/2000/svg"
      className={`mt-4 ${props.className}`}
    >
      <circle
        cx="4"
        cy="4"
        r="4"
        fill={props.color}
      />
    </svg>
  );
}

export default StatusEllipse;
