import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';
import useNotification from 'src/components/molecules/Notification/useNotification';

import { createGame, getGameById, clearGame, updateGame } from 'src/store/game/actions';
import { AdminRouterPaths } from 'src/core/enum';

import Typography from 'src/components/atoms/Typography';
import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import Stepper from 'src/components/atoms/Stepper';
import GameContext from 'src/components/organisms/GameCreationEdition/GameContext';
import GeneralInformation from 'src/components/organisms/GameCreationEdition/GeneralInformation';
import Reward from 'src/components/organisms/GameCreationEdition/Reward';
import Content from 'src/components/organisms/GameCreationEdition/Content';
import Preview from 'src/components/organisms/GameCreationEdition/Preview';

import DeleteIcon from 'src/assets/img/icons/delete.svg';
import SaveIcon from 'src/assets/img/icons/save.svg';
import CheckIcon from 'src/assets/img/icons/check.svg';

import { DEFAULT_GAME_DATA, CREATION_STEPS } from 'src/components/organisms/GameCreationEdition/consts';
import { GameCreationEditionTypes } from 'src/components/organisms/GameCreationEdition/types';
import { DEFAULT_NOTIFICATION_DATA } from 'src/components/organisms/CourseCreationEdition/consts';
import 'src/components/organisms/GameCreationEdition/index.scss';

function GameCreationEdition(props: GameCreationEditionTypes.IProps) {
  const  {
    type, companyId, createGame, state, gameId,
    getGameById: actionGetGameById, game, updateGame } = props;
  const notification = useNotification();
  const history = useHistory();
  const [step, setStep] = useState<number>(0);
  const [gameData, setGameData] = useState<GameCreationEditionTypes.IGame>(DEFAULT_GAME_DATA);
  const [levels, setLevels] = useState<GameCreationEditionTypes.ILevel[]>([]);
  const value = { step, setStep, gameData, setGameData, levels, setLevels };

  const getStepData = () => {
    switch (step) {
      case 0: return <GeneralInformation companyId={companyId} />;
      case 1: return <Reward />;
      case 2: return <Content type={type} companyId={companyId}/>;
      default: return <Preview />;
    }
  };

  const onSaveClick = () => {
    const body = {
      ...gameData,
      levels,
    };
    if (type === 'create') {
      createGame && createGame(body, {
        onSuccess: (response: any) => {
          if (!response || typeof response.id !== 'number') {
            return;
          }
          history.push(`/admin/${AdminRouterPaths.GAME_EDITION}/${response.id}`, { isJustCreated: true });
        },
      });
    } else {
      updateGame && updateGame(gameId || 0, body, {
        onSuccess: (response: any) => {
          if (!response || typeof response.id !== 'number') {
            return;
          }
          notification.add(
            {
              ...DEFAULT_NOTIFICATION_DATA,
              description: 'Изменения успешно сохранены.',
            });
        },
      });
    }
  };

  const getGameById = () => {
    if (typeof gameId === 'number') {
      actionGetGameById && actionGetGameById(gameId, companyId);
    }
  };

  useEffect(
    () => {
      if (state && state.isJustCreated) {
        notification.add({ ...DEFAULT_NOTIFICATION_DATA, description: 'Курс успешно создан' });
      }
      if (type === 'edit') {
        getGameById();
      }

      return () => {
        clearGame && clearGame();
      };
    },
    [],
  );

  useEffect(
    () => {
      if (!game) return;
      if (type === 'edit') {
        const { levels, ...rest } = game;
        if (Array.isArray(levels)) {
          setLevels([...levels]);
        }
        setGameData({ ...rest, id: rest.id || 0 });
      }
    },
    [game],
  );

  return (
    <GameContext.Provider value={value}>
      <div className="game-creation-edition grid pt-32">
        <div className="game-creation-edition__header d-flex justify-content-between align-items-center">
          <Typography variant="headline">{`${type === 'edit' ? 'Редактирование' : 'Создание'} игры`}</Typography>
          <div className="d-flex align-items-center">
            <Typography
              variant="tag"
              className={`mr-32 game-creation-edition__text-status game-creation-edition__text-status--${gameData.status}`}
            >
              <div className={`text-status_circle mr-8 d-inline-block text-status_circle--${gameData.status}`} />
              В черновике
            </Typography>
            <Button
              variant="textmed"
              type="black-icon"
              className="py-16 px-24 mr-16"
            >
              <Image
                alt="delete icon"
                className="mr-8"
                src={DeleteIcon}
              />
              Удалить
            </Button>
            <Button
              variant="textmed"
              type="black-icon"
              className="py-16 px-24 mr-16"
              onClick={onSaveClick}
            >
              <Image alt="save icon" className="mr-8" src={SaveIcon} />
              Сохранить
            </Button>
            {type === 'create' ? (
              <Button
                variant="textmed"
                className="py-16 px-24 d-flex align-items-center justify-content-center"
              >
                <Image alt="check icon" className="mr-8" src={CheckIcon} />
                В Черновик
              </Button>
            ) : (
              <Button
                variant="textmed"
                className="py-16 px-24 d-flex align-items-center justify-content-center"
              >
                <Image alt="check icon" className="mr-8" src={CheckIcon} />
                Опубликовать
              </Button>
            )}
          </div>
        </div>
        <div className="game-creation-edition__block mt-32 d-flex justify-content-between pos_relative">
          <div className="game-creation-edition__sidebar d-flex flex-column">
            <Stepper
              isStepsNumbered
              steps={CREATION_STEPS}
              currentStep={step}
              onStepClick={setStep}
            />
            <Button
              type="outlined"
              variant="textmed"
              className="mt-32"
              to={`/admin/${AdminRouterPaths.CONTENT}?type=games`}
            >
              Выйти
            </Button>
          </div>
          <div className="game-creation-edition__content">
            {getStepData()}
          </div>
        </div>
      </div>
    </GameContext.Provider>
  );
}

const mapStateToProps = (state: any) => ({
  game: state.gameReducer.game.data,
});

const mapDispatchToProps = {
  createGame,
  getGameById,
  updateGame,
};

export default connect<any, any>(
  mapStateToProps , mapDispatchToProps,
)(withNotificationProvider(GameCreationEdition));
