export declare namespace AuthTypes {
  export interface ConfirmActivationRequest {
    userCode: {
      code: string,
    };
    uuid: string;
  }
}
export const CREATE_ACTIVATION = {
  started: 'CREATE_ACTIVATION_START',
  success: 'CREATE_ACTIVATION_SUCCESS',
  failed: 'CREATE_ACTIVATION_FAILED',
};

export const GET_LOGIN = {
  started: 'GET_LOGIN_START',
  success: 'GET_LOGIN_SUCCESS',
  failed: 'GET_LOGIN_FAILED',
};

export const GET_SOCIAL_LOGIN = {
  started: 'GET_SOCIAL_LOGIN_START',
  success: 'GET_SOCIAL_LOGIN_SUCCESS',
  failed: 'GET_SOCIAL_LOGIN_FAILED',
};

export const CODE_ACTIVATION = {
  started: 'CODE_ACTIVATION_START',
  success: 'CODE_ACTIVATION_SUCCESS',
  failed: 'CODE_ACTIVATION_FAILED',
};

export const RESEND_ACTIVATION = {
  started: 'RESEND_ACTIVATION_START',
  success: 'RESEND_ACTIVATION_SUCCESS',
  failed: 'RESEND_ACTIVATION_FAILED',
};

export const GET_USER_ACTIVATION_TOKEN = {
  started: 'GET_USER_ACTIVATION_TOKEN_START',
  success: 'GET_USER_ACTIVATION_TOKEN_SUCCESS',
  failed: 'GET_USER_ACTIVATION_TOKEN_FAILED',
};
