import { combineReducers } from 'redux';
import { ActionType, ILoadTypes, IPaginationResponseTypes, ResponseCodes } from 'src/core/store/types';
import { IRenderBody, IResponseBody } from 'src/core/components/types';
import { NotificationType } from 'src/components/molecules/Notification/types';
import {
  CardTypes, CREATE_CARD, DELETE_CARD, GET_CARD_FULL,
  UPDATE_CARD, GET_CARDS_FULL, GET_ADMIN_CARD, GET_CARDS, GET_CARDS_AGGREGATOR,
} from 'src/store/card/types';
import { parseCardData, parseCardDataAggregator, parseFullCardData } from 'src/store/card/parsers';

const createdCardState = (
  state = { data: null, loading: false },
  action: ActionType<IResponseBody>,
): ILoadTypes<IRenderBody | null> => {
  switch (action.type) {
    case CREATE_CARD.started:
      return {
        data: null,
        loading: true,
      };
    case CREATE_CARD.failed:
      return {
        data: { responseType: NotificationType.Danger, description: action.errorMessage || 'error' },
        errorMessage: action.errorMessage,
        loading: false,
      };
    case CREATE_CARD.success:
      if (!action.createdCardState) {
        return {
          data: null,
          loading: false,
        };
      }
      const { code, description, data } = action.createdCardState;

      const responseData: IRenderBody<CardTypes.IRenderProps> = {
        data: parseCardData(data),
        responseType: code === ResponseCodes.OK ? NotificationType.Success : NotificationType.Danger,
        description: code === ResponseCodes.OK
          ? 'Карточка успешно добавлена'
          : (description || 'Error'),
      };

      return {
        data: responseData,
        loading: false,
      };
    default:
      return state;
  }
};

const deletedCardState = (
  state = { data: null, loading: false },
  action: ActionType<IResponseBody>,
): ILoadTypes<IRenderBody | null> => {
  switch (action.type) {
    case DELETE_CARD.started:
      return {
        data: null,
        loading: true,
      };
    case DELETE_CARD.failed:
      return {
        data: { responseType: NotificationType.Danger, description: action.errorMessage || 'error' },
        errorMessage: action.errorMessage,
        loading: false,
      };
    case DELETE_CARD.success:
      if (!action.deletedCardState) {
        return {
          data: null,
          loading: false,
        };
      }
      const { code, description } = action.deletedCardState;

      const responseStatus: IRenderBody = {
        responseType: code === ResponseCodes.OK ? NotificationType.Success : NotificationType.Danger,
        description: code === ResponseCodes.OK
          ? 'Карточка успешно удалена'
          : (description || 'Error'),
      };

      return {
        data: responseStatus,
        loading: false,
      };
    default:
      return state;
  }
};

const updatedCardState = (
  state = { data: null, loading: false },
  action: ActionType<IResponseBody>,
): ILoadTypes<IRenderBody | null> => {
  switch (action.type) {
    case UPDATE_CARD.started:
      return {
        data: null,
        loading: true,
      };
    case UPDATE_CARD.failed:
      return {
        data: { responseType: NotificationType.Danger, description: action.errorMessage || 'error' },
        errorMessage: action.errorMessage,
        loading: false,
      };
    case UPDATE_CARD.success:
      if (!action.updatedCardState) {
        return {
          data: null,
          loading: false,
        };
      }
      const { code, description, data } = action.updatedCardState;

      const responseData: IRenderBody<CardTypes.IRenderProps> = {
        data: parseCardData(data),
        responseType: code === ResponseCodes.OK ? NotificationType.Success : NotificationType.Danger,
        description: code === ResponseCodes.OK
          ? 'Карта успешно отредактирована'
          : (description || 'Error'),
      };

      return {
        data: responseData,
        loading: false,
      };
    default:
      return state;
  }
};

const fullCard = (
  state = { data: null, loading: false },
  action: ActionType<CardTypes.IFullResponseProps>,
): ILoadTypes<CardTypes.IFullRenderProps | null> => {
  switch (action.type) {
    case GET_CARD_FULL.started:
      return {
        data: null,
        loading: true,
      };
    case GET_CARD_FULL.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_CARD_FULL.success:
      if (!action.fullCard) {
        return {
          data: null,
          loading: false,
        };
      }

      const parsed = action.fullCard && parseFullCardData(action.fullCard);
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const adminCard = (
  state = { data: null, loading: false },
  action: ActionType<CardTypes.IFullResponseProps>,
): ILoadTypes<CardTypes.IFullRenderProps | null> => {
  switch (action.type) {
    case GET_ADMIN_CARD.started:
      return {
        data: null,
        loading: true,
      };
    case GET_ADMIN_CARD.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_ADMIN_CARD.success:
      if (!action.adminCard) {
        return {
          data: null,
          loading: false,
        };
      }

      const parsed = action.adminCard && parseFullCardData(action.adminCard);
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const cards = (
  state = { data: null, loading: false },
  action: ActionType<IPaginationResponseTypes<{ cards: CardTypes.IResponseProps[] }>>,
): ILoadTypes<CardTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case GET_CARDS.started:
      return {
        data: null,
        loading: true,
      };
    case GET_CARDS.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_CARDS.success:
      if (!action.cards) {
        return {
          data: null,
          loading: false,
        };
      }
      const { cards, next_page, page } = action.cards;
      const parsed = cards.map(n => parseCardData(n));

      return {
        data: parsed,
        loading: false,
        nextPage: next_page,
        curPage: page,
      };
    default:
      return state;
  }
};

const cardsAggregator = (
  state = { data: null, loading: false },
  action: ActionType<IPaginationResponseTypes<{ cards: CardTypes.ICardResponseProps[] }>>,
): ILoadTypes<CardTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case GET_CARDS_AGGREGATOR.started:
      return {
        data: null,
        loading: true,
      };
    case GET_CARDS_AGGREGATOR.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_CARDS_AGGREGATOR.success:
      if (!action.cards) {
        return {
          data: null,
          loading: false,
        };
      }
      const { cards, next_page, page } = action.cards;
      const parsed = cards.map(n => parseCardDataAggregator(n));

      return {
        data: parsed,
        loading: false,
        nextPage: next_page,
        curPage: page,
      };
    default:
      return state;
  }
};

const cardsFull = (
  state = { data: null, loading: false },
  action: ActionType<IPaginationResponseTypes<{ cards: CardTypes.IFullResponseProps[] }>>,
): ILoadTypes<CardTypes.IFullRenderProps[] | null> => {
  switch (action.type) {
    case GET_CARDS_FULL.started:
      return {
        data: null,
        loading: true,
      };
    case GET_CARDS_FULL.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_CARDS_FULL.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const { cards, next_page } = action.data;
      const parsed = cards.map(n => parseFullCardData(n));

      return {
        data: parsed,
        loading: false,
        nextPage: next_page,
      };
    default:
      return state;
  }
};

const cardReducer = combineReducers({
  createdCardState,
  deletedCardState,
  updatedCardState,
  fullCard,
  adminCard,
  cards,
  cardsFull,
  cardsAggregator,
});

export default cardReducer;
