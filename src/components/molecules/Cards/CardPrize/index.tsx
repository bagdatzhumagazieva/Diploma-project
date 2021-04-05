import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import PlusMinusButton from 'src/components/atoms/PlusMinusButton';
import Typography from 'src/components/atoms/Typography';
import { CardPrizeTypes } from 'src/components/molecules/Cards/CardPrize/types';
import { ReactComponent as IconStar } from 'src/assets/img/icons/star.svg';
import CoinIcon from 'src/assets/img/icons/coin.svg';
import 'src/components/molecules/Cards/CardPrize/index.scss';

function CardPrize(props: CardPrizeTypes.IProps) {

  const { className, imgSrc, rating, title, reward, link, basketCount, onChangeBasket, id, amount } = props;
  const [valueBasket, setValueBasket] = useState<number>(basketCount || 0);

  const onAddToBasket = () => {
    setValueBasket(valueBasket + 1);
    onChangeBasket && onChangeBasket('add', valueBasket + 1, id);
  };

  const delFromBasket = () => {
    valueBasket && setValueBasket(valueBasket - 1);
    onChangeBasket && onChangeBasket('drop', valueBasket - 1, id);
  };

  return (
    <div className={classNames('card-prize d-flex flex-column p-24', className)}>
      <Image className="card-prize__img" alt="card image" src={imgSrc} />
      <div className="card-prize__rating d-flex justify-content-center p-8">
        <IconStar />
        <Typography variant="text" className="ml-8">{rating}</Typography>
      </div>

      <Link to={link || ''}>
        <Typography variant="h2" className="card-prize__title mt-24">{title}</Typography>
      </Link>
      <Typography variant="subtext" color="grey_additional_1">{`Осталось призов: ${amount}`}</Typography>

      <div className="d-flex justify-content-between align-items-center mt-24">
        <span>
          <Typography variant="h2" color="main_50">{reward}</Typography>
          <Image alt="coin icon" src={CoinIcon} classNames="coins__image ml-4"/>
        </span>
        {valueBasket ? (
          <div>
            <PlusMinusButton
              value={valueBasket}
              maxValue={amount}
              addValue={onAddToBasket}
              delValue={delFromBasket}
            />
          </div>) :
          <Button variant="h2" type="rounded" onClick={onAddToBasket}>В Корзину</Button>
        }
      </div>

    </div>
  );
}

export default CardPrize;
