export declare namespace ProfileTypes {
  export interface IRenderProps {
    login: string;
    phone: string | null;
    email: string;
    name: string | null;
    surName: string | null;
    userType: string | null;
    gender: string | null;
    id: number;
    uuid: string;
    isActive: boolean;
    hasPassword: boolean;
    facebookId: string | null;
    gmailId: string | null;
    vkId: string | null;
    createdAt: string;
    updateAt: string;
    birthDate: string | null;
    avatarUrl: string;
    avatarThumbnailUrl: string;
    fullName: string;
    countryCode: string;
  }

  export interface IResponseProps {
    username: string;
    phone: string | null;
    email: string | null;
    first_name: string | null;
    last_name: string | null;
    user_type: string | null;
    gender: string | null;
    id: number;
    uuid: string;
    is_active: boolean;
    facebook_id: string | null;
    gmail_id: string | null;
    vk_id: string | null;
    has_password: boolean;
    created_at: string;
    updated_at: string;
    birth_date: string | null;
    avatar_url?: string;
    avatar_thumbnail_url?: string;
    country_code: string;
  }

  export interface IFinishRequest {
    phone?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    gender?: string;
    password?: string;
    birth_date?: string;
    username?: string;
  }

  export interface IChangePasswordRequest {
    old_password?: string;
    new_password?: string;
  }

  export interface IUpdateBodyProps {
    firstName?: string;
    lastName?: string;
    gender?: string;
    birthDate?: string;
    countryCode?: string;
    avatar?: File;
  }
}

export const UPDATE_PROFILE = {
  started: 'UPDATE_PROFILE_START',
  success: 'UPDATE_PROFILE_SUCCESS',
  failed: 'UPDATE_PROFILE_FAILED',
};

export const FINISH_REGISTRATION = {
  started: 'FINISH_REGISTRATION_START',
  success: 'FINISH_REGISTRATION_SUCCESS',
  failed: 'FINISH_REGISTRATION_FAILED',
};

export const CHANGE_PASSWORD = {
  started: 'CHANGE_PASSWORD_START',
  success: 'CHANGE_PASSWORD_SUCCESS',
  failed: 'CHANGE_PASSWORD_FAILED',
};

export const GET_PROFILE = {
  started: 'GET_PROFILE_START',
  success: 'GET_PROFILE_SUCCESS',
  failed: 'GET_PROFILE_FAILED',
};

export const UPLOAD_AVATAR = {
  started: 'UPLOAD_AVATAR_START',
  success: 'UPLOAD_AVATAR_SUCCESS',
  failed: 'UPLOAD_AVATAR_FAILED',
};

export const GET_AVATAR = {
  started: 'GET_AVATAR_START',
  success: 'GET_AVATAR_SUCCESS',
  failed: 'GET_AVATAR_FAILED',
};
