import React, { useContext, useState } from 'react';
import Image from 'src/components/atoms/Image';
import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';
import CancelIcon from 'src/components/atoms/Svg/Icons/cancel';
import Modal from 'src/components/molecules/Modal';
import ModalCardAddition from 'src/components/organisms/ModalCardAddition';
import TaskCreationContext from 'src/components/organisms/TaskCreationEdition/TaskCreationContext';
import { DEFAULT_CARD_VALUES } from 'src/components/molecules/SearchCard/consts';
import { ReactComponent as IconEdit } from 'src/assets/img/icons/edit.svg';
import { ICard } from 'src/components/molecules/CardInfomationBlock/types';
import { TaskContentTypes } from 'src/components/organisms/TaskCreationEdition/Content/types';

function ArticleAudioVideoContent(props: TaskContentTypes.ArticleAudioVideoProps) {

  const { cards, setCard, handleCardCreateClick, companyId, setCurrentEditCard } = props;
  const [selectedCard, setSelectedCard] = useState<ICard>(DEFAULT_CARD_VALUES);
  const [modalAddCard, setModalAddCard] = useState<boolean>(false);
  const { taskData, setTaskData } = useContext(TaskCreationContext);

  const handleNewSelectedCard = (card: ICard) => setSelectedCard(card);

  const handleSaveCard = () => {
    setCard([selectedCard]);
    setTaskData({
      ...taskData,
      mainCardId: selectedCard.id,
      cardIds: [selectedCard.id],
      minutesToFinish: selectedCard.minutesToFinish || 0,
      mainCardContent: selectedCard.content,
      mainCardDescription: selectedCard.description,
    });
    setModalAddCard(false);
  };

  const handleEditCard = (id: number) => {
    setCurrentEditCard(id);
    handleCardCreateClick('edit');
  };

  return (
    <>
      <Typography variant="text-med" className="mt-32">
        Карточки
      </Typography>
      {cards[0] ?
        <>
          <div className="d-flex align-items-center justify-content-between task-creation-content__body__card p-16 mt-8 mr-32">
            <div className="d-flex align-items-center">
              <Image alt="Card Icon" src={cards[0].imageThumbnailUrl || ''} className="body__card__img" />
              <Typography variant="subtext" className="ml-16">
                {cards[0].name}
              </Typography>
            </div>
            <div>
              <IconEdit onClick={() => handleEditCard(cards[0].id)} className="task-creation-icon"/>
              <CancelIcon
                color="#7A7B82"
                className="task-creation-icon cursor-pointer ml-16"
                onClick={() => setCard([])}
              />
            </div>
          </div>
          <Button
            type="link"
            variant="subtext"
            className="text-left mt-24 mb-24"
            onClick={() => setModalAddCard(true)}
          >
            Поменять карточку
          </Button>
        </> :
        <>
          <div className="d-flex align-items-center pb-24 mt-24 task-creation-content__body__links">
            <Button
              type="link"
              variant="subtext"
              onClick={() => setModalAddCard(true)}
              className="d-flex align-items-center"
            >
              <Typography variant="text" className="mr-4">+</Typography>
              Добавить карточку
            </Button>
            <Typography variant="subtext" color="grey_additional_1" className="mx-16">или</Typography>
            <Button
              type="link"
              variant="subtext"
              onClick={() => handleCardCreateClick('create')}
            >
              Создать новую
            </Button>
          </div>
        </>
      }
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
    </>
  );
}

export default ArticleAudioVideoContent;
