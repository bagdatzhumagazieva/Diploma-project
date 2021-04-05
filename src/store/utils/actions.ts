import {
  GO_TO_GAME_PAGE, LOGOUT,
} from './types';
import { LOCAL_STORAGE } from 'src/core/store/values';
import { GET_CARDS } from 'src/store/card/types';
import { GET_CATEGORIES } from 'src/store/category/types';

export const goToGamePage = () => {
  return (dispatch: any) => {
    dispatch({
      type: GO_TO_GAME_PAGE.success,
    });
  };
};

export const logout = () => {
  return (dispatch: any) => {
    localStorage.removeItem(LOCAL_STORAGE.TOKEN);
    localStorage.removeItem(LOCAL_STORAGE.COMPANY_ID);
    dispatch({
      type: LOGOUT.success,
    });
  };
};

export const clearAdminCardsData = () => {
  return (dispatch: any) => {
    dispatch({
      type: GET_CARDS.success,
      cards: null,
    });
    dispatch({
      type: GET_CATEGORIES.success,
      categories: null,
    });
  };
};

export default {
  goToGamePage,
  logout,
  clearAdminCardsData,
};
