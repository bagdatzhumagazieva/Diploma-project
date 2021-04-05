import React from 'react';

interface IProps {
  color?: string;
  className?: string;
}

function Members(props: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={props.className}
    >
      <path
        stroke={props.color || '#B0BAC9'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M15.75 18.75v-1.5a3 3 0 00-3-3h-6a3 3 0 00-3 3v1.5M9.75 11.25a3 3 0 100-6 3 3 0 000 6zM20.25 18.75v-1.5A3 3 0 0018 14.348M15 5.348a3 3 0 010 5.812"
      />
    </svg>
  );
}

export default Members;
