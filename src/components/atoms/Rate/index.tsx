import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { RateTypes } from 'src/components/atoms/Rate/types';
import { ReactComponent as IconStar } from 'src/assets/img/icons/star.svg';
import 'src/components/atoms/Rate/index.scss';

function Rate(props: RateTypes.IProps) {
  const { count = 5, className, value = 0, onChange, disabled, small } = props;

  const [rating, setRating] = useState(value);
  const [hover, setHover] = useState<number | null>();

  const onStarSelect = (rating: number) => {
    setRating(rating);
    onChange && onChange(rating);
  };

  useEffect(
    () => {
      setRating(value);
    },
    [value],
  );

  return (
    <div className={`rate d-flex align-items-center ${className}`}>
      {[...Array(count * 2)].map((_, i) => {
        const ratingValue = (i + 1) / 2;
        return (
          <label
            key={i}
            className={classNames('star pos_relative', { 'cursor-pointer' : !disabled })}
          >
            <input
              type="radio"
              name="rating"
              className="star__radio"
              value={ratingValue}
              onClick={() => !disabled && onStarSelect(ratingValue)}
            />
            <div
              onMouseEnter={() => !disabled && setHover(ratingValue)}
              onMouseLeave={() => !disabled && setHover(null)}
              className={classNames(
                'd-flex align-items-center pos_relative',
                small ? 'star__icon-wrap_small' : 'star__icon-wrap',
              )}
            >
              <IconStar
                className={classNames(
                  'star__icon',
                  (ratingValue <= (hover || rating)) ? 'star__icon--active' : 'star__icon--grey',
                  i % 2 === 0 ? 'star__icon--first' : 'star__icon--second',
                )}
              />
            </div>
          </label>
        );
      })}
    </div>
  );
}

export default Rate;
