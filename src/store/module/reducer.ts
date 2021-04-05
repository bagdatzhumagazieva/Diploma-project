import { combineReducers } from 'redux';
import { ActionType, ILoadTypes, IPaginationResponseTypes } from 'src/core/store/types';
import { GET_MODULES, ModuleStatus, ModuleTypes, GET_MODULES_LIST } from 'src/store/module/types';
import { CourseDetailTypes } from 'src/store/course/types';
import { getModuleStatus } from 'src/store/course/parsers';

export const parseModuleData = (raw: ModuleTypes.IResponseProps): ModuleTypes.IRenderProps => (
{
  id: `${raw.id}`,
  name: raw.name,
  description: raw.description,
  image: raw.image_url || '',
  imageThumbnail: raw.image_thumbnail_url,
  cardIds: raw.card_ids,
  orderIndex: raw.order_index || -1,
  status: ModuleStatus.NOT_CHANGED,
});

export const parseModuleListData = (raw: CourseDetailTypes.IModuleResponse): ModuleTypes.IModuleListItem => (
{
  id: `${raw.entity_id}`,
  name: raw.name || '',
  status: getModuleStatus(raw.is_finished, raw.is_current),
  cardIds: Array.isArray(raw.card_ids) ? raw.card_ids : [],
});

const modules = (
  state = { data: null, loading: false },
  action: ActionType<IPaginationResponseTypes<{ modules: ModuleTypes.IResponseProps[] }>>,
): ILoadTypes<ModuleTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case GET_MODULES.started:
      return {
        data: null,
        loading: true,
      };
    case GET_MODULES.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_MODULES.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const { modules, total, next_page } = action.data;
      const parsed = modules.map((n: ModuleTypes.IResponseProps) => parseModuleData(n));
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

const moduleList = (
  state = { data: null, loading: false },
  action: ActionType<CourseDetailTypes.IResponseProps>,
): ILoadTypes<ModuleTypes.IModuleListItem[] | null> => {
  switch (action.type) {
    case GET_MODULES_LIST.started:
      return {
        data: null,
        loading: true,
      };
    case GET_MODULES_LIST.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_MODULES_LIST.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const { modules } = action.data;
      const parsed = modules ? modules.map(item => parseModuleListData(item)) : [];

      return {
        loading: false,
        data: parsed,
      };
    default:
      return state;
  }
};

const moduleReducer = combineReducers(
  { modules, moduleList },
);

export default moduleReducer;
