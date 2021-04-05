import { combineReducers } from 'redux';
import { IRenderBody, IResponseBody } from 'src/core/components/types';
import { ActionType, ILoadTypes, IPaginationResponseTypes, ResponseCodes } from 'src/core/store/types';
import {
  GET_INVITATIONS,
  CREATE_INVITATIONS,
  UPLOAD_EXCEL_INVITATIONS,
  CREATE_INVITATIONS_FROM_EXCEL,
  DELETE_INVITATIONS,
  RESEND_INVITATIONS,
  InvitationTypes,
} from 'src/store/invitation/types';
import { NotificationType } from 'src/components/molecules/Notification/types';
import { ModalInvitationExcelTypes } from 'src/components/organisms/ModalInvitation/ModalInvitationExcel/types';
import { parseBranchesData } from 'src/store/branch/reducer';
import { parseGroupData } from 'src/store/group/reducer';

export const parseInvitationExcel = (raw: InvitationTypes.IInvitationExcelResponseProps): InvitationTypes.IInvitationExcelRenderProps => ({
  firstName: raw.first_name,
  lastName: raw.last_name,
  email: raw.email,
  phone: raw.phone,
  branchName: raw.branch_name,
  groupNames: raw.group_names,
});

const parseInvitationsData = (raw: InvitationTypes.IResponseProps): InvitationTypes.IRenderProps => ({
  id: raw.id,
  email: raw.email,
  phone: raw.phone,
  sendAt: raw.send_date,
  status: raw.status,
  branch: raw.branch && parseBranchesData(raw.branch),
  groups: raw.groups && raw.groups.map(n => parseGroupData(n)),
});

const invitations = (
  state = { data: null, loading: false },
  action: ActionType<IPaginationResponseTypes<{ invitations: InvitationTypes.IResponseProps[] }>>,
): ILoadTypes<InvitationTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case GET_INVITATIONS.started:
      return {
        data: null,
        loading: true,
      };
    case GET_INVITATIONS.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_INVITATIONS.success:
      if (!action.invitations) {
        return {
          data: null,
          loading: false,
        };
      }
      const { invitations, total } = action.invitations;
      const parsed = invitations.map((n: InvitationTypes.IResponseProps) => parseInvitationsData(n));

      return {
        total,
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const createdInvitationsState = (
  state = { data: null, loading: false },
  action: ActionType<IResponseBody>,
): ILoadTypes<IRenderBody | null> => {
  switch (action.type) {
    case CREATE_INVITATIONS.started:
    case CREATE_INVITATIONS_FROM_EXCEL.started:
      return {
        data: null,
        loading: true,
      };
    case CREATE_INVITATIONS.failed:
    case CREATE_INVITATIONS_FROM_EXCEL.failed:
      return {
        data: { responseType: NotificationType.Danger, description: action.errorMessage || 'error' },
        errorMessage: action.errorMessage,
        loading: false,
      };
    case CREATE_INVITATIONS.success:
    case CREATE_INVITATIONS_FROM_EXCEL.success:
      if (!action.createdInvitationsState) {
        return {
          data: null,
          loading: false,
        };
      }
      const { code, description, data } = action.createdInvitationsState;

      const responseStatus: IRenderBody = {
        responseType: code === ResponseCodes.OK ? NotificationType.Success : NotificationType.Danger,
        description: code === ResponseCodes.OK
          ? (data && data.length > 1)
            ? `${data.length} пользователям были отправлены приглашения на регистрацию.`
            : 'Пользователю были отправлены приглашения в компанию.'
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

const excelInvitationListState = (
  state = { data: null, loading: false },
  action: ActionType<IResponseBody>,
): ILoadTypes<ModalInvitationExcelTypes.IEmployeeExcelDataObjectsArray | null> => {
  switch (action.type) {
    case UPLOAD_EXCEL_INVITATIONS.started:
      return {
        data: null,
        loading: true,
      };
    case UPLOAD_EXCEL_INVITATIONS.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case UPLOAD_EXCEL_INVITATIONS.success:
      if (!action.excelInvitationList) {
        return {
          data: null,
          loading: false,
        };
      }
      const { data, description } = action.excelInvitationList;

      const employeesObjectsArray: ModalInvitationExcelTypes.IEmployeeExcelDataObjectsArray = {};
      data && data.forEach((n: InvitationTypes.IInvitationExcelResponseProps, i: number) => {
        employeesObjectsArray[i] = parseInvitationExcel(n);
      });

      return {
        data: employeesObjectsArray,
        errorMessage: description,
        loading: false,
      };
    default:
      return state;
  }
};

const deletedInvitationsState = (
  state = { data: null, loading: false },
  action: ActionType<IResponseBody & { count: number; }>,
): ILoadTypes<IRenderBody | null> => {
  switch (action.type) {
    case DELETE_INVITATIONS.started:
      return {
        data: null,
        loading: true,
      };
    case DELETE_INVITATIONS.failed:
      return {
        data: {
          responseType: NotificationType.Danger,
          description: action.errorMessage || 'error',
        },
        errorMessage: action.errorMessage,
        loading: false,
      };
    case DELETE_INVITATIONS.success:
      if (!action.deletedInvitationsState) {
        return {
          data: null,
          loading: false,
        };
      }
      const { code, description, count } = action.deletedInvitationsState;

      const responseStatus = {
        responseType: code === ResponseCodes.OK ? NotificationType.Success : NotificationType.Danger,
        description: code === ResponseCodes.OK
          ? (count > 1)
            ? `${count} приглашения были удалены из данного сервиса.`
            : 'Приглашение был удален из этого сервиса.'
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

const resentInvitationsState = (
  state = { data: null, loading: false },
  action: ActionType<IResponseBody>,
): ILoadTypes<IRenderBody | null> => {
  switch (action.type) {
    case RESEND_INVITATIONS.started:
      return {
        data: null,
        loading: true,
      };
    case RESEND_INVITATIONS.failed:
      return {
        data: {
          responseType: NotificationType.Danger,
          description: action.errorMessage || 'error',
        },
        errorMessage: action.errorMessage,
        loading: false,
      };
    case RESEND_INVITATIONS.success:
      if (!action.resentInvitationsState) {
        return {
          data: null,
          loading: false,
        };
      }
      const { code, description, data } = action.resentInvitationsState;

      const responseStatus = {
        responseType: code === ResponseCodes.OK ? NotificationType.Success : NotificationType.Danger,
        description: code === ResponseCodes.OK
          ? (data && data.length > 1)
            ? 'Приглашения были повторно отправлены успешно.'
            : 'Приглашение было повторно отправлено успешно.'
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

const invitationReducer = combineReducers({
  invitations,
  createdInvitationsState,
  excelInvitationListState,
  deletedInvitationsState,
  resentInvitationsState,
});

export default invitationReducer;
