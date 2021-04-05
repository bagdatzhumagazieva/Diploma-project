import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { ReactSortable } from 'react-sortablejs';

import Typography from 'src/components/atoms/Typography';
import FilterArrow from 'src/components/atoms/Svg/Table/filterArrow';
import Trial from 'src/components/organisms/GameCreationEdition/Content/Level/Trial';
import Homework from 'src/components/organisms/GameCreationEdition/Content/Level/HomeWork';

import { GameCreationEditionTypes } from 'src/components/organisms/GameCreationEdition/types';
import {
  LevelAdditionEditionTypes,
  LevelTypes,
} from 'src/components/organisms/GameCreationEdition/Content/Level/types';

import { ReactComponent as MenuIcon } from 'src/assets/img/icons/menu.svg';
import { ReactComponent as EditIcon } from 'src/assets/img/icons/edit.svg';
import { ReactComponent as DeleteIcon } from 'src/assets/img/icons/delete.svg';
import Button from 'src/components/atoms/Button';
import LevelTrialAdditionEdition from 'src/components/organisms/GameCreationEdition/Content/Level/LevelAdditionEdition';
import GameContext from 'src/components/organisms/GameCreationEdition/GameContext';

function Level(props: LevelTypes.IProps) {
  const {
    index, name, description, disabled, className, tests: propsTrials, homeworks,
    handleEditedIndex,
    handleCardAddClick, handleCardDelete,
  } = props;
  const { levels, setLevels } = useContext(GameContext);
  const [showContent, setShowContent] = useState(false);
  const [tests, setTrials] = useState<GameCreationEditionTypes.ITask[]>(propsTrials);
  const [showTrialAddition, setShowTrialAddition] = useState<boolean>(false);
  const [isHW, setIsHw] = useState(false);
  const [hw, setHw] = useState<GameCreationEditionTypes.IHomework[]>(homeworks || []);

  useEffect(
    () => {
      setTrials([...propsTrials]);
      setHw([...homeworks]);
    },
    [propsTrials],
  );

  const trialAdditionActionHandle = (
    action: 'cancel' | 'submit', data?: LevelAdditionEditionTypes.IData,
  ) => {
    if (action === 'cancel') {
      setShowTrialAddition(false);
      setIsHw(false);
      return;
    }
    if (!data) return;
    const newTrial: GameCreationEditionTypes.ITask = {
      id: data.id,
      name: data.name,
      description: data.description,
      cards: [],
    };

    const newLevel = {
      ...levels[index],
      tests: [...levels[index].tests, newTrial],
    };
    const newLevels = [...levels.slice(0, index), newLevel, ...levels.slice(index + 1)];
    setLevels(newLevels);
    setShowTrialAddition(false);
    setIsHw(false);
  };

  const homeworkAdditionActionHandle = (
    action: 'cancel' | 'submit', data?: LevelAdditionEditionTypes.IData,
  ) => {
    if (action === 'cancel') {
      setShowTrialAddition(false);
      setIsHw(false);
      return;
    }
    if (!data) return;
    const newHw: GameCreationEditionTypes.IHomework = {
      id: data.id,
      name: data.name,
      description: data.description,
    };
    const newLevel = {
      ...levels[index],
      homeworks: [...levels[index].homeworks, newHw],
    };
    const newLevels = [...levels.slice(0, index), newLevel, ...levels.slice(index + 1)];
    setLevels(newLevels);
    setShowTrialAddition(false);
    setIsHw(false);
  };

  return (
    <div className={classNames('level', className)}>
      <div className="level__header d-flex justify-content-between">
        <div>
          <div className="header__title d-flex align-items-center">
            <Typography variant="textmed">Уровень {index + 1}:</Typography>
            <Typography variant="text" className="mx-8">{name}"</Typography>
            <EditIcon
              className="title__icon game-creation-edition__icon mr-16"
              onClick={() => handleEditedIndex(index)}
            />
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
            className={classNames('', { 'level-handle': !disabled })}
          />
        </div>
      </div>
      {showContent && (
        <div>
          {tests.length > 0 && (
            <div className="level__content">
              <ReactSortable
                handle=".level-handle"
                list={tests}
                setList={setTrials}
              >
                {tests.map((item, trialIndex) => (
                  <Trial
                    key={trialIndex}
                    index={trialIndex}
                    className="mb-24"
                    {...item}
                    onCardAddClick={() => handleCardAddClick(trialIndex, index)}
                    onCardDeleteSubmit={(cardId) => handleCardDelete(index, trialIndex, cardId)}
                  />
                ))}
              </ReactSortable>
            </div>
          )}
              {hw.length > 0 && (
                  hw.map((item, index) => (
                    <Homework
                      index={index}
                      key={index}
                      id={item.id}
                      name={item.name}
                      description={item.description}/>
                  ))
                )
              }
          {!showTrialAddition ? (
            <div className="d-flex align-items-center mt-24">
              <Button
                disabled={disabled}
                type="link"
                variant="subtext"
                className="d-flex align-items-center"
                onClick={() => setShowTrialAddition(true)}
              >
                <Typography variant="text" className="mr-4">+</Typography>
                Добавить испытание
              </Button>
              {/*<Typography variant="subtext" color="grey_additional_1" className="mx-16">или</Typography>*/}
              {/*<Button*/}
              {/*  disabled={disabled}*/}
              {/*  type="link"*/}
              {/*  variant="subtext"*/}
              {/*  onClick={() => (setShowTrialAddition(true), setIsHw(true))}*/}
              {/*>*/}
              {/*  Домашнее задание*/}
              {/*</Button>*/}
            </div>
          ) : (
             (isHW) ?
              <LevelTrialAdditionEdition type={'create'} isHw={true} onActionClick={homeworkAdditionActionHandle} />
              :<LevelTrialAdditionEdition type={'create'} onActionClick={trialAdditionActionHandle} />
          )}
        </div>
      )}
      <div className="game-creation-edition__line mt-16" />
    </div>
  );
}

export default Level;
