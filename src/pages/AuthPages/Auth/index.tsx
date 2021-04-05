import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { onKeyDown } from 'src/utils/helpers';
import { AdminRouterPaths } from 'src/core/enum';

import authActions from 'src/store/auth/actions';
import profileActions from 'src/store/profile/actions';

import Button from 'src/components/atoms/Button';
import Card from 'src/components/atoms/Cards/Card';
import Checkbox from 'src/components/molecules/Checkbox';
import Input from 'src/components/molecules/Input';
import Typography from 'src/components/atoms/Typography';
import AuthOrangeLayout from 'src/components/molecules/AuthOrangeLayout';
import useNotification from 'src/components/molecules/Notification/useNotification';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';

import { AuthPageTypes, IAuth } from 'src/pages/AuthPages/Auth/types';
import { NotificationType } from 'src/components/molecules/Notification/types';
import { LOCAL_STORAGE } from 'src/core/store/values';
import { AUTH_TYPES } from 'src/pages/AuthPages/Auth/consts';

import 'src/pages/AuthPages/Auth/index.scss';
import { addAdminSlash } from 'src/routers/AdminRouters';

function AuthPage(props: AuthPageTypes.IProps) {
  const {
    onGetLogin, token: propsToken,
    errorMessage, loadingToken, unauthorized, getProfile,
  } = props;

  const history = useHistory<{ addNewAccount: boolean }>();
  const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
  const [authData, setAuthData] = useState<IAuth>({ login: '', password: '' });
  const [loginError, setLoginError] = useState<string>();
  const [saveMe, setSaveMe] = useState<boolean>();
  const [authError, setAuthError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>();
  const notification = useNotification();
  const addNotification = (type: NotificationType, description: string) => {
    notification.add({
      type,
      description,
      withIcon: true,
      duration: 4000,
      size: 'small',
      width: '600px',
    });
  };

  useEffect(
    () => {
      if (authError) {
        addNotification(NotificationType.Danger, 'Ошибка авторизации.Попробуйте зайти позже!');
      }
    },
    [authError],
  );

  useEffect(() => {
    token && getProfile && getProfile();
  },        []);

  useEffect(
    () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN) || propsToken;
      token && history.push(`${addAdminSlash(AdminRouterPaths.CONTENT)}`);
    },
    [propsToken, history.location.state],
    );

  useEffect(() => {
    if (errorMessage) {
      setLoginError(errorMessage);
    }
  },        [errorMessage]);

  useEffect(() => {
    if (unauthorized) {
      localStorage.removeItem(LOCAL_STORAGE.TOKEN);
      localStorage.removeItem(LOCAL_STORAGE.COMPANY_ID);
      localStorage.removeItem(LOCAL_STORAGE.COMPANY_UUID);
      setAuthError(unauthorized);
    }
  },        [unauthorized]);

  const handleSignIn = (login: string, password: string) => {
    if (onGetLogin && !isEmpty(login) && !isEmpty(password)) {
      history.push(`${addAdminSlash(AdminRouterPaths.CONTENT)}`);
      // TODO: add function after back
      const data = {
        password,
        username: login,
      };
      onGetLogin(data, {
        onSuccess: (response: any) => {
          console.log(response)
          history.push(`${addAdminSlash(AdminRouterPaths.CONTENT)}`);
        },
      });
    } else {
      if (isEmpty(login)) setLoginError('Введите данные');
      if (isEmpty(password)) setPasswordError('Введите данные');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthData({ ...authData, [event.target.name] : event.target.value });
    setSaveMe(false);
    setAuthError(false);
    if (event.target.name === AUTH_TYPES.LOGIN) setLoginError(undefined);
    if (event.target.name === AUTH_TYPES.PASSWORD) setPasswordError(undefined);
  };

  const isEmpty = (value: string): boolean => value.length <= 0;

  return (
    <AuthOrangeLayout>
      <Card classNames="auth-page__card fill text-center mt-24">
        <Typography variant="h1">Вход в систему</Typography>
        <Input
          name={AUTH_TYPES.LOGIN}
          type="text"
          label="Логин"
          placeholder="Введите логин"
          errorMessage={loginError}
          classNames="mb-24"
          value={authData.login}
          onChange={handleInputChange}
          onKeyDown={onKeyDown(() => handleSignIn(authData.login, authData.password))}
        />
        <Input
          name={AUTH_TYPES.PASSWORD}
          type="password"
          label="Пароль"
          placeholder="Введите пароль"
          errorMessage={passwordError}
          value={authData.password}
          onChange={handleInputChange}
          classNames="mb-16"
          onKeyDown={onKeyDown(() => handleSignIn(authData.login, authData.password))}
        />
        <div className="d-flex justify-content-between mb-32">
          <Checkbox
            isClicked={saveMe}
            setClicked={(state: boolean) => setSaveMe(state)}
            color="grey_additional_2"
            title="Запомнить меня"
          />
          <Button
            type="link"
            variant="xsmallunderlined"
            classNames="auth-page__btn"
            to="/reset"
          >
            Забыли пароль?
          </Button>
        </div>
        <Button
          variant="textmed"
          className="fill_w"
          onClick={() => handleSignIn(authData.login, authData.password)}
          htmlTypes="submit"
          loading={loadingToken}
        >
          {props.t('common:signIn')}
        </Button>
        <div className="mt-24">
          <Typography variant="text" color="blacker">
            Еще нет аккаунта?
            <Button
              type="link"
              variant="text"
              color="main"
              to="/registration-form"
              className="ml-4"
            >
              Зарегистрироваться
            </Button>
          </Typography>
        </div>
      </Card>
    </AuthOrangeLayout>
  );
}

export const mapStateToProps = (state: any) => ({
  profile: state.profileReducer.profile.data,
  token: state.authReducer.login.data.token,
  unauthorized: state.utilsReducer.unauthorized.data,
  errorMessage: state.authReducer.login.errorMessage,
  loadingToken: state.authReducer.login.loading,
});

export const mapDispatchToProps = {
  onGetLogin: authActions.login,
  getProfile: profileActions.getProfile,
  onGetSocialLogin: authActions.socialLogin,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('common')(withNotificationProvider(AuthPage)));
