import { stdApiDELETE, stdApiGET, stdApiPOST, stdApiPUT } from 'src/store/defaultApi';
import { convertGameDataToUnderscore, convertGameUpdateDataToUnderscore } from 'src/store/game/parsers';
import Querystring from 'querystring';
import { API } from 'src/constants/server';
import { GameTypes, GameAdminTypes, GameWebTypes } from 'src/store/game/types';

const gameUrl = `${API}games/`;
const gameArrregatorUrl = `${API}search/`;

export const createGame = (bodyParams: GameTypes.Game, companyId: number, token: string) => (
  stdApiPOST({ token, data: convertGameDataToUnderscore(bodyParams, companyId), url: gameUrl })
);

export const getGameById = (id: number, companyId: number, token: string) => (
  stdApiGET({ token,  url: `${gameUrl}${id}?company_id=${companyId}` })
);

export const updateGame = (bodyParams: GameTypes.GameUpdate, companyId: number, id: number, token: string) => (
  stdApiPUT({ token, data: convertGameUpdateDataToUnderscore(bodyParams, companyId), url: `${gameUrl}${id}` })
);

export const deleteGame = (id: number, token: string) => (
  stdApiDELETE({ token, url: `${gameUrl}${id}` })
);

export const getAdminGames = (companyId: number, bodyParams: GameAdminTypes.IQueryProps, token: string) => {
  const queryParams = {
    page_size: bodyParams.page_size,
    page: bodyParams.page,
    keyword: bodyParams.keyword,
    ...(bodyParams.groupIds ? { group_ids: bodyParams.groupIds } : {}),
    ...(bodyParams.startTime ? { start_time: bodyParams.startTime } : {}),
    ...(bodyParams.endTime ? { end_time: bodyParams.endTime } : {}),
    ...(bodyParams.isPublished ? { is_published: bodyParams.isPublished } : {}),
    ...(bodyParams.desc ? { desc: bodyParams.desc } : {}),
    ...(bodyParams.sortBy ? { sort_by: bodyParams.sortBy } : {}),
    ...(bodyParams.status ? { status: bodyParams.status } : {}),
    ...(bodyParams.templateId ? { template_id: bodyParams.templateId } : {}),
  };
  return (
    stdApiGET({
      token,
      url: `${gameArrregatorUrl}admin/companies/${companyId}/games?${Querystring.stringify(queryParams)}`,
    })
  );
};

export const getGames = (bodyParams: GameWebTypes.IQueryProps, token: string) => {
  const queryParams = {
    page_size: bodyParams.page_size,
    page: bodyParams.page,
    ...(bodyParams.isFavorite ? { is_favorite: bodyParams.isFavorite } : {}),
    ...(bodyParams.personalGames ? { personal_games: bodyParams.personalGames } : {}),
    ...(bodyParams.isNew ? { is_new: bodyParams.isNew } : {}),
    ...(bodyParams.inProgress ? { in_progress: bodyParams.inProgress } : {}),
    ...(bodyParams.isFinished ? { is_finished: bodyParams.isFinished } : {}),
    ...(bodyParams.tagIds ? { tag_ids: bodyParams.tagIds } : {}),
    ...(bodyParams.isPopular ? { is_popular: bodyParams.isPopular } : {}),
  };
  return (
    stdApiGET({
      token,
      url: `${gameArrregatorUrl}companies/${bodyParams.companyId}/games?${Querystring.stringify(queryParams)}`,
    })
  );
};

export const gameToPublish = (gameIds: number[], companyId: number, token: string) => {
  const queryParams = { game_ids: gameIds };
  return stdApiPOST({ token, url: `${gameUrl}publish?company_id=${companyId}&${Querystring.stringify(queryParams)}` });
};

export const gameToDraft = (gameIds: number[], companyId: number, token: string) => {
  const queryParams = { game_ids: gameIds };
  return stdApiPUT({ token, url: `${gameUrl}draft?company_id=${companyId}&${Querystring.stringify(queryParams)}` });
};

export const playGame = (gameId: number, token: string) => {
  return stdApiGET({ token, url: `${gameUrl}${gameId}/play` });
};
