import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import { numberToStringWithSpaces, parseNumberToStringWithComma } from 'src/utils/format';

import Button from 'src/components/atoms/Button';
import FavoriteIcon from 'src/components/atoms/Svg/Icons/favorite';
import Image from 'src/components/atoms/Image';
import Members from 'src/components/atoms/Svg/Icons/members';
import Typography from 'src/components/atoms/Typography';
import ProgressBar from 'src/components/atoms/ProgressBar';

import { ReactComponent as ClockIcon } from 'src/assets/img/icons/clock.svg';
import Star from 'src/assets/img/icons/star.svg';
import { CardEducationTypes } from 'src/components/molecules/Cards/CardEducation/types';
import 'src/components/molecules/Cards/CardEducation/index.scss';
import { getMoreLengthWithDots } from 'src/utils/values';

/* TODO: games' players count, link, handleFavoriteClick */

function CardEducation(props: CardEducationTypes.IProps) {
  const {
    image, title, players, progress, handleFavoriteClick,
    favorite: propsFavorite = false, id,
    link, time, rating, type, className,
    tags, variant = 1, size = 'normal',
  } = props;
  const [favorite, setFavorite] = useState<boolean>(propsFavorite);
  const onFavoriteClick = () => {
    handleFavoriteClick && handleFavoriteClick(id, favorite);
    setFavorite(prevState => !prevState);
  };

  const getTitle = () => {
    if (progress === 0) return 'Начать';
    if (progress < 100) return 'Продолжить';
    return 'Пройти заново';
  };

  const history = useHistory();
  useEffect(() => setFavorite(propsFavorite || false), [propsFavorite]);

  return (
    <div className={classNames(`card-education p-24 d-flex flex-column card-education--${size}`, className)}>
      <div className="card-education__image-wrapper pos_relative mb-16">
        <Image
          src={image}
          alt="image of game"
          className="card-education__image fill"
        />
        <FavoriteIcon
          active={favorite}
          className="card-education__favorite-image pos_absolute"
          onClick={onFavoriteClick}
        />
        {variant === 1 ? (
          <div className="card-education__rating pos_absolute d-flex align-items-center">
            <Image alt="star icon"  src={Star} className="mr-2" />
            <Typography variant="text">{parseNumberToStringWithComma(rating || 0)}</Typography>
          </div>
        ) : (
          <Button
            type="rounded"
            className="pos_absolute card-education__submit-button"
            to={link}
          >
            {getTitle()}
          </Button>
        )}
        <div
          className="card-education__image-overlay pos_absolute fill"
          onClick={() => history.push(link)}/>
      </div>
      <Typography className="card-education__title" variant="h2">
        <Link to={link}>{getMoreLengthWithDots(size === 'small' ? 45 : 63, title)}</Link>
      </Typography>
      <ProgressBar percent={progress} position="top" label="пройдено" className="mb-16" />
      {tags && tags.length > 0 && (
        <div className="text-overflow color_main_50 mb-8">
          {tags.map(item => (
            <Typography
              key={`${item.name}-${item.id}`}
              variant="xsmall"
              className="mr-8 cursor-pointer"
            >
              #{item.name}
            </Typography>
          ))}
        </div>
      )}
      <div className="d-flex align-items-center justify-content-between mt-auto">
        <div className="card-education__left d-flex align-items-center">
          <div className="card-education__players d-flex align-items-center mr-16">
            <Members color="#FF9800" className="mr-4"/>
            <Typography
              variant="subtext"
              color="main_50"
              className="ml-2"
            >
              {numberToStringWithSpaces(players || 0)}
            </Typography>
          </div>
          <div className="d-flex align-items-center">
            <ClockIcon className="mr-4" />
            <Typography variant="subtext" color="grey_additional_2" className="ml-2">{time} мин.</Typography>
          </div>
        </div>
        {variant === 1 ? (
          <Button
            variant="h2"
            type="rounded"
            to={link}
          >
            {type === 'game' ? 'Играть' : 'Пройти' }
          </Button>
        ) : (
          <div className="d-flex align-items-center">
            <Image alt="star icon"  src={Star} className="mr-8" />
            <Typography variant="text" className="mt-2">{parseNumberToStringWithComma(rating || 0)}</Typography>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardEducation;
