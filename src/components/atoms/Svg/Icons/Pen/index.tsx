import React from 'react';
import classNames from 'classnames';
import { PenTypes } from 'src/components/atoms/Svg/Icons/Pen/types';
import './index.scss';

function PenIcon(props: PenTypes.IProps) {
  const { active, onClick, className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="none"
      viewBox="0 0 48 48"
      className={classNames('pen-icon', { 'pen-icon--active': active }, className)}
      onClick={() => onClick && onClick('pen')}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M24 38l14-14 6 6-14 14-6-6z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M36 26l-3-15L4 4l7 29 15 3 10-10zM4 4l15.172 15.172"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M22 26a4 4 0 100-8 4 4 0 000 8z"
      />
    </svg>
  );
}

export default PenIcon;
