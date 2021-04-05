import { ActionType, ILoadTypes } from 'src/core/store/types';
import { combineReducers } from 'redux';
import { UNAUTHORIZED } from 'src/store/utils/types';

const unauthorized = (
  state = { data: false, loading: false },
  action: ActionType<any>,
): ILoadTypes<any | null> => {
  if (action.type === UNAUTHORIZED.success) {
    return {
      data: true,
      loading: false,
    };
  }
  return {
    data: false,
    loading: false,
  };
};

const utilsReducer = combineReducers({
  unauthorized,
});

export default utilsReducer;
