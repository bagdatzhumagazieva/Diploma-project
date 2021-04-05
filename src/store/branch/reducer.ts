import { combineReducers } from 'redux';
import { ActionType, ILoadTypes, ResponseCodes } from 'src/core/store/types';
import { ADD_BRANCH, BranchesTypes, DELETE_BRANCH, GET_BRANCH_BY_ID, GET_BRANCHES, UPDATE_BRANCH } from './types';
import { NotificationType } from 'src/components/molecules/Notification/types';
import { IRenderBody, IResponseBody } from 'src/core/components/types';

export const parseBranchesData = (raw: BranchesTypes.IResponseProps): BranchesTypes.IRenderProps => ({
  name: raw.name,
  id: raw.id,
  companyId: raw.company_id,
  parentBranchId: raw.parent_branch_id,
  uuid: raw.uuid,
  rewardAmount: raw.reward_amount,
  activityPercent: raw.total_activity_percent || 0,
  employeesCount: raw.employee_number || 0,
  parentBranch: raw.parent_branch && parseBranchesData(raw.parent_branch),
  subBranches: raw.sub_branches && raw.sub_branches.map(n => (parseBranchesData(n))),
});

const branches = (
  state = { data: null, loading: false },
  action: ActionType<BranchesTypes.IResponseProps[]>,
): ILoadTypes<BranchesTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case GET_BRANCHES.started:
      return {
        data: null,
        loading: true,
      };
    case GET_BRANCHES.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_BRANCHES.success:
      if (!action.branches) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsed = action.branches.map((n: BranchesTypes.IResponseProps) => parseBranchesData(n));
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const branchById = (
  state = { data: null, loading: true },
  action: ActionType<BranchesTypes.IResponseProps>,
): ILoadTypes<BranchesTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_BRANCH_BY_ID.started:
      return {
        data: null,
        loading: true,
      };
    case GET_BRANCH_BY_ID.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_BRANCH_BY_ID.success:
      if (!action.branchById) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsed = parseBranchesData(action.branchById);
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const updatedBranchState = (
  state = { data: null, loading: false },
  action: ActionType<IResponseBody>,
): ILoadTypes<IRenderBody | null> => {
  switch (action.type) {
    case UPDATE_BRANCH.started:
      return {
        data: null,
        loading: true,
      };
    case UPDATE_BRANCH.failed:
      return {
        data: { responseType: NotificationType.Danger, description: action.errorMessage || 'error' },
        errorMessage: action.errorMessage,
        loading: false,
      };
    case UPDATE_BRANCH.success:
      if (!action.updatedBranchState) {
        return {
          data: null,
          loading: false,
        };
      }
      const { code, description } = action.updatedBranchState;

      const responseStatus: IRenderBody = {
        responseType: code === ResponseCodes.OK ? NotificationType.Success : NotificationType.Danger,
        description: code === ResponseCodes.OK
          ? 'Филиал успешно обновлен'
          : (description || 'Error'),
      };
      return {
        data: responseStatus,
        loading: false,
        errorMessage: undefined,
      };
    default:
      return state;
  }
};

const deletedBranch = (
  state = { data: null, loading: false },
  action: ActionType<IResponseBody>,
): ILoadTypes<IRenderBody | null> => {
  switch (action.type) {
    case DELETE_BRANCH.started:
      return {
        data: null,
        loading: true,
      };
    case DELETE_BRANCH.failed:
      return {
        data: { responseType: NotificationType.Danger, description: action.errorMessage || 'error' },
        errorMessage: action.errorMessage,
        loading: false,
      };
    case DELETE_BRANCH.success:
      if (!action.deletedBranch) {
        return {
          data: null,
          loading: false,
        };
      }
      const { code, description } = action.deletedBranch;

      const responseStatus: IRenderBody = {
        responseType: code === ResponseCodes.OK ? NotificationType.Success : NotificationType.Danger,
        description: code === ResponseCodes.OK
          ? 'Филиал успешно удален'
          : (description || 'Error'),
      };
      return {
        data: responseStatus,
        loading: false,
        errorMessage: undefined,
      };
    default:
      return state;
  }
};

const addedBranchState = (
  state = { data: null, loading: false },
  action: ActionType<IResponseBody>,
): ILoadTypes<IRenderBody<{id: number}> | null> => {
  switch (action.type) {
    case ADD_BRANCH.started:
      return {
        data: null,
        loading: true,
      };
    case ADD_BRANCH.failed:
      return {
        data: { responseType: NotificationType.Danger, description: action.errorMessage || 'error' },
        errorMessage: action.errorMessage,
        loading: false,
      };
    case ADD_BRANCH.success:
      if (!action.addedBranchState) {
        return {
          data: null,
          loading: false,
        };
      }
      const { code, description } = action.addedBranchState;
      const branchId = action.addedBranchState.data.id;
      const responseStatus: IRenderBody<{id: number}> = {
        responseType: code === ResponseCodes.OK ? NotificationType.Success : NotificationType.Danger,
        description: code === ResponseCodes.OK
          ? 'Филиал успешно добавлен'
          : (description || 'Error'),
        data: { id: branchId },
      };
      return {
        data: responseStatus,
        loading: false,
        errorMessage: undefined,
      };
    default:
      return state;
  }
};

const branchReducer = combineReducers({ branches, branchById, updatedBranchState, deletedBranch, addedBranchState });

export default branchReducer;
