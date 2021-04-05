import {
  GameTypes,
  CREATE_GAME,
  GET_GAME_BY_ID,
  GameAdminTypes,
  GET_GAMES_ADMIN_AGGREGATOR,
  DELETE_GAME,
  UPDATE_GAME,
  GameWebTypes,
  GET_GAMES_WEB_AGGREGATOR,
  GAME_TO_PUBLISH,
  GAME_TO_DRAFT,
  GET_POPULAR_GAMES_WEB_AGGREGATOR, GET_PLAY_GAME,
} from 'src/store/game/types';
import { defaultAction } from 'src/store/defaultActions';
import { LOCAL_STORAGE } from 'src/core/store/values';
import * as api from 'src/store/game/api';

export const createGame = (bodyParams: GameTypes.Game, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: CREATE_GAME,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || '';
      if (typeof +companyId !== 'number') return;
      return api.createGame(
        bodyParams, +companyId, token || getState().authReducer.login.data.token,
      );
    },
    onSuccess: (response: any) => response.data,
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const updateGame = (id: number, bodyParams: GameTypes.GameUpdate, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: UPDATE_GAME,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || '';
      if (typeof +companyId !== 'number') return;
      return api.updateGame(
        bodyParams, +companyId, id, token || getState().authReducer.login.data.token,
      );
    },
    onSuccess: (response: any) => response.data,
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getGameById = (id: number, companyId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_GAME_BY_ID,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN) || '';
      return api.getGameById(id, companyId, token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const deleteGame = (id: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: DELETE_GAME,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN) || '';
      return api.deleteGame(id, token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getAdminGames = (companyId: number, params: GameAdminTypes.IQueryProps, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_GAMES_ADMIN_AGGREGATOR,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN) || '';
      return api.getAdminGames(companyId, params, token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getGames = (bodyParams: GameWebTypes.IQueryProps, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_GAMES_WEB_AGGREGATOR,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN) || '';
      return api.getGames(bodyParams, token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const gameToPublish = (gameIds: number[], companyId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GAME_TO_PUBLISH,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN) || '';
      return api.gameToPublish(gameIds, companyId, token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const gameToDraft = (gameIds: number[], companyId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GAME_TO_DRAFT,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN) || '';
      return api.gameToDraft(gameIds, companyId, token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const clearGame = () => (dispatch: any) => {
  dispatch({ type: GET_GAME_BY_ID.clear });
};

export const getPopularGames = (bodyParams: GameWebTypes.IQueryProps, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_POPULAR_GAMES_WEB_AGGREGATOR,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN) || '';
      return api.getGames(bodyParams, token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getPlayGame = (gameId: number, callbacks?: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: GET_PLAY_GAME,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN) || '';
      return api.playGame(gameId, token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};
