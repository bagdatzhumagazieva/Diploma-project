import { combineReducers } from 'redux';
import { ActionType, ILoadTypes } from 'src/core/store/types';
import {
  ProfileTypes, GET_PROFILE, UPDATE_PROFILE,
  FINISH_REGISTRATION, CHANGE_PASSWORD,
  GET_AVATAR, UPLOAD_AVATAR,
} from './types';

export const parseProfileData = (raw: ProfileTypes.IResponseProps): ProfileTypes.IRenderProps => ({
  login: raw.username,
  phone: raw.phone,
  email: raw.email || '',
  name: raw.first_name,
  surName: raw.last_name,
  userType: raw.user_type,
  gender: raw.gender === 'other' ? null : raw.gender,
  id: raw.id,
  hasPassword: raw.has_password,
  uuid: raw.uuid,
  isActive: raw.is_active,
  facebookId: raw.facebook_id,
  gmailId: raw.gmail_id,
  vkId: raw.vk_id,
  createdAt: raw.created_at,
  updateAt: raw.updated_at,
  birthDate: raw.birth_date,
  countryCode: raw.country_code,
  fullName: [raw.first_name, raw.last_name].filter(Boolean).join(' '),
  avatarUrl: raw.avatar_url || '',
  avatarThumbnailUrl: raw.avatar_thumbnail_url || '',
});

const profile = (
  state = { data: null, loading: false },
  action: ActionType<ProfileTypes.IResponseProps> | any,
): ILoadTypes<ProfileTypes.IRenderProps | null> => {
  switch (action.type) {
    case UPDATE_PROFILE.failed:
    case GET_PROFILE.failed:
    case FINISH_REGISTRATION.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case UPDATE_PROFILE.success:
    case GET_PROFILE.success:
    case FINISH_REGISTRATION.success:
      if (!action.profile) {
        return {
          data: null,
          errorMessage: undefined,
          loading: false,
        };
      }
      return {
        data: parseProfileData(action.profile),
        errorMessage: undefined,
        loading: false,
      };
    case UPLOAD_AVATAR.success:
      const stateData = state.data as any;
      const newDataWithImage = {
        ...stateData,
        avatarUrl: action?.image?.data?.url || '',
        avatarThumbnailUrl: action?.image?.data?.thumbnail || '',
      };
      return {
        data: newDataWithImage,
        errorMessage: undefined,
        loading: false,
      };
    case UPDATE_PROFILE.started:
    case GET_PROFILE.started:
    case FINISH_REGISTRATION.started:
      return {
        data: null,
        errorMessage: undefined,
        loading: true,
      };
    default:
      return state;
  }
};

const avatar = (
  state = { data: null, loading: false }, action: ActionType<any>,
) => {
  switch (action.type) {
    case GET_AVATAR.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_AVATAR.success:
      return {
        data: action.data,
        errorMessage: undefined,
        loading: false,
      };
    case GET_AVATAR.started:
      return {
        data: null,
        errorMessage: undefined,
        loading: true,
      };
    default:
      return state;
  }
};

const changePassword = (
  state = { data: null, loading: false }, action: ActionType<any>,
): ILoadTypes<any | null> => {
  switch (action.type) {
    case CHANGE_PASSWORD.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case CHANGE_PASSWORD.success:
      return {
        data: action.profile,
        errorMessage: undefined,
        loading: false,
      };
    case CHANGE_PASSWORD.started:
      return {
        data: null,
        errorMessage: undefined,
        loading: true,
      };
    default:
      return state;
  }
};

const profileReducer = combineReducers(
  {
    profile,
    changePassword,
    avatar,
  });

export default profileReducer;
