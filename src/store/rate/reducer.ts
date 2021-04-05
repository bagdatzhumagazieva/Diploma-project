import { ActionType, ILoadTypes } from 'src/core/store/types';
import { combineReducers } from 'redux';
import { GET_MY_RATING } from 'src/store/rate/types';

const rating = (
  state = { data: null, loading: true },
  action: ActionType<any>,
): ILoadTypes<number | null> => {
  switch (action.type) {
    case GET_MY_RATING.started:
    case GET_MY_RATING.clear:
      return {
        data: null,
        loading: true,
      };
    case GET_MY_RATING.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_MY_RATING.success:
      if (!action.value) {
        return {
          data: null,
          loading: false,
        };
      }
      return {
        data: action.value,
        loading: false,
      };
    default:
      return state;
  }
};

const ratingReducer = combineReducers(
  {
    rating,
  });

export default ratingReducer;
