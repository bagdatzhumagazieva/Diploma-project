import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { onKeyDown } from 'src/utils/helpers';

import profileActions from 'src/store/profile/actions';

import Button from 'src/components/atoms/Button';
import Card from 'src/components/atoms/Cards/Card';
import Input from 'src/components/molecules/Input';
import Typography from 'src/components/atoms/Typography';
import AuthOrangeLayout from 'src/components/molecules/AuthOrangeLayout';
import { ResetPasswordTypes } from 'src/pages/AuthPages/ResetPasswordPage/types';
import { withRouter } from 'react-router';

function ResetPasswordPage(props: ResetPasswordTypes.IProps) {
  const { onFinishRegistration, profileError, profile, codeConfirmation, history, profileLoading } = props;

  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    if (codeConfirmation) history.goBack();
  },        []);

  useEffect(() => {
    if (profileError) setErrorMessage(profileError);
  },        [profileError]);

  useEffect(() => {
    if (profile) history.push('/');
  },        [profile]);

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setErrorMessage(undefined);
  };

  const onChangeRepeatPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(event.target.value);
    setErrorMessage(undefined);
  };

  const onClickSendPassword = () => {
    if (password.length === 0 || repeatPassword.length === 0) {
      setErrorMessage('Пустота');
      return;
    }
    if (password !== repeatPassword) {
      setErrorMessage('Пароли не совпадают');
      return;
    }

    const data = {
      password,
    };
    onFinishRegistration && onFinishRegistration(data);
  };

  return (
    <AuthOrangeLayout>
      <Card
        backLink="/auth"
        classNames="fill text-left mt-24"
      >
        <Typography variant="h1">Сбросить пароль</Typography>
        <div className="text-left mt-16 mb-32">
          <Input
            type="password"
            label="Новый пароль"
            placeholder="Новый пароль"
            classNames="mb-24"
            hint="Пароль должен состоять из букв на латинице и цифр. Минимум 6 символов."
            onChange={onChangePassword}
            onKeyDown={onKeyDown(onClickSendPassword)}
          />
          <Input
            type="password"
            label="Повторите пароль"
            placeholder="Повторите пароль"
            errorMessage={errorMessage}
            onChange={onChangeRepeatPassword}
            onKeyDown={onKeyDown(onClickSendPassword)}
          />
        </div>
        <Button
          variant="textmed"
          className="fill_w"
          onClick={onClickSendPassword}
          loading={profileLoading}
        >
          Отправить
        </Button>
      </Card>
    </AuthOrangeLayout>
  );
}

const mapStateToProps = (state: any) => {
  return ({
    profile: state.profileReducer.profile.data,
    codeConfirmation: state.authReducer.login.data.token,
    profileLoading: state.profileReducer.profile.loading,
    profileError: state.profileReducer.profile.errorMessage,
  });
};

const mapDispatchToProps = {
  onFinishRegistration: profileActions.finishRegistration,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ResetPasswordPage));
