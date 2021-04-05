import React from 'react';
import { mapPropsToAttributes } from 'src/core/components';
import { IBaseProps } from 'src/core/components/types';

export interface IProps extends IBaseProps {
  isHasNotifications?: boolean;
  onClick?(): void;
}

function Bell(props: IProps) {
  const attributes = mapPropsToAttributes<IProps>(props, 'bell');

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      {...attributes}
      onClick={props.onClick}
    >
      <path
        stroke="#282F4A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M18 8A6 6 0 106 8c0 7-3 9-3 9h18s-3-2-3-9zM13.73 20a1.999 1.999 0 01-3.46 0"
      />
      {props.isHasNotifications && (
        <circle cx="19" cy="15" r="4" fill="#2F80ED"/>
      )}
    </svg>
  );
}

export default Bell;
