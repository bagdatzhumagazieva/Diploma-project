import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Image from 'src/components/atoms/Image';
import CardBadge from 'src/components/atoms/Cards/CardBadge';
import Typography from 'src/components/atoms/Typography';
import Rate from 'src/components/atoms/Rate';
import Button from 'src/components/atoms/Button';
import { AdminRouterPaths } from 'src/core/enum';
import { getMoreLengthWithDots } from 'src/utils/values';
import { addAdminSlash } from 'src/routers/AdminRouters';
import Icons from 'src/components/molecules/Cards/CardMicroLearning/consts';
import IconSuccess from 'src/assets/img/icons/success.svg';
import { parseNumberToStringWithComma } from 'src/utils/format';
import { CardMarketPlaceTypes } from './types';
import 'src/components/molecules/Cards/CardMarketplace/index.scss';
/*TODO: Link when pressing item's name */

function CardMarketplace(props: CardMarketPlaceTypes.IProps) {
  const {
    images,
    commentsAmount,
    price,
    isBought,
    description,
    name,
    rating,
    className,
    entityId,
    itemType,
  } = props;

  return (
    <div className={classNames(['card-marketplace', className])}>
      <div className="card-marketplace__image-wrapper">
        <Image alt="card" src={images[0].imageUrl} className="card-marketplace__image fill" />
      </div>
      <div className="d-flex flex-column p-16">
        <Typography className="mb-8" variant="h2" style={{height: '62px'}}>
          <Link
            to={itemType === 'GAME_TEMPLATE' ? `${addAdminSlash(AdminRouterPaths.MARKETPLACE_DETAILED)}/${entityId}` :
          `${addAdminSlash(AdminRouterPaths.MARKETPLACE_EDUCATION_DETAIL)}/${entityId}`}>
            {getMoreLengthWithDots(68, name)}</Link>
        </Typography>
        <Typography variant="xsmall" color="grey_additional_2" className="card-marketplace__description">
          {getMoreLengthWithDots(76, description)}
        </Typography>

        <div className="d-flex mt-20 justify-content-between align-items-center">
          <div className="d-flex">
            <Rate disabled value={rating || 0} small />
            <Typography variant="text" className="ml-4">
              {parseNumberToStringWithComma(+(rating || 0).toFixed(1))}
            </Typography>
          </div>
          <CardBadge
            icon={Icons.CommentIcon}
            title={`${commentsAmount || 0}`}
          />
        </div>
        <div className="line my-20" />
        {!isBought ? (
          <div className="d-flex align-items-center justify-content-between">
            <Typography variant="h2">{price} ₸</Typography>
            <Button
              to={`${addAdminSlash(AdminRouterPaths.PAYMENT)}/${entityId}`}
              type="outlined"
              variant="textmed"
              className="card-marketplace__btn py-4 px-40 d-flex align-items-center"
            >
              Заказать
            </Button>
          </div>) : (
          <div className="d-flex" style={{ margin: '6px 0' }}>
            <Image alt="success icon" src={IconSuccess} className="d-flex" />
            <Button
              type="link"
              color="green"
              variant="text"
              className="ml-8"
            >
              Товар куплен
            </Button>
          </div>
          )}
      </div>
    </div>
  );
}

export default CardMarketplace;
