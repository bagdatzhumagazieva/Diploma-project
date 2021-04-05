import { combineReducers } from 'redux';
import { IRenderBody, IResponseBody } from 'src/core/components/types';
import { ActionType, ILoadTypes, IPaginationResponseTypes, ResponseCodes } from 'src/core/store/types';
import {
  CHANGE_EMPLOYEE_BRANCH,
  GET_EMPLOYEES,
  GET_EMPLOYMENT_BY_COMPANY_ID,
  UPDATE_EMPLOYEE_ACTIVENESS,
  DELETE_EMPLOYEES,
  ADD_GROUPS_TO_EMPLOYEES,
  SEND_PASSWORDS_TO_EMPLOYEES,
  REMOVE_INVITATIONS_FROM_EXCEL,
  UPDATE_EMPLOYEE,
  GET_FILTERED_EMPLOYEES,
  EmploymentTypes,
} from 'src/store/employment/types';
import { NotificationType } from 'src/components/molecules/Notification/types';
import { parseEmployeesData } from 'src/store/employment/parsers';
import { LOAD_DEFAULT_STATE } from 'src/core/store/values';
import { GO_TO_GAME_PAGE } from 'src/store/utils/types';

const employees = (
  state = { data: null, loading: false },
  action: ActionType<IPaginationResponseTypes<{ employees: EmploymentTypes.IResponseProps[] }>>,
): ILoadTypes<EmploymentTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case GET_EMPLOYEES.started:
      return {
        data: null,
        loading: true,
      };
    case GET_EMPLOYEES.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_EMPLOYEES.success:
      if (!action.employees) {
        return {
          data: null,
          loading: false,
        };
      }
      const { employees, total } = action.employees;
      const parsed = employees.map((n: EmploymentTypes.IResponseProps) => parseEmployeesData(n));
      return {
        total,
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const employment = (
  state = { data: null, loading: false },
  action: ActionType<EmploymentTypes.IResponseProps>,
): ILoadTypes<EmploymentTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_EMPLOYMENT_BY_COMPANY_ID.started:
      return {
        data: null,
        loading: true,
      };
    case GET_EMPLOYMENT_BY_COMPANY_ID.clear:
      return {
        data: null,
        loading: false,
      };
    case GET_EMPLOYMENT_BY_COMPANY_ID.failed:
    case GO_TO_GAME_PAGE.success:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_EMPLOYMENT_BY_COMPANY_ID.success:
      if (!action.employment) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsed = parseEmployeesData(action.employment);
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const filteredEmployees = (
  state = LOAD_DEFAULT_STATE,
  action: ActionType<IPaginationResponseTypes<{ employees: EmploymentTypes.IResponseProps[] }>>,
): ILoadTypes<EmploymentTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case GET_FILTERED_EMPLOYEES.started:
      return LOAD_DEFAULT_STATE;
    case GET_FILTERED_EMPLOYEES.failed:
      return { errorMessage: action.errorMessage, ...LOAD_DEFAULT_STATE };
    case GET_FILTERED_EMPLOYEES.success:
      if (!action.filteredEmployees) {
        return LOAD_DEFAULT_STATE;
      }
      const { employees, total } = action.filteredEmployees;
      const parsed = employees.map((n: EmploymentTypes.IResponseProps) => parseEmployeesData(n));
      return {
        total,
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const updatedEmployeeActiveness = (
  state = { data: null, loading: false },
  action: ActionType<EmploymentTypes.IUpdateEmployeeResponseProps>,
): ILoadTypes<IRenderBody | null> => {
  switch (action.type) {
    case UPDATE_EMPLOYEE_ACTIVENESS.started:
      return {
        data: null,
        loading: true,
      };
    case UPDATE_EMPLOYEE_ACTIVENESS.failed:
      return {
        data: { responseType: NotificationType.Danger, description: action.errorMessage || 'error' },
        errorMessage: action.errorMessage,
        loading: false,
      };
    case UPDATE_EMPLOYEE_ACTIVENESS.success:
      if (!action.activenessState) {
        return {
          data: null,
          loading: false,
        };
      }
      const { code, description, isBlocked, data } = action.activenessState;

      const responseStatus: IRenderBody = {
        responseType: code === ResponseCodes.OK ? NotificationType.Success : NotificationType.Danger,
        description: code === ResponseCodes.OK
          ? (data && data.length > 1)
            ? `Пользователи успешно ${isBlocked ? 'заблокированы' : 'активированы'}.`
            : `Пользователь успешно ${isBlocked ? 'заблокирован' : 'активирован'}.`
          : (description || 'Error'),
      };

      return {
        data: responseStatus,
        loading: false,
      };
    default:
      return state;
  }
};

const changedEmployeeBranchState = (
  state = { data: null, loading: false },
  action: ActionType<IResponseBody>,
): ILoadTypes<IRenderBody | null> => {
  switch (action.type) {
    case CHANGE_EMPLOYEE_BRANCH.started:
      return {
        data: null,
        loading: true,
      };
    case CHANGE_EMPLOYEE_BRANCH.failed:
      return {
        data: { responseType: NotificationType.Danger, description: action.errorMessage || 'error' },
        errorMessage: action.errorMessage,
        loading: false,
      };
    case CHANGE_EMPLOYEE_BRANCH.success:
      if (!action.changedEmployeeBranchState) {
        return {
          data: null,
          loading: false,
        };
      }
      const { code, description, data } = action.changedEmployeeBranchState;

      const responseStatus: IRenderBody = {
        responseType: code === ResponseCodes.OK ? NotificationType.Success : NotificationType.Danger,
        description: code === ResponseCodes.OK
          ? (data && data.length > 1)
            ? 'Пользователи успешно переведены в новый филиал'
            : 'Пользователь успешно переведен в новый филиал'
          : (description || 'Error'),
      };

      return {
        data: responseStatus,
        loading: false,
      };
    default:
      return state;
  }
};

const addOrRemoveEmployeesGroupsState = (
  state = { data: null, loading: false },
  action: ActionType<EmploymentTypes.IUpdateEmployeeResponseProps>,
): ILoadTypes<IRenderBody | null> => {
  switch (action.type) {
    case ADD_GROUPS_TO_EMPLOYEES.started:
      return {
        data: null,
        loading: true,
      };
    case ADD_GROUPS_TO_EMPLOYEES.failed:
      return {
        data: { responseType: NotificationType.Danger, description: action.errorMessage || 'error' },
        errorMessage: action.errorMessage,
        loading: false,
      };
    case ADD_GROUPS_TO_EMPLOYEES.success:
      if (!action.addOrRemoveEmployeesGroupsState) {
        return {
          data: null,
          loading: false,
        };
      }
      const { code, description, data, operation } = action.addOrRemoveEmployeesGroupsState;
      const responseStatus: IRenderBody = {
        responseType: code === ResponseCodes.OK ? NotificationType.Success : NotificationType.Danger,
        description: code === ResponseCodes.OK
          ? (data && data.length > 1)
            ? `Пользователи успешно ${operation === 'add' ? 'добавлены в группу' : 'исключены из группы'}.`
            : `Пользователь успешно ${operation === 'add' ? 'добавлен в группу' : 'исключен из группы'}.`
          : (description || 'Error'),
      };

      return {
        data: responseStatus,
        loading: false,
      };
    default:
      return state;
  }
};

const sentPasswordsToEmployeesState = (
  state = { data: null, loading: false },
  action: ActionType<IResponseBody>,
): ILoadTypes<IRenderBody | null> => {
  switch (action.type) {
    case SEND_PASSWORDS_TO_EMPLOYEES.started:
      return {
        data: null,
        loading: true,
      };
    case SEND_PASSWORDS_TO_EMPLOYEES.failed:
      return {
        data: { responseType: NotificationType.Danger, description: action.errorMessage || 'error' },
        errorMessage: action.errorMessage,
        loading: false,
      };
    case SEND_PASSWORDS_TO_EMPLOYEES.success:
      if (!action.sentPasswordsState) {
        return {
          data: null,
          loading: false,
        };
      }
      const { code, description } = action.sentPasswordsState;

      const responseStatus: IRenderBody = {
        responseType: code === ResponseCodes.OK ? NotificationType.Success : NotificationType.Danger,
        description: code === ResponseCodes.OK
          ? 'Логин/пароль отправлены успешно'
          : (description || 'Error'),
      };

      return {
        data: responseStatus,
        loading: false,
      };
    default:
      return state;
  }
};

const updatedEmployeeState = (
  state = { data: null, loading: false },
  action: ActionType<EmploymentTypes.IUpdateEmployeeResponseProps>,
): ILoadTypes<IRenderBody | null> => {
  switch (action.type) {
    case UPDATE_EMPLOYEE.started:
      return {
        data: null,
        loading: true,
      };
    case UPDATE_EMPLOYEE.failed:
      return {
        data: { responseType: NotificationType.Danger, description: action.errorMessage || 'error' },
        errorMessage: action.errorMessage,
        loading: false,
      };
    case UPDATE_EMPLOYEE.success:
      if (!action.updatedEmployee) {
        return {
          data: null,
          loading: false,
        };
      }
      const { code, description } = action.updatedEmployee;

      const responseStatus: IRenderBody = {
        responseType: code === ResponseCodes.OK ? NotificationType.Success : NotificationType.Danger,
        description: code === ResponseCodes.OK ? 'Пользователь успено изменен' : (description || 'Error'),
      };

      return {
        data: responseStatus,
        loading: false,
      };
    default:
      return state;
  }
};

const removedEmployeesState = (
  state = { data: null, loading: false },
  action: ActionType<IResponseBody & {
    count: number;
    fromRemovalModal?: boolean;
  }>,
): ILoadTypes<IRenderBody & { fromRemovalModal: boolean } | null> => {
  switch (action.type) {
    case REMOVE_INVITATIONS_FROM_EXCEL.started:
    case DELETE_EMPLOYEES.started:
      return {
        data: null,
        loading: true,
      };
    case REMOVE_INVITATIONS_FROM_EXCEL.failed:
    case DELETE_EMPLOYEES.failed:
      return {
        data: {
          responseType: NotificationType.Danger,
          description: action.errorMessage || 'error',
          fromRemovalModal: action.removedEmployeesState?.fromRemovalModal || false,
        },
        errorMessage: action.errorMessage,
        loading: false,
      };
    case REMOVE_INVITATIONS_FROM_EXCEL.success:
    case DELETE_EMPLOYEES.success:
      if (!action.removedEmployeesState) {
        return {
          data: null,
          loading: false,
        };
      }
      const { code, description, count, fromRemovalModal } = action.removedEmployeesState;

      const responseStatus = {
        responseType: code === ResponseCodes.OK ? NotificationType.Success : NotificationType.Danger,
        fromRemovalModal: fromRemovalModal || false,
        description: code === ResponseCodes.OK
          ? (count > 1)
            ? `${count} пользователей были удалены из данного сервиса.`
            : 'Пользователь был удален из этого сервиса.'
          : (description || 'Error'),
      };

      return {
        data: responseStatus,
        loading: false,
      };
    default:
      return state;
  }
};

const employmentReducer = combineReducers({
  employees,
  filteredEmployees,
  updatedEmployeeActiveness,
  changedEmployeeBranchState,
  addOrRemoveEmployeesGroupsState,
  sentPasswordsToEmployeesState,
  removedEmployeesState,
  updatedEmployeeState,
  employment,
});

export default employmentReducer;
