import React, { useState } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { RouterPaths } from 'src/core/enum';
import { numberToStringWithSpaces, parseNumberToStringWithComma } from 'src/utils/format';

import CardBadge from 'src/components/atoms/Cards/CardBadge';
import Image from 'src/components/atoms/Image';
import MicroLearningText from 'src/components/atoms/MicroLearningText';
import FavoriteIcon from 'src/components/atoms/Svg/Icons/favorite';
import Typography from 'src/components/atoms/Typography';
import { ReactComponent as CheckIcon } from 'src/assets/img/icons/done.svg';

import { CardMicroLearningTypes } from 'src/components/molecules/Cards/CardMicroLearning/types';
import Icons, { EXERCISE_TYPES } from 'src/components/molecules/Cards/CardMicroLearning/consts';
import { ProgressStatus } from 'src/store/course/types';
import 'src/components/molecules/Cards/CardMicroLearning/index.scss';

// todo make disable card with logic(separate task card and module card)
function CardMicroLearning(props: CardMicroLearningTypes.IProps) {
  const {
    image, favorite: propsFavorite, type, coins, className, link, id,
    title, description, comments, time, rating, date, processStatus,
    onMakeFavorite, onDeleteFavorite,
  } = props;
  const [favorite, setFavorite] = useState<boolean>(propsFavorite || false);

  const isAudioOrVideo = type === EXERCISE_TYPES.VIDEO || type === EXERCISE_TYPES.AUDIO_PODCAST;
  const handleClickFavorite = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
    if (!favorite) {
      id && onMakeFavorite && onMakeFavorite(+id, {
        onSuccess: () => {
          setFavorite(!favorite);
        },
      });
    } else {
      id && onDeleteFavorite && onDeleteFavorite(+id, {
        onSuccess: () => {
          setFavorite(!favorite);
        },
      });
    }
  };

  return (
    <div id={`${id}`} className={classNames('micro-learning p-24 d-flex', className)}>
      <Link to={link || ''}>
        <div className="micro-learning__image-wrapper pos_relative mr-24">
          <Image
            alt="micro learning avatar"
            src={image}
            className="micro-learning__image fill"
          />
          <FavoriteIcon
            active={favorite}
            className="micro-learning__favorite-image pos_absolute"
            onClick={handleClickFavorite}
          />
          <div
            className={classNames(
              'micro-learning__image-overlay pos_absolute fill',
              { 'micro-learning__image-overlay--black': isAudioOrVideo },
            )}
          />
          {isAudioOrVideo && (
            <Image alt="play icon" className="micro-learning__play-image pos_absolute" src={Icons.PlayIcon} />
          )}
          {processStatus && processStatus === ProgressStatus.SUCCESS && (
            <div className="micro-learning__finished-status pos_absolute d-flex flex-align align-items-center justify-content-center">
              <CheckIcon width="45" height="45" />
            </div>
          )}
        </div>
      </Link>
      <div className="micro-learning__content">
        <div className="d-flex flex-column justify-content-between fill_h">
          <div className="micro-learning__header d-flex justify-content-between mb-12">
            {type && <MicroLearningText type={type} />}
            <Typography variant="xsmall" color="grey_additional_2">
              {date && moment(date).format('DD.MM.YYYY')}
            </Typography>
          </div>
          <Link to={link || `/${RouterPaths.TASKS_FEED}/${id}`}>
            <Typography variant="h2" color="blacker" className="micro-learning__title">{title}</Typography>
          </Link>
          <Typography variant="subtext" className="micro-learning__description mt-8 mb-4">{description}</Typography>
          <div className="micro-learning__bottom d-flex justify-content-between align-items-center mt-2">
            <div className="d-flex">
              {comments !== undefined && (
                <Link to={`/${RouterPaths.TASKS_FEED}/${id}`}>
                  <CardBadge
                    icon={Icons.CommentIcon}
                    title={`${comments}`}
                    className="micro-learning__badge micro-learning__badge--comments mr-10"
                  />
                </Link>
              )}
              <CardBadge icon={Icons.ClockIcon} title={`${time} мин.`} className="micro-learning__badge mr-32" />
              <CardBadge
                icon={Icons.StarIcon}
                title={parseNumberToStringWithComma(rating)}
                className="micro-learning__badge"
              />
            </div>
            {processStatus && processStatus === ProgressStatus.SUCCESS ? (
              <Typography variant="text" color="green">Задание выполнено</Typography>
            ) :
              <div className="micro-learning__coin d-flex align-items-center">
                <Typography color="main_50" variant="h1">+{numberToStringWithSpaces(coins || 0)}</Typography>
                <Image alt="coin icon" src={Icons.CoinIcon} className="coin__image ml-4"/>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardMicroLearning;
