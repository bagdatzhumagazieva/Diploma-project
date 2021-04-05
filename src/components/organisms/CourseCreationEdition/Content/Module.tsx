import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { ReactSortable } from 'react-sortablejs';

import useNotification from 'src/components/molecules/Notification/useNotification';

import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import FilterArrow from 'src/components/atoms/Svg/Table/filterArrow';
import Image from 'src/components/atoms/Image';
import Modal from 'src/components/molecules/Modal';
import CardInformationBlock from 'src/components/molecules/CardInfomationBlock';
import ModalCardAddition from 'src/components/organisms/ModalCardAddition';
import CourseCreationContext from 'src/components/organisms/CourseCreationEdition/CourseCreationContext';

import TasksIcon from 'src/components/atoms/Svg/Sidebar/tasks';
import { ReactComponent as DeleteIcon } from 'src/assets/img/icons/delete.svg';
import { ReactComponent as EditIcon } from 'src/assets/img/icons/edit.svg';
import { ReactComponent as MenuIcon } from 'src/assets/img/icons/menu.svg';

import { CardModuleTypes } from 'src/components/organisms/CourseCreationEdition/Content/types';
import { ICard } from 'src/components/molecules/CardInfomationBlock/types';
import { ModuleStatus } from 'src/store/module/types';
import { DEFAULT_CARD_VALUES } from 'src/components/molecules/SearchCard/consts';
import { NotificationType } from 'src/components/molecules/Notification/types';
import './index.scss';

function CardModule(props: CardModuleTypes.IProps) {
  const {
    imageThumbnail, name, description, className,
    id, index, onEditClick, companyId, onDeleteClick, disabled,
    handleCardCreateClick, handleCardEditClick,
  } = props;

  const [showContent, setShowContent] = useState<boolean>(false);
  const [showModalCardAddition, setShowModalCardAddition] = useState<boolean>(false);
  const [newCard, setNewCard] = useState<ICard>(DEFAULT_CARD_VALUES);
  const [deletedCardId, setDeletedCardId] = useState<number>();
  const [showDeleteCardModal, setShowDeleteCardModal] = useState<boolean>(false);
  const {
    mapCards, setMapCards, modules, setModules,
    isCourseDataUpdated, setCourseDataUpdated,
  } = useContext(CourseCreationContext);
  const notification = useNotification();
  const cards = mapCards.get(id);
  const [cardError, setCardError] = useState<string>();

  const handleNewSelectedCard = (card: ICard) => setNewCard(card);

  const updateModules = (id: string, cards: ICard[]) => {
    const newModules = [...modules];
    const updatedModuleIndex = newModules.findIndex(item => item.id === id);
    if (updatedModuleIndex === -1) return;
    newModules[updatedModuleIndex].cardIds = cards.map(item => item.id);

    if (newModules[updatedModuleIndex].status !== ModuleStatus.NEW) {
      newModules[updatedModuleIndex].status = ModuleStatus.EDITED;
    }

    setModules(newModules);
  };

  const onNewCardAddClick = () => {
    if (newCard.id) {
      if (!cards?.find(e => e.id === newCard.id)) {
        setShowModalCardAddition(false);
        const newMapCards = new Map<string, ICard[]>(mapCards);
        const newCards = [...(newMapCards.get(id) || []), newCard];
        newMapCards.set(id, newCards);
        updateModules(id, newCards);
        setMapCards(newMapCards);
        !isCourseDataUpdated && setCourseDataUpdated(true);
      } else {
        setCardError('Данная карточка была добавлена в модуль');
      }
    }
  };

  useEffect(() => {
    if (!cards?.find(e => e.id === newCard.id)) {
      setCardError('');
    }
  }, [newCard.id]);

  const onModalCardAdditionCancelClick = () => {
    setCardError('');
    setNewCard(DEFAULT_CARD_VALUES);
    setShowModalCardAddition(false);
  };

  const onCardDeleteClick = (cardId: number) => {
    setDeletedCardId(cardId);
    setShowDeleteCardModal(true);
  };

  const onSubmitDeleteCardModal = (cardId: number | undefined) => {
    if (!cardId) return;
    const newMapCards = new Map<string, ICard[]>(mapCards);
    const newCards = newMapCards.get(id)?.filter(item => item.id !== cardId) || [];
    updateModules(id, newCards);
    newMapCards.set(id, newCards || []);
    setMapCards(newMapCards);
    setShowDeleteCardModal(false);
    !isCourseDataUpdated && setCourseDataUpdated(true);
    notification.add(
      {
        type: NotificationType.Success,
        duration: 5000,
        description: 'Карточка успешна удалена',
        width: '600px',
        withIcon: true,
        size: 'small',
      });
  };

  const onCancelDeleteCardModal = () => {
    setDeletedCardId(undefined);
    setShowDeleteCardModal(false);
  };

  const isDataOrderChanged = (oldCards: ICard[], newCards: ICard[]) => {
    if (oldCards.length !== newCards.length) return true;
    const len = oldCards.length;
    for (let index = 0; index < len; index += 1) {
      if (oldCards[index].id !== newCards[index].id) return true;
    }
    return false;
  };

  const onCardsOrderChange = (cards: ICard[]) => {
    if (!isDataOrderChanged(mapCards.get(id) || [], cards)) return;
    const newMapCards = new Map<string, ICard[]>(mapCards);
    updateModules(id, cards);
    newMapCards.set(id, cards);
    setMapCards(newMapCards);
    !isCourseDataUpdated && setCourseDataUpdated(true);
  };

  const onCardEditClick = (cardId: number, index: number) =>
    handleCardEditClick && handleCardEditClick(cardId, index, id);

  return (
    <div
      id={id}
      className={classNames('module px-24 py-24', { 'module--disable': disabled }, className)}
    >
      <div className="module__header d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <Image className="module__image" alt="module image" src={imageThumbnail} />
          <div className="header__content ml-8">
            <div className="d-flex align-items-center mb-4 cursor-pointer header__title">
              <Typography variant="textmed" className="mr-8">Модуль {index + 1}:</Typography>
              <Typography variant="text" className="mr-8">"{name}"</Typography>
              <EditIcon className="module__icon module__icon--edit mr-16" onClick={onEditClick} />
              <DeleteIcon className="module__icon" onClick={() => onDeleteClick && onDeleteClick(id)} />
            </div>
            <Typography variant="subtext">"{description}"</Typography>
          </div>
        </div>
        <div className="d-flex">
          <FilterArrow
            color="#7A7B82"
            className="header__arrow cursor-pointer mr-20"
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
          <Typography variant="textmed" className="mb-24">Карточки модуля</Typography>
          {cards && (
            <div className="module__cards">
              <ReactSortable
                handle=".handle"
                list={cards}
                setList={onCardsOrderChange}
              >
                {cards.map((item, index) => (
                  <CardInformationBlock
                    key={`card-${index}-${item.id}`}
                    id={item.id}
                    index={index}
                    name={item.name}
                    disabled={disabled}
                    imageThumbnailUrl={item.imageThumbnailUrl}
                    onDeleteClick={onCardDeleteClick}
                    onEditClick={onCardEditClick}
                    className="mb-24"
                  />
                ))}
              </ReactSortable>
            </div>
          )}
          <div className="d-flex align-items-center">
            <Button
              disabled={disabled}
              type="link"
              variant="subtext"
              onClick={() => handleCardCreateClick && handleCardCreateClick(id)}
            >
              Создать новую
            </Button>
          </div>
          <div className="line my-24" />
          <div className="module__test-block mb-8 px-16 py-16 d-flex align-items-center">
            <TasksIcon />
            <Typography
              variant="subtextmed"
              color="grey_additional_1"
              className="ml-16"
            >
              Тест
            </Typography>
          </div>
          <Typography
            variant="subtext"
            color="grey_additional_1"
          >
            Тест будет создан на основе вопросов из выбранных карточек
          </Typography>
        </div>
      )}
      {showModalCardAddition && (
        <Modal
          width={976}
          title="Добавление карточки"
          saveLabel="Добавить"
          cancelLabel="Отмена"
          onSaveClick={() => newCard && onNewCardAddClick()}
          onCloseClick={onModalCardAdditionCancelClick}
        >
          <ModalCardAddition getSelectedCard={handleNewSelectedCard} companyId={companyId} cardError={cardError} />
        </Modal>
      )}
      {showDeleteCardModal && (
        <Modal
          title="Удаление карточки"
          deleteLabel="Удалить"
          cancelLabel="Отмена"
          onDeleteClick={() => onSubmitDeleteCardModal(deletedCardId)}
          onCloseClick={onCancelDeleteCardModal}
        >
          <Typography variant="text" className="px-32">Вы действительно хотите удалить данную карточку?</Typography>
        </Modal>
      )}
    </div>
  );
}

export default CardModule;
