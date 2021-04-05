import { ActionType, ILoadTypes, IPaginationResponseTypes } from 'src/core/store/types';
import {
  GET_GROUPS,
  GET_GROUP_BY_ID,
  CREATE_PARAMETRIC_GROUP,
  GroupTypes,
  GET_GROUPS_BY_IDS,
} from 'src/store/group/types';
import { combineReducers } from 'redux';

export const parseGroupData = (raw: GroupTypes.IResponseProps): GroupTypes.IRenderProps => ({
  id: raw.id,
  name: raw.name,
  description: raw.description,
  groupType: raw.group_type,
  employeeNumber: raw.employee_number,
  totalActivityPercent: raw.total_activity_percent,
  checkboxChecked: false,
  contentAmount: raw.content_amount,
});

const groups = (
  state = { data: null, loading: false },
  action: ActionType<IPaginationResponseTypes<{ groups: GroupTypes.IResponseProps[] }>>,
): ILoadTypes<GroupTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case GET_GROUPS.started:
      return {
        data: null,
        loading: true,
      };
    case GET_GROUPS.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_GROUPS.success:
      if (!action.data.groups) {
        return {
          data: null,
          loading: false,
        };
      }
      const { total, groups } = action.data;
      const parsed = groups.map((n: GroupTypes.IResponseProps) => parseGroupData(n));
      return {
        total,
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const group = (
  state = { data: null, loading: false },
  action: ActionType<GroupTypes.IResponseProps>,
): ILoadTypes<GroupTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_GROUP_BY_ID.started:
      return {
        data: null,
        loading: true,
      };
    case GET_GROUP_BY_ID.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_GROUP_BY_ID.success:
      if (!action.group) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsed = parseGroupData(action.group);

      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const parametricGroup = (
  state = { data: null, loading: false },
  action: ActionType<GroupTypes.ICreateParametricGroupResponse>,
): ILoadTypes<GroupTypes.IRenderProps | null> => {
  switch (action.type) {
    case CREATE_PARAMETRIC_GROUP.started:
      return {
        data: null,
        loading: true,
      };
    case CREATE_PARAMETRIC_GROUP.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case CREATE_PARAMETRIC_GROUP.success:
      return {
        data: null,
        loading: false,
      };
    default:
      return state;
  }
};

// todo: change the name to avoid misunderstanding
const groupsByIds = (
  state = { data: null, loading: false },
  action: ActionType<GroupTypes.IResponseProps[]>,
): ILoadTypes<Map<number, string> | null> => {
  switch (action.type) {
    case GET_GROUPS_BY_IDS.started:
      return {
        data: null,
        loading: true,
      };
    case GET_GROUPS_BY_IDS.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_GROUPS_BY_IDS.success:
      if (!action.groups) {
        return {
          data: null,
          loading: false,
        };
      }
      const ansMap = new Map<number, string>();
      action.groups.forEach((item:GroupTypes.IResponseProps) => ansMap.set(item.id, item.name));
      return {
        data: ansMap,
        loading: false,
      };
    default:
      return state;
  }
};

const groupReducer = combineReducers({
  groups,
  group,
  parametricGroup,
  groupsByIds,
});

export default groupReducer;
