import React, { useContext, useEffect, useState } from 'react';

import Image from 'src/components/atoms/Image';
import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import CancelIcon from 'src/components/atoms/Svg/Icons/cancel';
import Modal from 'src/components/molecules/Modal';
import ModalCardAddition from 'src/components/organisms/ModalCardAddition';
import TaskCreationContext from 'src/components/organisms/TaskCreationEdition/TaskCreationContext';

import { DEFAULT_CARD_VALUES } from 'src/components/molecules/SearchCard/consts';
import { ICard } from 'src/components/molecules/CardInfomationBlock/types';
import { TaskContentTypes } from 'src/components/organisms/TaskCreationEdition/Content/types';
import { ReactComponent as IconEdit } from 'src/assets/img/icons/edit.svg';

function TestQuizContent(props: TaskContentTypes.TestQuizProps) {
  const { cards, setCard, handleCardCreateClick, companyId, setCurrentEditCard } = props;
  const { taskData, setTaskData } = useContext(TaskCreationContext);

  const [modalAddCard, setModalAddCard] = useState<boolean>(false);
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [selectedCard, setSelectedCard] = useState<ICard>(DEFAULT_CARD_VALUES);
  const [currentCard, setCurrentCard] = useState<number | null>();

  useEffect(() => {
    if (cards.length) {
      setTaskData({
        ...taskData,
        mainCardId: +cards[0].id,
        cardIds: cards.map(e => +e.id),
        minutesToFinish: cards.reduce((prev, next) => prev + (next.minutesToFinish || 0), 0),
      });
    }
  },        [cards]);

  const handleDelete = (id: number) => {
    setModalDelete(true);
    setCurrentCard(id);
  };

  const handleEdit = (id: number) => {
    setCurrentCard(id);
    setCurrentEditCard(id);
    handleCardCreateClick('edit');
  };

  const handleNewSelectedCard = (card: ICard) => {
    setSelectedCard(card);
  };

  const handleSaveCard = () => {
    if (selectedCard.id !== -1) {
      setCard([...cards, selectedCard]);
      setModalAddCard(false);
    }
  };

  const onDeleteCard = () => {
    const newCard = cards.filter(e => e.id !== currentCard);
    setCard(newCard);
    setModalDelete(false);
  };

  return (
    <>
      <Typography variant="text-med" className="mt-32">
        Содержимое
      </Typography>
      {cards.map((item, i) => (
        <div key={i}>
          {i === 0 ?
            <Typography variant="subtext" className="mt-24">Основной контент</Typography> :
            i === 1 ?
              <div className="d-flex flex-column">
              <Typography variant="subtext" className="mt-24">Второстепенный</Typography>
              <Typography variant="xsmall" color="grey_additional_1" className="mt-8">
                Вы можете добавить вопрос с карточки, но контент будет
                недоступен, так как карточка не является основной
              </Typography>
            </div> : <></>
          }
          <div className="d-flex justify-content-between align-items-center task-creation-content__body__card p-16 mt-24 mr-32">
            <div className="d-flex align-items-center" key={i}>
              <Image alt="Card Icon" src={item.imageThumbnailUrl || ''} className="body__card__img"/>
              <Typography variant="subtext" className="ml-16">
                {item.name}
              </Typography>
            </div>
            <div>
              <IconEdit
                onClick={() => handleEdit(item.id || 0)}
                className="task-creation-icon"/>
              {i !== 0 &&
                <CancelIcon
                  color="#7A7B82"
                  className="task-creation-icon cursor-pointer ml-16"
                  onClick={() => handleDelete(item.id || 0)}
                />
              }
            </div>
          </div>
        </div>
      ))}
      <div className="d-flex align-items-center pb-24 mt-24 task-creation-content__body__links">
        <Button
          type="link"
          variant="subtext"
          onClick={() => setModalAddCard(true)}
          className="d-flex align-items-center"
        >
          <Typography variant="text" className="mr-4">+</Typography>
          {!cards.length ? 'Добавить вопрос из основной карточки' : 'Добавить вопрос'}
        </Button>
        <Typography variant="subtext" color="grey_additional_1" className="mx-16">или</Typography>
        <Button
          type="link"
          variant="subtext"
          onClick={() => handleCardCreateClick('create')}
        >
          Создать новую {!cards.length && 'карточку'}
        </Button>
      </div>
      {modalAddCard && (
        <Modal
          width={976}
          title="Добавление карточки"
          saveLabel="Добавить"
          cancelLabel="Отмена"
          onSaveClick={handleSaveCard}
          onCloseClick={() => { setModalAddCard(false); }}
        >
          <ModalCardAddition getSelectedCard={handleNewSelectedCard} companyId={companyId} />
        </Modal>
      )}
      {modalDelete && (
        <Modal
          width={422}
          title="Удаление вопроса"
          cancelLabel="Отмена"
          deleteLabel="Удалить"
          onDeleteClick={onDeleteCard}
          onCloseClick={() => setModalDelete(false)}
        >
          <Typography
            variant="text"
            className="ml-32 mr-32"
          >
            Вы действительно хотите удалить данный вопрос?
          </Typography>
        </Modal>
      )}
    </>
  );
}

export default TestQuizContent;
