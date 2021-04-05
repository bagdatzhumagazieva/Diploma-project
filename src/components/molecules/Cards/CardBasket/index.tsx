import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';
import PlusMinusButton from 'src/components/atoms/PlusMinusButton';
import Checkbox from 'src/components/molecules/Checkbox';
import Modal from 'src/components/molecules/Modal';
import CoinIcon from 'src/assets/img/icons/coin.svg';
import { CardBasketTypes } from 'src/components/molecules/Cards/CardBasket/types';
import 'src/components/molecules/Cards/CardBasket/index.scss';

function CardBasket(props: CardBasketTypes.IProps) {
  const {
    id,
    className,
    isChecked,
    imgSrc,
    category,
    title,
    description,
    basketCount,
    rewardAmount,
    onDeleteCard,
    onChangeBasket,
    onSelectItem,
    link,
    amount,
  } = props;

  const [isDeleteCardModal, setDeleteCardModal] = useState<boolean>(false);
  const [valueBasket, setValueBasket] = useState<number>(basketCount);

  const onAddToBasket = () => {
    setValueBasket(valueBasket + 1);
    onChangeBasket && onChangeBasket(valueBasket + 1, id);
  };

  const onDeleteFromBasket = () => {
    if (valueBasket === 1) {
      onDeleteCard && onDeleteCard(id);
    } else {
      valueBasket && setValueBasket(valueBasket - 1);
      onChangeBasket && onChangeBasket(valueBasket - 1, id);
    }
  };

  const onDeleteBasket = () => {
    onDeleteCard && onDeleteCard(id);
    setDeleteCardModal(false);
  };

  const onClickCheckbox = (state: boolean) => {
    onSelectItem && onSelectItem(id, state);
  };

  return (
    <div className={classNames('card-basket d-flex p-24', className)}>
      <Checkbox isClicked={isChecked} setClicked={onClickCheckbox} />
      <div className="d-flex ml-24 fill_w">
        <div className="card-basket__img">
          <Image className="card-basket__img" alt="card image" src={imgSrc} />
        </div>
        <div className="d-flex flex-column fill_w ml-24">
          <div className="d-flex justify-content-between fill_w align-items-center">
            <div>
              <Typography variant="subtext">Категория:</Typography>
              <Typography className="ml-4" variant="subtext" color="main_50">
                {category}
              </Typography>
            </div>
            <Typography
              className="cursor-pointer"
              variant="xsmallunderlined"
              onClick={() => setDeleteCardModal(true)}
            >
              Удалить
            </Typography>
          </div>
          <Typography variant="h2" className="mt-16">
            <Link to={link || ''}>
              {title}
            </Link>
          </Typography>
          <Typography variant="subtext" color="grey_additional_2" className="mt-4 pr-32">
            {description}
          </Typography>
          <Typography variant="subtext" color="grey_additional_1" className="my-12">
            {`Осталось призов: ${amount}`}
          </Typography>
          <div className="d-flex justify-content-between mt-16">
            <PlusMinusButton
              value={basketCount}
              maxValue={amount}
              delValue={onDeleteFromBasket}
              addValue={onAddToBasket}
            />
            <div className="d-flex align-items-center">
              <Typography variant="textmed">
                Цена:
              </Typography>
              <Typography variant="h1" color="main_50" className="ml-8">
                {rewardAmount || 0}
              </Typography>
              <Image alt="coin icon" className="card-basket__icon ml-4" src={CoinIcon} />
            </div>
          </div>
        </div>
      </div>
      {isDeleteCardModal && (
        <Modal
          title="Удаление приза"
          saveLabel="Ok"
          cancelLabel="Отмена"
          onCloseClick={() => setDeleteCardModal(false)}
          onSaveClick={onDeleteBasket}
        >
          <div className="mx-32">
            <Typography variant="text">
              Вы уверены что хотите удалить данный приз из корзины?
            </Typography>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CardBasket;
