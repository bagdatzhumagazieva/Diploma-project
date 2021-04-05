import React, { useState } from 'react';
import classNames from 'classnames';
import { parseNumberToStringWithComma } from 'src/utils/format';

import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';
import FavoriteIcon from 'src/components/atoms/Svg/Icons/favorite';

import { CardAdvertisementTypes } from 'src/components/molecules/Cards/CardAdvertisement/types';
import StarIcon from 'src/assets/img/icons/star.svg';
import CoinIcon from 'src/assets/img/icons/coin.svg';
import 'src/components/molecules/Cards/CardAdvertisement/index.scss';

function CardAdvertisement(props: CardAdvertisementTypes.IProps) {
  const {
    image, title, rating, coins, link,
    favorite: propsFavorite = false, className,
  } = props;
  const [favorite, setFavorite] = useState<boolean>(propsFavorite);

  return (
    <div className={classNames('card-advertisement d-flex', className)}>
      <div className="card-advertisement__image-wrapper pos_relative fill_h">
        <Image
          alt="advertisement image"
          src={image}
          className="card-advertisement__image fill"
        />
        <FavoriteIcon
          active={favorite}
          className="card-advertisement__favorite-image pos_absolute"
          onClick={() => setFavorite(!favorite)}
        />
        <div className="card-advertisement__image-overlay pos_absolute fill" />
      </div>
      <div className="card-advertisement__content d-flex flex-column fill_w p-10">
        <Typography
          variant="subtextmed"
          className="card-advertisement__title mb-10"
        >
          {title}
        </Typography>
        <div className="mb-24 d-flex align-items-center">
          {/* todo dynamic stars */}
          {[...Array(5)].map((_, i) => (
            <Image key={i} alt="star icon" src={StarIcon} className="card-advertisement__star-icon mr-4" />
          ))}
          <Typography
            variant="xsmall"
            className="ml-2"
            color="grey_additional_2"
          >
            ({parseNumberToStringWithComma(rating)})
          </Typography>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <Typography variant="textmed">{coins}</Typography>
            <Image alt="coin icon" src={CoinIcon} className="card-advertisement__coin-image ml-8" />
          </div>
          <Button to={link} className="card-advertisement__button">Получить</Button>
        </div>
      </div>
    </div>
  );
}

export default CardAdvertisement;
