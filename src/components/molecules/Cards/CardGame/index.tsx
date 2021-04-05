import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { numberToStringWithSpaces, parseNumberToStringWithComma } from 'src/utils/format';

import Button from 'src/components/atoms/Button';
import FavoriteIcon from 'src/components/atoms/Svg/Icons/favorite';
import IconCertificate from 'src/components/atoms/IconCertificate';
import Members from 'src/components/atoms/Svg/Icons/members';
import Image from 'src/components/atoms/Image';
import ProgressBar from 'src/components/atoms/ProgressBar';
import Typography from 'src/components/atoms/Typography';
import Modal from 'src/components/molecules/Modal';
import GameDetail from 'src/components/molecules/GameDetail';

import { CardGameTypes } from 'src/components/molecules/Cards/CardGame/types';
import StarIcon from 'src/assets/img/icons/star.svg';
import { ReactComponent as ClockIcon } from 'src/assets/img/icons/clock.svg';
import 'src/components/molecules/Cards/CardGame/index.scss';

function CardGame(props: CardGameTypes.IProps) {
  /* TODO: link, */
  const {
    imageUrl, name, minutesToFinish,
    isFavorite: propsFavorite,
    numberOfViews = 0, rating = 0, hasCertificate, progress, levelsData,
  } = props;

  const [favorite, setFavorite] = useState<boolean>(propsFavorite || false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const onCloseModalClick = () => setShowModal(false);

  useEffect(() => setFavorite(propsFavorite || false), [propsFavorite]);

  return (
    <div className={classNames('card-game p-16 pos_relative', props.className)}>
      <div className="card-game__image-wrapper pos_relative mb-16">
        <Image src={imageUrl} alt="game image" className="card-game__image fill" />
        <Button
          variant="h2"
          className="card-game__button pos_absolute"
          type="rounded"
          onClick={() => setShowModal(true)}
        >
          Играть
        </Button>
        <FavoriteIcon
          active={favorite}
          className="card-game__favorite-image pos_absolute"
          onClick={() => setFavorite(!favorite)}
        />
        <div className="card-game__image-overlay pos_absolute fill"/>
      </div>
      <Typography variant="text" className="card-game__title">
        <Link to={'/'}>{name}</Link>
      </Typography>
      <Typography variant="xxsmall" className="card-game__progress-title mb-4">
        Пройдено {levelsData?.finishedLevelsCount || 0} из {levelsData?.total || 0}
      </Typography>
      <ProgressBar regular percent={progress || 0} className="mt-2"/>
      <div className="d-flex align-items-center justify-content-between mt-16">
        <div className="card-game__left d-flex align-items-center">
          <div className="card-game__players d-flex align-items-center mr-16">
            <Members className="mr-4" />
            <Typography
              variant="subtextmed"
              color="grey_additional_2"
              className="ml-2"
            >
              {numberToStringWithSpaces(numberOfViews)}
            </Typography>
          </div>
          <div className="d-flex align-items-center">
            <ClockIcon className="mr-4 card-game__clock-icon" />
            <Typography variant="subtext" color="grey_additional_2" className="ml-2">{minutesToFinish} мин.</Typography>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <Image alt="star icon" src={StarIcon} className="mr-2" />
          <Typography variant="textmed">{parseNumberToStringWithComma(rating || 0)}</Typography>
        </div>
      </div>
      {hasCertificate && <IconCertificate className="card-game__icon-certificate pos_absolute"/>}
      {showModal && (
        <Modal width={900} onCloseClick={onCloseModalClick} closeColor="white">
          <GameDetail {...props} variant="web" />
        </Modal>
      )}
    </div>
  );
}

export default CardGame;
