import React, { useState } from 'react';
import classNames from 'classnames';
import Image from 'src/components/atoms/Image';
import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import Rate from 'src/components/atoms/Rate';
import { MarketplaceInfo } from 'src/components/atoms/Cards/CardMarketplaceInfo/types';
import IconSuccess from 'src/assets/img/icons/success.svg';
import 'src/components/atoms/Cards/CardMarketplaceInfo/index.scss';
import { addAdminSlash } from 'src/routers/AdminRouters';
import { AdminRouterPaths } from 'src/core/enum';

/*  TODO: add demonstration functionality after back */
// import Demonstration from 'src/assets/img/icons/demonstration.svg';

function CardMarketplaceInfo(props: MarketplaceInfo.IProps) {
  const { price, stars, title, text, className, isBought, headTitle, entityId, entityType } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const showText = () => isOpen ? text : text.length > 400 ? `${text.slice(0, 400)}...` : text;

  return (
    <div
      className={classNames([
        'market-card pos_relative',
        className,
      ])}>
      <Rate disabled value={stars}/>
      <div className="d-flex flex-column">
        <Typography variant="text" color="main_50" className="my-16">{headTitle}</Typography>
        <Typography variant="textmed" className="mb-8">{title}</Typography>
        <Typography variant="text" color="grey_additional_1" >{showText()}</Typography>
        <Typography variant="text" color="main_50" onClick={toggle} style={{ cursor: 'pointer' }}>
          {text.length > 400 && `Показать ${isOpen ? 'меньше' : 'полностью'}`}
        </Typography>
      </div>
      <div className="horizontal-line" />
      {!isBought ? (
        <div className="buy-button">
          <Typography variant="h1" className="ml-24 mt-8">{price} 〒</Typography>
          <Button
            to={`${addAdminSlash(AdminRouterPaths.PAYMENT)}/${entityId}`}
            classNames="marketplace-button-position"
          >
            Заказать {entityType === 'shell' ? 'оболочку' : 'контент'}
          </Button>
        </div>
      ) : (
        <div className="d-flex buy-button py-16 align-items-center justify-content-center">
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
      {/* <div className="demonstration" >
        <Image src={Demonstration} alt="demonstration" className="mr-8"/>
        <Typography variant="subtext" color="main_50">Демонстрация</Typography>
      </div> */}
    </div>
  );
}

export default CardMarketplaceInfo;
