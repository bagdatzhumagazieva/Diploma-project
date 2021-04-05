import { ActionType, ILoadTypes, IPaginationResponseTypes } from 'src/core/store/types';
import {
  GET_ITEM_CATEGORIES,
  ItemCategoryTypes,
} from 'src/store/item/category/types';
import { parseItemCategoryData } from 'src/store/item/category/parsers';
import { combineReducers } from 'redux';

const itemCategories = (
  state = { data: null, loading: false },
  action: ActionType<IPaginationResponseTypes<{ item_categories: ItemCategoryTypes.IResponseProps[] }>>,
): ILoadTypes<ItemCategoryTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case GET_ITEM_CATEGORIES.started:
      return {
        data: null,
        loading: true,
      };
    case GET_ITEM_CATEGORIES.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_ITEM_CATEGORIES.success:
      if (!action.data.item_categories) {
        return {
          data: null,
          loading: false,
        };
      }
      const { total, item_categories } = action.data;
      const parsed = item_categories.map((n: ItemCategoryTypes.IResponseProps) => parseItemCategoryData(n));
      return {
        total,
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const itemCategoryReducer = combineReducers({
                                       itemCategories,
                                     });

export default itemCategoryReducer;
