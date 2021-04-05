import React from 'react';
import classNames from 'classnames';
import './index.scss';

interface IProps {
  active?: boolean;
  bordered?: boolean;
  className?: string;
  onClick?(event: React.MouseEvent<SVGSVGElement>): void;
}

function FavoriteIcon(props: IProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      className={classNames(
        'favorite-icon',
        { 'favorite-icon--hover': !props.active && !props.bordered },
        { 'favorite-icon--bordered': props.bordered },
        props.className,
      )}
      onClick={props.onClick}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        className={classNames('favorite-icon__path', { 'favorite-icon__path--active': props.active })}
        d="M20.84 4.608a5.5 5.5 0 00-7.78 0L12 5.668l-1.06-1.06a5.501 5.501 0 10-7.78 7.78l1.06 1.06 7.78 7.78 7.78-7.78 1.06-1.06a5.499 5.499 0 000-7.78v0z"
      />
    </svg>
  );
}

export default FavoriteIcon;
