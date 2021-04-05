import { GameWebTypes } from 'src/store/game/types';

export namespace MyGamesTypes {
  export interface IProps {
    companyId: number;
    webGames?: GameWebTypes.IRenderProps;
    getGames?(bodyParams: GameWebTypes.IQueryProps): void;
    webGamesLoading?: boolean;
    getPopularGames?(bodyParams: GameWebTypes.IQueryProps): void;
    webPopularGames?: GameWebTypes.IRenderProps;
    webPopularGamesLoading?: boolean;
  }
}
