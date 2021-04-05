import React, { useEffect, useState } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { toggleCardFavourite } from 'src/store/card/actions';
import { getMyRating, createRating, clearRating } from 'src/store/rate/actions';

import { findCardCategoryPath } from 'src/utils/helpers';
import Rate from 'src/components/atoms/Rate';
import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import Breadcrumb from 'src/components/atoms/BreadCrumb';
import Image from 'src/components/atoms/Image';

import { useLocalStorage } from 'src/hooks/useLocalStorage';
import { LOCAL_STORAGE } from 'src/core/store/values';
import FavoriteIcon from 'src/components/atoms/Svg/Icons/favorite';
import { CardViewTypes } from 'src/components/organisms/CardView/types';
import 'src/components/organisms/CardView/index.scss';
import { RatingTypes } from 'src/store/rate/types';

function CardView(props: CardViewTypes.IProps) {
  const {
    card, className, type = 'admin', onEndClick, isShowCardImage,
    loading, toggleCardFavourite, getMyRating, createRating, clearRating,
    rating,
  } = props;
  const [companyId] = useLocalStorage(LOCAL_STORAGE.COMPANY_ID, '-1');
  const [isFavourite, setFavourite] = useState(false);
  const [userRating, setUserRating] = useState<CardViewTypes.IRate>();

  useEffect(
    () => {
      if (card) {
        setFavourite(card.isFavourite);
        getMyRating && getMyRating(companyId, card.uuid);
      }
      return () => {
        clearRating && clearRating();
      };
    },
    [card],
  );

  useEffect(() => {
    setUserRating({ savedVal: rating });
  },        [rating]);

  const onToggleFavourite = () => {
    if (toggleCardFavourite && card) {
      toggleCardFavourite(card.id, {
        onSuccess: () => {
          setFavourite(prevState => !prevState);
        },
      });
    }
  };

  const onRate = () => {
    if (!card || !userRating?.newVal) return;
    const ratingCreateParams: RatingTypes.ICreateBody = {
      entityType: 'CARD',
      entityUuid: card.uuid,
      value: userRating.newVal,
    };
    createRating && createRating(ratingCreateParams, {
      onSuccess: () => {
        setUserRating({ ...userRating, savedVal: userRating?.newVal });
      },
    });
  };

  return (
    <div className={classNames('card-view', className, { covered: loading })}>
      {card && (
        <>
          <div className="d-flex justify-content-between">
            {card.date && <Typography variant="subtext">{moment(card.date).format('DD.MM.YYYY')}</Typography>}
            <Button
              type="link"
              variant="subtext"
              className="d-flex align-items-center"
              onClick={onToggleFavourite}
            >
              <FavoriteIcon
                active={isFavourite}
                bordered
                className="card-view__fav-icon mr-8"
              />
              В избранное
            </Button>
          </div>

          <Typography
            variant="h1"
            className="my-24 d-block"
          >
            {card.name}
          </Typography>

          {isShowCardImage && card.imageUrl && (
            <Image alt="card-image" src={card.imageUrl} className="card-view__main-image mb-24"/>
          )}

          {card.description && (
            <div
              className="mb-24 inner-html card-view__description"
              dangerouslySetInnerHTML={{ __html: card.description }}
            />
          )}

          {card.content && (
            <div className="my-24 inner-html" dangerouslySetInnerHTML={{ __html: card.content }} />
          )}

          <Typography variant="textmed" className="mt-24">
            Понравилась ли вам данная запись? Поставьте оценку
          </Typography>

          <div className="d-flex flex-column">
            <Rate
              disabled={!!userRating?.savedVal}
              className="mt-16"
              value={userRating?.newVal || userRating?.savedVal}
              onChange={(rating: number) => setUserRating({ newVal: rating })}
            />
            {typeof userRating?.savedVal === 'number' ?
              <Typography variant="text" color="green" className="mt-24">
                Благодарим за вашу оценку!
              </Typography> :
              typeof  userRating?.newVal === 'number' ?
                <Button
                  variant="textmed"
                  className="px-32 mt-24 align-self-start"
                  onClick={onRate}
                >
                  Отправить
                </Button>
                : ''
            }
          </div>

          {type === 'web' && (
            <Button onClick={onEndClick} className="py-16 px-48 mt-32" variant="textmed">
              Завершить
            </Button>
          )}

          {card.tags.length > 0 && (
            <div className="mt-32 mb-24">
              <Typography
                variant="subtext"
                color="grey_additional_2"
              >
                Тэги:
              </Typography>
              <div className="d-flex align-items-center flex-wrap">
                {card.tags.map((n, i) => (
                  <Typography
                    key={i}
                    variant="subtext"
                    color="main_50"
                    className="mr-16 mt-8 mr-8"
                  >
                    #{n.name}
                  </Typography>
                ))}
              </div>
            </div>
          )}

          {card.category && (
            <div className="mt-24">
              <Typography
                variant="subtext"
                color="grey_additional_2"
              >
                Рубрики:
              </Typography>
              <Breadcrumb
                withTrail
                className="mt-8"
                items={findCardCategoryPath(card.category).map(n => ({ label: n.name }))}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

const mapDispatchToProps = {
  toggleCardFavourite,
  getMyRating,
  createRating,
  clearRating,
};

const mapStateToProps = (state: any) => ({
  rating: state.ratingReducer.rating.data,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CardView);
