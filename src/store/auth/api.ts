import { API } from 'src/constants/server';
import { stdApiPOST, stdApiGET } from 'src/store/defaultApi';
import { AuthTypes } from 'src/store/auth/types';

const createActivationUrl = `${API}auth/create_activation`;
const codeUrl = `${API}auth/confirm_activation`;
const resendCodeUrl = `${API}auth/resend_activation`;
const authUrlLogin = 'http://localhost:8500/auth/login/';
const authUrl = `${API}auth/`;

export const createActivation = (data: any) => (
    stdApiPOST({ data, url: createActivationUrl })
);

export const login = (data: any) => (
    stdApiPOST({ data, url: authUrlLogin })
);

export const socialLogin = (data: any) => (
  stdApiPOST({ data: data.body, url: `${authUrl}${data.type}` })
);

export const confirmActivation = (data: AuthTypes.ConfirmActivationRequest) => (
  stdApiGET({ url: `${codeUrl}?uuid=${data.uuid}&code=${data.userCode.code}` })
);

export const resendActivation = (data: string) => (
  stdApiGET({ url: `${resendCodeUrl}/${data}` })
);

export const getUserActivationToken = (uuid: string, code: string) => (
  stdApiGET({ url: `${authUrl}confirm_activation?uuid=${uuid}&code=${code}` })
);

export const updateLoginTime = (token: string) => (
  stdApiGET({ token, url: `${API}users/update_login_time` })
);
