import { ActionType, ILoadTypes, IPaginationResponseTypes, ResponseCodes } from 'src/core/store/types';
import {
  CategoryTypes,
  CREATE_CATEGORY,
  GET_CATEGORIES,
  GET_CATEGORY_BY_ID,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
} from 'src/store/category/types';
import { combineReducers } from 'redux';
import { IRenderBody, IResponseBody } from 'src/core/components/types';
import { NotificationType } from 'src/components/molecules/Notification/types';

export const parseCategoryData = (raw: CategoryTypes.ICategoryResponseProps, level: number, total?: number): CategoryTypes.ICategoryRenderProps => ({
  level,
  total,
  name: raw.name,
  id: raw.id,
  parentId: raw.parent_category_id,
  subCategories: raw.sub_categories && raw.sub_categories.map(n => (parseCategoryData(n, level + 1))),
  cardsNumber: raw.cards_number,
});

const categories = (
  state = { data: null, loading: false },
  action: ActionType<IPaginationResponseTypes<{ categories: CategoryTypes.ICategoryResponseProps[] }>>,
): ILoadTypes<CategoryTypes.ICategoryRenderProps[] | null> => {
  switch (action.type) {
    case GET_CATEGORIES.clear:
      return {
        data: null,
        loading: false,
      };
    case GET_CATEGORIES.started:
      return {
        data: null,
        loading: true,
      };
    case GET_CATEGORIES.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_CATEGORIES.success:
      if (!action.categories) {
        return {
          data: null,
          loading: false,
        };
      }
      const { categories, total, next_page, page } = action.categories;
      const parsed = categories.map((n: CategoryTypes.ICategoryResponseProps) => parseCategoryData(n, 1, total));
      return {
        total,
        nextPage: next_page,
        data: parsed,
        loading: false,
        curPage: page,
      };
    default:
      return state;
  }
};

const category = (
  state = { data: null, loading: false },
  action: ActionType<CategoryTypes.ICategoryResponseProps>,
): ILoadTypes<CategoryTypes.ICategoryRenderProps | null> => {
  switch (action.type) {
    case GET_CATEGORY_BY_ID.started:
      return {
        data: null,
        loading: true,
      };
    case GET_CATEGORY_BY_ID.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_CATEGORY_BY_ID.success:
      if (!action.category) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsed = parseCategoryData(action.category, 1);
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const createdCategoryState = (
  state = { data: null, loading: false },
  action: ActionType<IResponseBody>,
): ILoadTypes<IRenderBody | null> => {
  switch (action.type) {
    case CREATE_CATEGORY.started:
      return {
        data: null,
        loading: true,
      };
    case CREATE_CATEGORY.failed:
      return {
        data: { responseType: NotificationType.Danger, description: action.errorMessage || 'error' },
        errorMessage: action.errorMessage,
        loading: false,
      };
    case CREATE_CATEGORY.success:
      if (!action.createdCategoryState) {
        return {
          data: null,
          loading: false,
        };
      }

      const { code  } = action.createdCategoryState;

      const responseStatus: IRenderBody = {
        responseType: code === ResponseCodes.OK ? NotificationType.Success : NotificationType.Danger,
        description: code === ResponseCodes.OK ? 'Рубрика успешна добавлена' : 'Ошибка',
      };
      return {
        data: responseStatus,
        loading: false,
      };
    default:
      return state;
  }
};

const updatedCategoryState = (
  state = { data: null, loading: false },
  action: ActionType<IResponseBody>,
): ILoadTypes<IRenderBody | null> => {
  switch (action.type) {
    case UPDATE_CATEGORY.started:
      return {
        data: null,
        loading: true,
      };
    case UPDATE_CATEGORY.failed:
      return {
        data: { responseType: NotificationType.Danger, description: action.errorMessage || 'error' },
        errorMessage: action.errorMessage,
        loading: false,
      };
    case UPDATE_CATEGORY.success:
      if (!action.updatedCategoryState) {
        return {
          data: null,
          loading: false,
        };
      }

      const { code  } = action.updatedCategoryState;

      const responseStatus: IRenderBody = {
        responseType: code === ResponseCodes.OK ? NotificationType.Success : NotificationType.Danger,
        description: code === ResponseCodes.OK ? 'Рубрика успешно изменена' : 'Ошибка',
      };
      return {
        data: responseStatus,
        loading: false,
      };
    default:
      return state;
  }
};

const deletedCategoryState = (
  state = { data: null, loading: false },
  action: ActionType<IResponseBody>,
): ILoadTypes<IRenderBody | null> => {
  switch (action.type) {
    case DELETE_CATEGORY.started:
      return {
        data: null,
        loading: true,
      };
    case DELETE_CATEGORY.failed:
      return {
        data: { responseType: NotificationType.Danger, description: action.errorMessage || 'error' },
        errorMessage: action.errorMessage,
        loading: false,
      };
    case DELETE_CATEGORY.success:
      if (!action.deletedCategoryState) {
        return {
          data: null,
          loading: false,
        };
      }

      const { code  } = action.deletedCategoryState;

      const responseStatus: IRenderBody = {
        responseType: code === ResponseCodes.OK ? NotificationType.Success : NotificationType.Danger,
        description: code === ResponseCodes.OK ? 'Рубрика успешно удалена' : 'Ошибка',
      };
      return {
        data: responseStatus,
        loading: false,
      };
    default:
      return state;
  }
};

const categoryReducer = combineReducers(
  { categories, createdCategoryState, category, updatedCategoryState, deletedCategoryState },
);

export default categoryReducer;
