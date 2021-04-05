import React, { useContext, useState, useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs';

import Typography from 'src/components/atoms/Typography';
import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import Modal from 'src/components/molecules/Modal';
import Level from 'src/components/organisms/GameCreationEdition/Content/Level';
import LevelAdditionEdition from 'src/components/organisms/GameCreationEdition/Content/Level/LevelAdditionEdition';
import GameContext from 'src/components/organisms/GameCreationEdition/GameContext';
import ModalCardAddition from 'src/components/organisms/ModalCardAddition';

import { ReactComponent as PlusIcon } from 'src/assets/img/icons/plus.svg';
import FlagIcon from 'src/assets/img/icons/flag.svg';

import { Status } from 'src/store/course/types';
import { ICard } from 'src/components/molecules/CardInfomationBlock/types';
import { ContentTypes } from 'src/components/organisms/GameCreationEdition/Content/types';
import { LevelAdditionEditionTypes } from 'src/components/organisms/GameCreationEdition/Content/Level/types';
import { GameCreationEditionTypes } from 'src/components/organisms/GameCreationEdition/types';
import 'src/components/organisms/GameCreationEdition/Content/index.scss';

function Content(props: ContentTypes.IProps) {
  const { type, companyId } = props;
  const { gameData, setStep, levels, setLevels } = useContext(GameContext);
  const [showLevelAddition, setShowLevelAddition] = useState<boolean>(false);
  const [selectedLevelIndex, setSelectedLevelIndex] = useState<number>();
  const [cardAdditionData, setCardAdditionData] = useState<ContentTypes.ICardAdditionData>();
  const [cardError, setCardError] = useState<string>();

  const levelAdditionEditionActionHandle = (
    action: 'cancel' | 'submit', data?: LevelAdditionEditionTypes.IData, type?: 'create' | 'edit',
  ) => {
    if (action === 'cancel') {
      setSelectedLevelIndex(undefined);
      setShowLevelAddition(false);
      return;
    }
    if (!data || !type) return;
    const newLevel: GameCreationEditionTypes.ILevel = {
      id: data.id,
      name: data.name,
      description: data.description,
      tests: typeof selectedLevelIndex === 'number' ? levels[selectedLevelIndex].tests : [],
      homeworks: typeof selectedLevelIndex === 'number' ? levels[selectedLevelIndex].homeworks : [],
    };
    const newLevels = type === 'create' ?
      [...levels, newLevel] :
      [...levels.slice(0, selectedLevelIndex), newLevel, ...levels.slice((selectedLevelIndex || 0) + 1)];
    setLevels(newLevels);
    setShowLevelAddition(false);
  };

  const handleEditedLevelIndex = (index: number) => {
    setSelectedLevelIndex(index);
    setShowLevelAddition(true);
  };

  const handleCardAddClick = (trialIndex: number, levelIndex: number) => {
    setCardAdditionData({ trialIndex, levelIndex });
  };

  const onCardAddClick = () => {
    if (!cardAdditionData?.card) return;
    const { card, levelIndex, trialIndex } = cardAdditionData;
    const curLevel = levels[levelIndex];
    const curTrial = curLevel.tests[trialIndex];
    const tests = curLevel.tests;

    if (!curTrial.cards?.find((e) => e.id === card.id)) {
      const newTrialData = {
        ...curTrial,
        cards: [...curTrial.cards, card],
        cardIds: [...curTrial.cards?.map(e => +e.id), card?.id],
      };
      const newTrials = [...tests.slice(0, trialIndex), newTrialData, ...tests.slice(trialIndex + 1)];
  
      const newLevel = {
        id: curLevel.id,
        name: curLevel.name,
        description: curLevel.description,
        tests: newTrials,
        homeworks: typeof selectedLevelIndex === 'number' ? levels[selectedLevelIndex].homeworks : [],
      };
      const newLevels = [...levels.slice(0, levelIndex), newLevel, ...levels.slice(levelIndex + 1)];
      setLevels(newLevels);
      setCardAdditionData(undefined);
    } else {
      setCardError('Данная карточка была добавлена в испытание');
    }
  };

  useEffect(() => {
    if (cardAdditionData) {
      const { card, levelIndex, trialIndex } = cardAdditionData;
      const curLevel = levels[levelIndex];
      const curTrial = curLevel.tests[trialIndex];
      if (!curTrial.cards?.find((e) => e.id === card?.id)) {
        setCardError('');
      }
    }
  }, [cardAdditionData]);

  const handleCardDelete = (levelIndex: number, trialIndex: number, cardId: number) => {
    if (!cardId) return;
    const curLevel = levels[levelIndex];
    const curTrial = curLevel.tests[trialIndex];
    const tests = curLevel.tests;

    const newTrial = {
      ...curTrial,
      cards: curTrial.cards?.filter((e) => e.id !== cardId),
      cardIds: curTrial.cardIds?.filter((e) => e !== cardId)
    };
    
    const newTrials = [...tests.slice(0, trialIndex), newTrial, ...tests.slice(trialIndex + 1)];
  
    const newLevel = {
      id: curLevel.id,
      name: curLevel.name,
      description: curLevel.description,
      tests: newTrials,
      homeworks: typeof selectedLevelIndex === 'number' ? levels[selectedLevelIndex].homeworks : [],
    };

    const newLevels = [...levels.slice(0, levelIndex), newLevel, ...levels.slice(levelIndex + 1)];
    setLevels(newLevels);
  };

  return (
    <div className="content d-flex flex-column">
      <div className="content__block px-24 py-32 d-flex flex-column">
        <Typography variant="h1" className="mb-32">Контент</Typography>
        {!showLevelAddition ? (
          <>
            {levels.length > 0 && (
              <div>
                <ReactSortable
                  handle=".level-handle"
                  list={levels}
                  setList={setLevels}
                >
                  {levels.map((item, index) => (
                    <Level
                      key={index}
                      index={index}
                      className="mb-24" {...item}
                      tests={[...item.tests]}
                      homeworks={[...item.homeworks || []]}
                      handleEditedIndex={handleEditedLevelIndex}
                      handleCardAddClick={handleCardAddClick}
                      handleCardDelete={handleCardDelete}
                    />
                  ))}
                </ReactSortable>
              </div>
            )}
            <Button
              type="black-icon"
              variant="textmed"
              className="content__module-button align-self-start"
              disabled={gameData.status === Status.PUBLISHED}
              onClick={() => setShowLevelAddition(true)}
            >
              <PlusIcon className="module-button__plus-icon mr-8" />
              Добавить уровень
            </Button>
            <div className="line my-32" />
            <div className="content__final-exam px-24 py-24 d-flex align-items-center">
              <Image src={FlagIcon} className="final-exam__icon mr-16" alt="flag icon" />
              <Typography variant="h2" color="grey_additional_2">Финальный экзамен</Typography>
            </div>
            <Typography
              color="grey_additional_1"
              variant="subtext"
              className="mt-8"
            >
              Финальный экзамен будет создан из вопросов в тестах
            </Typography>
          </>
        ) : (
          <LevelAdditionEdition
            type={type}
            isLevel={true}
            onActionClick={levelAdditionEditionActionHandle}
            data={typeof selectedLevelIndex === 'number' ? {
              id: levels[selectedLevelIndex].id,
              name: levels[selectedLevelIndex].name,
              description: levels[selectedLevelIndex].description,
            } : undefined}
          />
        )}
      </div>
      <div className="align-self-end d-flex align-items-center mt-32">
        <Button variant="textmed" type="link-black" onClick={() => setStep(1)}>Назад</Button>
        <Button variant="textmed" className="next-button ml-24" onClick={() => setStep(3)}>Далее</Button>
      </div>
      {cardAdditionData && (
        <Modal
          width={976}
          title="Добавление карточки"
          saveLabel="Добавить"
          cancelLabel="Отмена"
          isSaveButtonDisable={!cardAdditionData.card}
          onCloseClick={() => setCardAdditionData(undefined)}
          onSaveClick={onCardAddClick}
        >
          <ModalCardAddition
            companyId={companyId}
            getSelectedCard={(card: ICard) => setCardAdditionData({ ...cardAdditionData, card })}
            cardError={cardError}
          />
        </Modal>
      )}
    </div>
  );
}

export default Content;
