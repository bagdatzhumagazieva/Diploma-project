import React from 'react';

export interface IProps {
  className?: string;
}

function More(props: IProps) {
  return (
    <svg
      className={props.className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.5 12C12.5 12.2761 12.2761 12.5 12 12.5C11.7239 12.5 11.5 12.2761 11.5 12C11.5 11.7239 11.7239 11.5 12 11.5C12.2761 11.5 12.5 11.7239 12.5 12Z" stroke="#B0BAC9" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19.5 12C19.5 12.2761 19.2761 12.5 19 12.5C18.7239 12.5 18.5 12.2761 18.5 12C18.5 11.7239 18.7239 11.5 19 11.5C19.2761 11.5 19.5 11.7239 19.5 12Z" stroke="#B0BAC9" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5.5 12C5.5 12.2761 5.27614 12.5 5 12.5C4.72386 12.5 4.5 12.2761 4.5 12C4.5 11.7239 4.72386 11.5 5 11.5C5.27614 11.5 5.5 11.7239 5.5 12Z" stroke="#B0BAC9" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default More;
