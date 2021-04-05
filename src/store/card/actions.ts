import { defaultAction } from 'src/store/defaultActions';
import { LOCAL_STORAGE } from 'src/core/store/values';
import * as api from 'src/store/card/api';
import {
  CardTypes, IGetCardsQueryParams, CREATE_CARD,
  DELETE_CARD, GET_CARD_FULL, GET_ADMIN_CARD,
  GET_CARDS, UPDATE_CARD, GET_CARDS_FULL, TOGGLE_CARD_FAVOURITE, GET_CARDS_AGGREGATOR,
} from 'src/store/card/types';

export const createCard = (bodyParams: CardTypes.ICardBodyParams) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    action: CREATE_CARD,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || -1;
      return api.createCard(+companyId, bodyParams, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ createdCardState: response }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const updateCard = (cardId: number, bodyParams: CardTypes.ICardBodyParams) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    action: UPDATE_CARD,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || -1;
      return api.updateCard(cardId, +companyId, bodyParams, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ updatedCardState: response }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const deleteCard = (cardId: number) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    action: DELETE_CARD,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || -1;
      return api.deleteCard(cardId, +companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ deletedCardState: response }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getCardFull = (cardId: number) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    action: GET_CARD_FULL,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || -1;
      return api.getCardFull(cardId, +companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ fullCard: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getCardAsAdmin = (cardId: number) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    action: GET_ADMIN_CARD,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || -1;
      return api.getCardAsAdmin(cardId, +companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ adminCard: response.data }),
    onError: (response: any) => ({ errorMessage: response.message || response.description }),
  });
};

export const getCards = (params: IGetCardsQueryParams) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    action: GET_CARDS,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getCards(params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ cards: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getCardsByAggregator = (params: IGetCardsQueryParams) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    action: GET_CARDS_AGGREGATOR,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getCardsByAggregator(params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ cards: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const getCardsFull = (params: CardTypes.IGetFullCardsQueryParams) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    action: GET_CARDS_FULL,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      return api.getCardsFull(params, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const toggleCardFavourite = (cardId: number, callbacks: any) => (dispatch: any, getState: any) => {
  defaultAction(dispatch, getState, {
    callbacks,
    action: TOGGLE_CARD_FAVOURITE,
    apiCall: () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      const companyId = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || -1;
      return api.toggleCardFavourite(cardId, +companyId, token || getState().authReducer.login.data.token);
    },
    onSuccess: (response: any) => ({ data: response.data }),
    onError: (response: any) => ({ errorMessage: response.description }),
  });
};

export const clearCardsState = () => {
  return (dispatch: any) => {
    dispatch({
      type: DELETE_CARD.success,
      deletedCardState: null,
    });
    dispatch({
      type: CREATE_CARD.success,
      createdCardState: null,
    });
    dispatch({
      type: UPDATE_CARD.success,
      updatedCardState: null,
    });
  };
};

export default {
  createCard,
  getCardFull,
  getCardAsAdmin,
  updateCard,
  deleteCard,
  getCards,
  clearCardsState,
  getCardsFull,
  toggleCardFavourite,
  getCardsByAggregator,
};
