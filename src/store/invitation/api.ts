import { API } from 'src/constants/server';
import { stdApiDELETE, stdApiGET, stdApiPOST } from 'src/store/defaultApi';
import { InvitationTypes } from 'src/store/invitation/types';
import { getQueryStringFromArray } from 'src/utils/format';
const querystring = require('querystring');

const getInvitationUrl = `${API}invitations/`;

export const getInvitations = (getInvitationBody: InvitationTypes.IGetInvitationsBodyParams, token: string) => (
  stdApiGET({ token, url: `${getInvitationUrl}?${querystring.stringify(getInvitationBody)}` })
);

export const createInvitations = (employees: InvitationTypes.IInvitationBodyParams[], token: string) => (
  stdApiPOST({
    token,
    data: employees,
    url: `${getInvitationUrl}`,
  })
);

export const createInvitationsFromExcel = (companyId: number, employees: InvitationTypes.IInvitationExcelResponseProps[], token: string) => (
  stdApiPOST({
    token,
    data: employees,
    url: `${getInvitationUrl}from_excel?company_id=${companyId}`,
  })
);

export const uploadExcelInvitation = (file: File, token: string) => (
  stdApiPOST({
    token,
    url: `${getInvitationUrl}upload`,
    raw: file,
    rawHeader: 'excel',
  })
);

export const deleteInvitations = (invitationIds: number[], token: string) => (
  stdApiDELETE({
    token,
    url: `${getInvitationUrl}${getQueryStringFromArray(invitationIds, 'invitation_ids')}`,
  })
);

export const resendInvitations = (invitationIds: number[], token: string) => (
  stdApiPOST({
    token,
    url: `${getInvitationUrl}resend${getQueryStringFromArray(invitationIds, 'invitation_ids')}`,
  })
);
