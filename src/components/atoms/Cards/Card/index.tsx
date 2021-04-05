import React from 'react';
import classNames from 'classnames';
import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import { CardTypes } from 'src/components/atoms/Cards/Card/types';
import Arrow from 'src/assets/img/icons/arrow-left.svg';
import 'src/components/atoms/Cards/Card/index.scss';

function Card(props: CardTypes.IProps) {
  const { hasBoxShadow = true, backLink, onClick } = props;
  const onBackClick = () => {
    onClick && onClick();
  };
  return (
    <div
      className={classNames([
        'card pos_relative',
        props.classNames,
        { 'card--box-shadow': hasBoxShadow },
      ])}>
      {
        backLink && (
          <Button
            onClick={onBackClick}
            className="card__back-link pos_absolute"
            to={onClick ? undefined : backLink}
            type="link"
          >
            <Image
              src={Arrow}
              alt="arrow"
            />
          </Button>
        )
      }
      {props.children}
    </div>
  );
}

export default Card;
