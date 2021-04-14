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
import { useTranslation } from 'react-i18next';

function ResetPasswordPage(props: ResetPasswordTypes.IProps) {
  const { onFinishRegistration, profileError, profile, codeConfirmation, history, profileLoading } = props;

  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>();
  const { t } = useTranslation('common');

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
      setErrorMessage(t('empty'));
      return;
    }
    if (password !== repeatPassword) {
      setErrorMessage(t('passwordNotMatch'));
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
        <Typography variant="h1">{t('resetPassword')}</Typography>
        <div className="text-left mt-16 mb-32">
          <Input
            type="password"
            label={t('newPassword')}
            placeholder={t('newPassword')}
            classNames="mb-24"
            hint={t('passwordRequirement')}
            onChange={onChangePassword}
            onKeyDown={onKeyDown(onClickSendPassword)}
          />
          <Input
            type="password"
            label={t('repeatPassword')}
            placeholder={t('repeatPassword')}
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
          {t('send')}
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
