import { combineReducers } from 'redux';
import { ILoadTypes, ActionType } from 'src/core/store/types';
import { CODE_ACTIVATION, GET_LOGIN, CREATE_ACTIVATION,
  GET_SOCIAL_LOGIN, GET_USER_ACTIVATION_TOKEN } from './types';
import { LOGOUT, UNAUTHORIZED } from 'src/store/utils/types';

const register = (
    state = { data: null, loading: false }, action: ActionType<string>): ILoadTypes<any | null> => {
  switch (action.type) {
    case CREATE_ACTIVATION.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case CREATE_ACTIVATION.success:
      if (!action.registration) {
        return {
          data: null,
          errorMessage: undefined,
          loading: false,
        };
      }
      return {
        data: action.registration,
        errorMessage: undefined,
        loading: false,
      };
    case CREATE_ACTIVATION.started:
      return {
        data: null,
        errorMessage: undefined,
        loading: true,
      };
    default:
      return state;
  }
};

const login = (
  state = { data: {}, loading: false }, action: ActionType<any>): ILoadTypes<any | null> => {
  switch (action.type) {
    case GET_LOGIN.failed:
    case GET_USER_ACTIVATION_TOKEN.failed:
    case GET_SOCIAL_LOGIN.failed:
    case LOGOUT.success:
    case UNAUTHORIZED.success:
      return {
        data: {},
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_LOGIN.success:
    case GET_USER_ACTIVATION_TOKEN.success:
      if (!action.login) {
        return {
          data: {},
          errorMessage: undefined,
          loading: false,
        };
      }
      const login = {
        token: action.login.token,
        isNew: action.login.is_new,
      };
      return {
        data: login,
        errorMessage: undefined,
        loading: false,
      };
    case GET_SOCIAL_LOGIN.success:
      if (!action.token) {
        return {
          data: {},
          errorMessage: undefined,
          loading: false,
        };
      }
      const data = {
        token: action.token,
        isNew: false,
      };
      return {
        data,
        errorMessage: undefined,
        loading: false,
      };
    case GET_LOGIN.started:
    case GET_USER_ACTIVATION_TOKEN.started:
    case GET_SOCIAL_LOGIN.started:
      return {
        data: {},
        errorMessage: undefined,
        loading: true,
      };
    default:
      return state;
  }
};

const codeActivation = (
  state = { data: null, loading: false }, action: ActionType<string>): ILoadTypes<string | null> => {
  switch (action.type) {
    case CODE_ACTIVATION.started:
      return {
        data: null,
        errorMessage: undefined,
        loading: true,
      };
    case CODE_ACTIVATION.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case CODE_ACTIVATION.success:
      return {
        data: action.data,
        errorMessage: undefined,
        loading: false,
      };
    default:
      return state;
  }
};

const authReducer = combineReducers({
  register,
  login,
  codeActivation,
});

export default authReducer;
