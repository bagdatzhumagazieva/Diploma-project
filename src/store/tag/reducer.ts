import { ActionType, ILoadTypes, IPaginationResponseTypes, ResponseCodes } from 'src/core/store/types';
import { TagsTypes, GET_TAGS, CREATE_TAG, GET_TAGS_BY_PARAMS, DELETE_TAG, GET_TAGS_BY_IDS } from 'src/store/tag/types';
import { combineReducers } from 'redux';
import { IRenderBody, IResponseBody } from 'src/core/components/types';
import { NotificationType } from 'src/components/molecules/Notification/types';

export const parseTagsData = (raw: TagsTypes.IResponseProps): TagsTypes.IRenderProps => ({
  name: raw.name,
  id: raw.id,
});

export const parseSearchedData = (raw: TagsTypes.ISearchResponseProps): TagsTypes.IRenderProps => ({
  name: raw.tag_name,
  id: raw.tag_id,
});

const tags = (
  state = { data: null, loading: false },
  action: ActionType<IPaginationResponseTypes<{ tags: TagsTypes.IResponseProps[] }>>,
): ILoadTypes<TagsTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case GET_TAGS.started:
      return {
        data: null,
        loading: true,
      };
    case GET_TAGS.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_TAGS.success:
      if (!action.tags) {
        return {
          data: null,
          loading: false,
        };
      }
      const { tags, total, next_page } = action.tags;
      const parsed = tags.map((n: TagsTypes.IResponseProps) => parseTagsData(n));
      return {
        total,
        nextPage: next_page,
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const tagsByIds = (
  state = { data: null, loading: false },
  action: ActionType<TagsTypes.IResponseProps[]>,
): ILoadTypes<TagsTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case GET_TAGS_BY_IDS.started:
      return {
        data: null,
        loading: true,
      };
    case GET_TAGS_BY_IDS.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_TAGS_BY_IDS.success:
      if (!action.tags || !Array.isArray(action.tags)) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsed = action.tags.map((n: TagsTypes.IResponseProps) => parseTagsData(n));
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const createdTagState = (
  state = { data: null, loading: false },
  action: ActionType<IResponseBody>,
): ILoadTypes<IRenderBody | null> => {
  switch (action.type) {
    case CREATE_TAG.started:
      return {
        data: null,
        loading: true,
      };
    case CREATE_TAG.failed:
      return {
        data: { responseType: NotificationType.Danger, description: action.errorMessage || 'error' },
        errorMessage: action.errorMessage,
        loading: false,
      };
    case CREATE_TAG.success:
      if (!action.createdTagState) {
        return {
          data: null,
          loading: false,
        };
      }
      const { code  } = action.createdTagState;

      const responseStatus: IRenderBody = {
        responseType: code === ResponseCodes.OK ? NotificationType.Success : NotificationType.Danger,
        description: code === ResponseCodes.OK ? 'Таг успешно добавлен' : 'Ошибка',
      };
      return {
        data: responseStatus,
        loading: false,
      };
    default:
      return state;
  }
};

const tagsByParams = (
  state = { data: null, loading: false },
  action: ActionType<IPaginationResponseTypes<{ tags: TagsTypes.ISearchResponseProps[] }>>,
): ILoadTypes<TagsTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case GET_TAGS_BY_PARAMS.started:
      return {
        data: null,
        loading: true,
      };
    case GET_TAGS_BY_PARAMS.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_TAGS_BY_PARAMS.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const { tags, total } = action.data;
      const parsed = tags.map((n: TagsTypes.ISearchResponseProps) => parseSearchedData(n));
      return {
        total,
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const deletedTagState = (
  state = { data: null, loading: false },
  action: ActionType<IResponseBody>,
): ILoadTypes<IRenderBody | null> => {
  switch (action.type) {
    case DELETE_TAG.started:
      return {
        data: null,
        loading: true,
      };
    case DELETE_TAG.failed:
      return {
        data: { responseType: NotificationType.Danger, description: action.errorMessage || 'error' },
        errorMessage: action.errorMessage,
        loading: false,
      };
    case DELETE_TAG.success:
      if (!action.deletedTagState) {
        return {
          data: null,
          loading: false,
        };
      }

      const { code  } = action.deletedTagState;

      const responseStatus: IRenderBody = {
        responseType: code === ResponseCodes.OK ? NotificationType.Success : NotificationType.Danger,
        description: code === ResponseCodes.OK ? 'Тег успешно удалена' : 'Ошибка',
      };
      return {
        data: responseStatus,
        loading: false,
      };
    default:
      return state;
  }
};

const tagReducer = combineReducers({ tags, createdTagState, tagsByParams, deletedTagState, tagsByIds });

export default tagReducer;
