import React, { useState, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { onKeyDown } from 'src/utils/helpers';

import authActions from 'src/store/auth/actions';

import Button from 'src/components/atoms/Button';
import Card from 'src/components/atoms/Cards/Card';
import Image from 'src/components/atoms/Image';
import Input from 'src/components/molecules/Input';
import CodeSelect from 'src/components/molecules/CodeSelect';
import Typography from 'src/components/atoms/Typography';
import AuthFooter from 'src/components/molecules/AuthFooter';
import RadioTabs from 'src/components/molecules/RadioTabs';

import { RegistrationPageTypes } from 'src/pages/AuthPages/Registration/types';
import { countriesCode } from 'src/components/molecules/CodeSelect/mock';
import { tabs } from 'src/pages/AuthPages/Reset/mock';

import Logo from 'src/assets/img/logos/mini_logo.svg';
import 'src/pages/AuthPages/Registration/index.scss';

function RegistrationPage(props: RegistrationPageTypes.IProps) {
  const { onSendRegistration, registration, registrationError, history, codeConfirmation, registrationLoading } = props;

  const [phone, setPhone] = useState<string>('');
  const [userName, setUser] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [index, setIndex] = useState<string>('0');
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [errorUserMessage, setErrorUserMessage] = useState<string>();

  const onClickSendRegistration = () => {
    if (!userName) {
      setErrorUserMessage('Заполните данные');
    } else if (!isValidUsername(userName)) {
      setErrorUserMessage('Имя пользователя должно состоять из букв на латинице и цифр. Максимум 15 символов.');
    }
    const data = {
      username: userName,
      reason: 'register',
      activation_type: index === '0' ? 'email' : 'sms',
    };
    if (index === '0') {
      data['email'] = email;
    } else {
      data['phone'] = phone;
    }
    setErrorMessage(undefined);
    if (isValidUsername(userName)) {
      onSendRegistration && onSendRegistration(data);
    }
    setIsClicked(true);
  };

  const isValidUsername = (userName: string) => (
    (userName.length <= 15) && /[a-zA-Z]/.test(userName)
  );

  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(undefined);
    setPhone(e.target.value);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(undefined);
    setEmail(e.target.value);
  };

  const onChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(undefined);
    setErrorUserMessage(undefined);
    setUser(e.target.value);
  };

  const onChangeIndex = (index: string) => {
    setErrorMessage(undefined);
    setIndex(index);
  };

  useEffect(() => {
    if (codeConfirmation) history.goBack();
  },        []);

  useEffect(() => {
    if (registration && isClicked) {
      history.push({
        pathname: '/code-confirmation',
        state: {
          type: index === '0' ? 'email' : 'phone',
          backLink: '/registration',
        },
      });
      setIsClicked(false);
    }
  },        [registration]);

  useEffect(() => {
    if (registrationError) {
      setErrorMessage(registrationError);
    }
  },        [registrationError]);
  return (
    <div className="registration-page d-flex justify-content-between align-items-center flex-column fill">
      <div className="registration-page__content mt-24 d-flex align-items-center flex-column">
        <Image
          src={Logo}
          alt="gamisoft"
        />
        <Card classNames="auth-page__card fill text-center mt-32">
          <Typography variant="h1">Регистрация</Typography>
          <Input
            onChange={onChangeUser}
            classNames="mb-24"
            hint="Логин пользователя должно состоять из букв на латинице и цифр. Максимум 15 символов."
            placeholder="Ваше логин"
            type="text"
            label="Логин пользователя"
            errorMessage={errorUserMessage}
            onKeyDown={onKeyDown(onClickSendRegistration)}
          />
          <RadioTabs
            setActiveTabIndex={onChangeIndex}
            activeIndex={index}
            tabOptions={tabs}
          >
            <Input
              onChange={onChangeEmail}
              placeholder="Напишите почту"
              type="text"
              errorMessage={errorMessage}
              onKeyDown={onKeyDown(onClickSendRegistration)}
            />
            <CodeSelect
              key={errorMessage}
              onChange={onChangePhone}
              errorMessage={errorMessage}
              countries={countriesCode}
              handleEnter={onClickSendRegistration}
            />
          </RadioTabs>
          <Button
            onClick={onClickSendRegistration}
            variant="textmed"
            className="fill_w mt-16"
            loading={registrationLoading}
          >
            Создать учётную запись
          </Button>
          <div className="mt-32">
            <Typography variant="text color_black">
              Есть аккаунт? <Button to="/" type="link" variant="text">Войти</Button>
            </Typography>
          </div>
        </Card>
      </div>
      <AuthFooter classNames="mt-64" />
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return ({
    codeConfirmation: state.authReducer.login.data.token,
    registration: state.authReducer.register.data,
    registrationLoading: state.authReducer.register.loading,
    registrationError: state.authReducer.register.errorMessage,
  });
};

const mapDispatchToProps = {
  onSendRegistration: authActions.createActivation,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('common')(withRouter(RegistrationPage)));
