import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { useLocation, withRouter } from 'react-router';
import { RouterPaths } from 'src/core/enum';

import authActions from 'src/store/auth/actions';
import profileActions from 'src/store/profile/actions';
import { LOCAL_STORAGE } from 'src/core/store/values';

import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';
import AuthFooter from 'src/components/molecules/AuthFooter';

import { CheckUserActivationTypes } from 'src/pages/AuthPages/CheckUserActivation/types';
import Logo from 'src/assets/img/logos/orange_logo.svg';
import './index.scss';

function CheckUserActivation(props: CheckUserActivationTypes.IProps) {
  const location = useLocation();
  const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
  const { code, uuid } = queryString.parse(location.search);
  const { getUserActivationToken, loading, error, getProfile, profile, history } = props;

  useEffect(() => {
    token && getProfile && getProfile();
  },        []);

  useEffect(() => {
    if (uuid && code && getUserActivationToken) {
      getUserActivationToken(uuid as string, code as string, {
        onSuccess: (response: any) => {
          if (response.login.token) {
            getProfile && getProfile();
          }
        },
        onError: () => {
          !token && history.push('/');
        },
      });
    }
  },        [code, uuid]);

  useEffect(() => {
    if (profile) {
      history.push(profile.hasPassword ? `${RouterPaths.COMPANY_CHOICE}` : `${RouterPaths.REGISTRATION_FORM}`);
    }
  },        [profile]);

  return (
    <div className="check-user-activation d-flex flex-column justify-content-between vh_100 fill_w">
      <div className="check-user-activation__content d-flex justify-content-center align-items-center fill_h">
        <div className="content__block d-flex flex-column text-center">
          <Image
            className="block__img"
            src={Logo}
            alt="gamisoft"
          />
          <Typography
            variant="h1"
            className="mt-24"
          >
            {loading ? 'Идет проверка' : 'Для регистрации нажмите на кнопку'}
          </Typography>
          {error && (
            <Typography
              variant="text"
              color="red"
              className="text-center my-8"
            >
              {error}
            </Typography>
          )}
          <Button
            loading={loading}
            disabled={!!error}
            variant="textmed"
            className="mt-32"
          >
            Продолжить
          </Button>
        </div>
      </div>
      <AuthFooter color="blacker" classNames="mt-64" />
    </div>
  );
}

export const mapStateToProps = (state: any) => {
  return ({
    profile: state.profileReducer.profile.data,
    token: state.authReducer.login.data.token,
    isNew: state.authReducer.login.data.isNew,
    error: state.authReducer.login.errorMessage,
    loading: state.authReducer.login.loading,
  });
};

export const mapDispatchToProps = {
  getUserActivationToken: authActions.getUserActivationToken,
  getProfile: profileActions.getProfile,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(CheckUserActivation));
