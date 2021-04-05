import { API } from 'src/constants/server';
import { stdApiGET, stdApiPOST, stdApiPUT } from 'src/store/defaultApi';
import { ProfileTypes } from 'src/store/profile/types';

const updateProfileUrl = `${API}users/update_user`;
const getProfileUrl = `${API}users/profile`;
const finishRegistrationUrl = 'http://localhost:8500/auth/register/';
const changePasswordUrl = `${API}users/change_password`;
const avatarUrl = `${API}media/avatar/`;
const getAvatarUrl = process.env.REACT_APP_STAGE !== 'prod' ? 'https://microlearning.kz:8443/media/users/' : 'https://api.gamisoft.ru/media/users/';

export const updateProfile = (data: ProfileTypes.IUpdateBodyProps, token: string) => {
  const requestBody = {
    first_name: data.firstName,
    last_name: data.lastName,
    birth_date: data.birthDate,
    gender: data.gender,
    avatar: data.avatar,
    country_code: data.countryCode,
  };

  return (
    stdApiPUT({ token, data: requestBody, url: `${updateProfileUrl}` })
  );
};

export const finishRegistration = (data: ProfileTypes.IFinishRequest) => (
  stdApiPOST({ data, url: `${finishRegistrationUrl}` })
);

export const getProfile = (token: string) => (
  stdApiGET({ token, url: `${getProfileUrl}` })
);

export const changePassword = (token: string, data: ProfileTypes.IChangePasswordRequest) => (
  stdApiPOST({ token, data, url: `${changePasswordUrl}` })
);

export const uploadAvatar = (token: string, file: any, uuid: string) => (
  stdApiPOST({ token, url: `${avatarUrl}${uuid}`, raw: file, rawHeader: 'file' })
);

export const getAvatar = (token: string, uuid: string) => (
  stdApiGET({ token, url: `${getAvatarUrl}${uuid}/avatar.jpg` })
);
