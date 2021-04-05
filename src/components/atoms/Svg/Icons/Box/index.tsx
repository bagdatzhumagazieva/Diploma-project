import React from 'react';
import classNames from 'classnames';
import { BoxTypes } from 'src/components/atoms/Svg/Icons/Box/types';
import './index.scss';

function BoxIcon(props: BoxTypes.IProps) {
  const { active, onClick, className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      fill="none"
      viewBox="0 0 48 48"
      className={classNames('box-icon', { 'box-icon--active': active }, className)}
      onClick={() => onClick && onClick('box')}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M33 18.8L15 8.42M42 32V16a4 4 0 00-2-3.46l-14-8a4 4 0 00-4 0l-14 8A4 4 0 006 16v16a4 4 0 002 3.46l14 8a4 4 0 004 0l14-8A4 4 0 0042 32z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6.54 13.92L24 24.02l17.46-10.1M24 44.16V24"
      />
    </svg>
  );
}

export default BoxIcon;
