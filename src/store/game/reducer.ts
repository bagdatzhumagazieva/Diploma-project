import { ActionType, ILoadTypes, IPaginationResponseTypes } from 'src/core/store/types';
import { combineReducers } from 'redux';
import {
  GameAdminTypes,
  GameTypes,
  GET_GAME_BY_ID,
  GET_GAMES_ADMIN_AGGREGATOR,
  GET_GAMES_WEB_AGGREGATOR,
  GameWebTypes,
  GET_POPULAR_GAMES_WEB_AGGREGATOR,
} from 'src/store/game/types';
import { parseAdminGames, parseGameData, parseWebGames } from 'src/store/game/parsers';

const game = (
  state = { data: null, loading: false },
  action: ActionType<IPaginationResponseTypes<{ data: any }>>,
): ILoadTypes<GameTypes.Game | null> => {
  switch (action.type) {
    case GET_GAME_BY_ID.started:
      return {
        data: null,
        loading: true,
      };
    case GET_GAME_BY_ID.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_GAME_BY_ID.clear:
      return {
        data: null,
        loading: false,
      };
    case GET_GAME_BY_ID.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsedGame = parseGameData(action.data);
      return {
        data: parsedGame,
        loading: false,
      };
    default:
      return state;
  }
};

const adminGames = (
  state = { data: null, loading: false },
  action: ActionType<GameAdminTypes.IResponseProps>,
): ILoadTypes<GameAdminTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_GAMES_ADMIN_AGGREGATOR.started:
      return {
        data: null,
        loading: true,
      };
    case GET_GAMES_ADMIN_AGGREGATOR.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_GAMES_ADMIN_AGGREGATOR.clear:
      return {
        data: null,
        loading: false,
      };
    case GET_GAMES_ADMIN_AGGREGATOR.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsedGame = parseAdminGames(action.data);
      return {
        data: parsedGame,
        loading: false,
      };
    default:
      return state;
  }
};

const webGames = (
  state = { data: null, loading: false },
  action: ActionType<GameWebTypes.IResponseProps>,
): ILoadTypes<GameWebTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_GAMES_WEB_AGGREGATOR.started:
      return {
        data: null,
        loading: true,
      };
    case GET_GAMES_WEB_AGGREGATOR.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_GAMES_WEB_AGGREGATOR.clear:
      return {
        data: null,
        loading: false,
      };
    case GET_GAMES_WEB_AGGREGATOR.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsedGame = parseWebGames(action.data);
      return {
        data: parsedGame,
        loading: false,
      };
    default:
      return state;
  }
};

const webPopularGames = (
  state = { data: null, loading: false },
  action: ActionType<GameWebTypes.IResponseProps>,
): ILoadTypes<GameWebTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_POPULAR_GAMES_WEB_AGGREGATOR.started:
      return {
        data: null,
        loading: true,
      };
    case GET_POPULAR_GAMES_WEB_AGGREGATOR.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_POPULAR_GAMES_WEB_AGGREGATOR.clear:
      return {
        data: null,
        loading: false,
      };
    case GET_POPULAR_GAMES_WEB_AGGREGATOR.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsedGame = parseWebGames(action.data);
      return {
        data: parsedGame,
        loading: false,
      };
    default:
      return state;
  }
};

const gameReducer = combineReducers({
  game,
  adminGames,
  webGames,
  webPopularGames,
});

export default gameReducer;
