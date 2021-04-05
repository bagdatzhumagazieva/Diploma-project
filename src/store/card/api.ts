import { stdApiDELETE, stdApiGET, stdApiPOST, stdApiPUT } from 'src/store/defaultApi';
import { API } from 'src/constants/server';
import { CardTypes, IGetCardsQueryParams } from 'src/store/card/types';
const querystring = require('querystring');

const cardsUrl = `${API}cards/`;
const cardsAggretatorUrl = `${API}aggregator/companies/`;

export const createCard = (companyId: number, data: CardTypes.ICardBodyParams, token: string) => (
  stdApiPOST({
    token,
    data,
    url: `${cardsUrl}?company_id=${companyId}`,
  })
);

export const updateCard = (cardId: number, companyId: number, data: CardTypes.ICardBodyParams, token: string) => (
  stdApiPUT({
    token,
    data,
    url: `${cardsUrl}${cardId}?company_id=${companyId}`,
  })
);

export const deleteCard = (cardId: number, companyId: number, token: string) => (
  stdApiDELETE({
    token,
    url: `${cardsUrl}${cardId}?company_id=${companyId}`,
  })
);

export const getCardFull = (cardId: number, companyId: number, token: string) => (
  stdApiGET({ token, url: `${cardsUrl}${cardId}/full?company_id=${companyId}` })
);

export const getCardAsAdmin = (cardId: number, companyId: number, token: string) => (
  stdApiGET({ token, url: `${cardsUrl}${cardId}/admin?company_id=${companyId}` })
);

export const getCards = (params: IGetCardsQueryParams, token: string) => {
  const queryParams = {
    company_id: params.companyId,
    page: params.page || 1,
    page_size: params.pageSize || 20,
    ...(params.categoryId ? { category_id: params.categoryId  } : {}),
    ...(params.sortBy ? { sort_by: params.sortBy  } : {}),
    ...(params.desc ? { desc: params.desc  } : {}),
    ...(params.isFavourite ? { is_favorite: params.isFavourite  } : {}),
    ...(params.keyword ? { keyword: params.keyword  } : {}),
    ...(Array.isArray(params.tagIds) && params.tagIds.length > 0 ? { tag_ids: params.tagIds  } : {}),
    ...(Array.isArray(params.cardIds) && params.cardIds.length > 0 ? { card_ids: params.cardIds  } : {}),
  };

  return stdApiGET({ token, url: `${cardsUrl}?${querystring.stringify(queryParams)}` });
};

export const getCardsByAggregator = (params: IGetCardsQueryParams, token: string) => {
  const queryParams = {
    page: params.page || 1,
    page_size: params.pageSize || 20,
    ...(params.categoryId ? { category_id: params.categoryId  } : {}),
    ...(params.sortBy ? { sort_by: params.sortBy  } : {}),
    ...(params.desc ? { desc: params.desc  } : {}),
    ...(params.isFavourite ? { is_favorite: params.isFavourite  } : {}),
    ...(params.keyword ? { keyword: params.keyword  } : {}),
    ...(Array.isArray(params.tagIds) && params.tagIds.length > 0 ? { tag_ids: params.tagIds  } : {}),
    ...(Array.isArray(params.cardIds) && params.cardIds.length > 0 ? { card_ids: params.cardIds  } : {}),
  };

  return stdApiGET({
    token,
    url: `${cardsAggretatorUrl}${params.companyId}/cards?${querystring.stringify(queryParams)}`,
  });
};

export const getCardsFull = (params: CardTypes.IGetFullCardsQueryParams, token: string) => {
  const queryParams = {
    company_id: params.companyId,
    page: params.page || 1,
    page_size: params.pageSize || 20,
    ...(Array.isArray(params.cardIds) ? { card_ids: params.cardIds  } : {}),
  };

  return stdApiGET({ token, url: `${cardsUrl}full?${querystring.stringify(queryParams)}` });
};

export const toggleCardFavourite = (cardId: number, companyId: number, token: string) => (
  stdApiPOST({ token, url: `${cardsUrl}favorites?company_id=${companyId}&card_id=${cardId}` })
);
