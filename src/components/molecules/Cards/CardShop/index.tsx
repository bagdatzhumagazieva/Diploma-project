import React from 'react';
import classNames from 'classnames';
import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';
import Rate from 'src/components/atoms/Rate';
import Button from 'src/components/atoms/Button';
import { AdminRouterPaths } from 'src/core/enum';
import { addAdminSlash } from 'src/routers/AdminRouters';
import { CardShopTypes } from './types';
import Coin from 'src/assets/img/icons/coin.svg';
import './index.scss';

function CardShop(props: CardShopTypes.IProps) {
  const { image,  cost,  rate, title, className, id } = props;

  return (
    <div className={classNames(['card-shop', className])}>
      <div className="p-24">
        <div className="card-shop__image-wrapper">
          <div className="d-flex align-items-center shop-item__rate">
            <Rate disabled count={1} value={1}/> 
            <Typography variant="text" className="ml-8">{rate}</Typography>
          </div>
          <Image src={image} alt="card" className="shop-item__image"/>
        </div>
          <Typography variant="h2" className="mt-24">{title}</Typography>
        <div className="d-flex justify-content-between align-items-center mt-24">
          <div>
            <Typography variant="h2" color="main_50">{cost}</Typography>
            <Image src={Coin}  alt="coin" className="coin"/>
          </div>
          <Button
            to={`${addAdminSlash(AdminRouterPaths.PAYMENT)}/${id}`}
            type="rounded"
            variant="h2"
          >
            В Корзину
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CardShop;
