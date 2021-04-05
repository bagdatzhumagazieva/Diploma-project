import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ReactSortable } from 'react-sortablejs';

import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import FilterArrow from 'src/components/atoms/Svg/Table/filterArrow';
import CardInformationBlock from 'src/components/molecules/CardInfomationBlock';

import { TrialTypes } from 'src/components/organisms/GameCreationEdition/Content/Level/Trial/types';
import { ICard } from 'src/components/molecules/CardInfomationBlock/types';

import { ReactComponent as EditIcon } from 'src/assets/img/icons/edit.svg';
import { ReactComponent as DeleteIcon } from 'src/assets/img/icons/delete.svg';
import { ReactComponent as MenuIcon } from 'src/assets/img/icons/menu.svg';
import 'src/components/organisms/GameCreationEdition/Content/Level/Trial/index.scss';
import Modal from 'src/components/molecules/Modal';

function Trial(props: TrialTypes.IProps) {
  const {
    index, description, name, disabled,
    className, cards: propsCards, onCardAddClick, onCardDeleteSubmit,
  } = props;
  const [showContent, setShowContent] = useState<boolean>(false);
  const [cards, setCards] = useState<ICard[]>(propsCards || []);
  const [deletedCardId, setDeletedCardId] = useState<number>();
  const [cardDeleteModal, setCardDeleteModal] = useState<boolean>(false);

  useEffect(
    () => {
      setCards(propsCards || []);
    },
    [propsCards],
  );

  const handleCardDeleteClick = (cardId: number) => {
    setDeletedCardId(cardId);
    setCardDeleteModal(true);
  };

  const onCancelDeleteCardModal = () => {
    setDeletedCardId(undefined);
    setCardDeleteModal(false);
  };

  const handleSubmitCardDeleteModal = () => {
    deletedCardId && onCardDeleteSubmit(deletedCardId);
    setCardDeleteModal(false);
  };

  return (
    <div className={classNames('trial p-24', className)}>
      <div className="trial__header d-flex align-items-center justify-content-between">
        <div>
          <div className="header__title d-flex align-items-center">
            <Typography variant="textmed">Испытание {index + 1}:</Typography>
            <Typography variant="text" className="mx-8">"{name}"</Typography>
            <EditIcon className="title__icon game-creation-edition__icon mr-16" />
            <DeleteIcon className="title__icon game-creation-edition__icon"/>
          </div>
          <Typography variant="subtext" color="grey_additional_1">"{description}"</Typography>
        </div>
        <div className="d-flex align-items-center">
          <FilterArrow
            color="#7A7B82"
            className="game-creation-edition__arrow cursor-pointer mr-20"
            direction={showContent ? 'up' : 'down'}
            onClick={() => setShowContent(prevState => !prevState)}
          />
          <MenuIcon
            className={classNames('module__drag-icon', { handle: !disabled })}
          />
        </div>
      </div>
      {showContent && (
        <div className="mt-48">
          <Typography variant="textmed" className="mb-24">Карточки испытания</Typography>
          <ReactSortable
            handle=".level-handle"
            list={cards}
            setList={setCards}
          >
            {cards.map((item, index) => (
              <CardInformationBlock
                disabled={disabled}
                key={index}
                index={index}
                className="mb-24"
                {...item}
                onDeleteClick={handleCardDeleteClick}
              />
            ))}
          </ReactSortable>
          <div className="d-flex align-items-center">
            <Button
              disabled={disabled}
              type="link"
              variant="subtext"
              className="d-flex align-items-center"
              onClick={() => onCardAddClick()}
            >
              <Typography variant="text" className="mr-4">+</Typography>
              Добавить карточку
            </Button>
            <Typography variant="subtext" color="grey_additional_1" className="mx-16">или</Typography>
            <Button
              disabled={disabled}
              type="link"
              variant="subtext"
            >
              Создать новую
            </Button>
          </div>
        </div>
      )}
      {cardDeleteModal && (
        <Modal
          title="Удаление карточки"
          deleteLabel="Удалить"
          cancelLabel="Отмена"
          onDeleteClick={handleSubmitCardDeleteModal}
          onCloseClick={onCancelDeleteCardModal}
        >
          <Typography variant="text" className="px-32">Вы действительно хотите удалить данную карточку?</Typography>
        </Modal>
      )}
    </div>
  );
}

export default Trial;
