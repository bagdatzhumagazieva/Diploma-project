import { combineReducers } from 'redux';
import { ActionType, ILoadTypes } from 'src/core/store/types';
import {
  SEARCH_EMPLOYEES,
  SEARCH_GLOBAL,
  SearchTypes,
  SearchGlobalTypes,
} from 'src/store/search/types';

export const parseSearchedEmployees = (raw: SearchTypes.ISearchResponseProps): SearchTypes.ISearchRenderProps => ({
  email: raw.email,
  avatarUrl: raw.avatar_thumbnail_url,
  employmentId: raw.employment_id,
});

export const parseSearchGlobal = (data: SearchGlobalTypes.IResponseProps): SearchGlobalTypes.IRenderProps => ({
  total: data.total,
  entities: data.entities.map(e => ({
    entityId: e.entity_id,
    entityUuid: e.entity_uuid,
    name: e.name,
    description: e.description,
    imageUrl: e.image_url,
    imageThumbnailUrl: e.image_thumbnail_url,
    entityType: e.entity_type,
    username: e.username,
    groupIds: e.group_ids,
    exerciseType: e.exercise_type,
    createdAt: e.created_at,
    updatedAt: e.updated_at,
  })),
});

const searchedEmployees = (
  state = { data: null, loading: false },
  action: ActionType<SearchTypes.ISearchResponseProps[]>,
): ILoadTypes<SearchTypes.ISearchRenderProps[] | null> => {
  switch (action.type) {
    case SEARCH_EMPLOYEES.started:
      return {
        data: null,
        loading: true,
      };
    case SEARCH_EMPLOYEES.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case SEARCH_EMPLOYEES.success:
      if (!action.searchedEmployees) {
        return {
          data: null,
          loading: false,
        };
      }

      const parsedEmployees = action.searchedEmployees.map(n => parseSearchedEmployees(n));

      return {
        data: parsedEmployees,
        loading: false,
      };
    default:
      return state;
  }
};

const searchedGlobal = (
  state = { data: null, loading: false },
  action: ActionType<SearchGlobalTypes.IResponseProps>,
): ILoadTypes<SearchGlobalTypes.IRenderProps | null> => {
  switch (action.type) {
    case SEARCH_GLOBAL.started:
      return {
        data: null,
        loading: true,
      };
    case SEARCH_GLOBAL.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case SEARCH_GLOBAL.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }

      const parsedTasks = action.data && parseSearchGlobal(action.data);

      return {
        data: parsedTasks,
        loading: false,
      };
    default:
      return state;
  }
};

const searchReducer = combineReducers({
  searchedEmployees,
  searchedGlobal,
});

export default searchReducer;
