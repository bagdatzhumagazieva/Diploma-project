import React from 'react';
import { GameCreationEditionTypes } from 'src/components/organisms/GameCreationEdition/types';
import { DEFAULT_GAME_DATA } from 'src/components/organisms/GameCreationEdition/consts';

export interface IProps {
  step: number;
  setStep(step: number): void;
  gameData: GameCreationEditionTypes.IGame;
  setGameData(gameData: GameCreationEditionTypes.IGame): void;
  levels: GameCreationEditionTypes.ILevel[];
  setLevels(levels: GameCreationEditionTypes.ILevel[]): void;
}

const defaultValues: IProps = {
  step: 0,
  setStep: (step: number) => {},
  gameData: DEFAULT_GAME_DATA,
  setGameData: (gameData: GameCreationEditionTypes.IGame) => {},
  levels: [],
  setLevels: (levels: GameCreationEditionTypes.ILevel[]) => {},
};

const CourseCreationContext = React.createContext<IProps>(defaultValues);

export default CourseCreationContext;
