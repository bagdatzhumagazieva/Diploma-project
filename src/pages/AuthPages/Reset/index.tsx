import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { onKeyDown } from 'src/utils/helpers';

import authActions from 'src/store/auth/actions';

import Button from 'src/components/atoms/Button';
import Card from 'src/components/atoms/Cards/Card';
import Input from 'src/components/molecules/Input';
import Typography from 'src/components/atoms/Typography';
import AuthOrangeLayout from 'src/components/molecules/AuthOrangeLayout';
import CodeSelect from 'src/components/molecules/CodeSelect';
import RadioTabs from 'src/components/molecules/RadioTabs';

import { ResetPageTypes } from 'src/pages/AuthPages/Reset/types';
import { countriesCode } from 'src/components/molecules/CodeSelect/mock';
import { tabs } from 'src/pages/AuthPages/Reset/mock';

function ResetPage(props: ResetPageTypes.IProps) {
  const { onCreateActivation, history, registration, registrationError, registrationLoading } = props;

  const [activeRadioBtnIndex, setActiveRadioBtnIndex] = useState<string>('0');
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [emailOrPhone, setEmailOrPhone] = useState<string>('');
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    if (registration && isClicked) {
      history.push({
        pathname: '/code-confirmation',
        state: {
          type: activeRadioBtnIndex === '0' ? 'email' : 'phone',
          isChangePassword: true,
          backLink: '/reset',
        },
      });
    }
  },        [registration]);

  useEffect(() => {
    if (registrationError) {
      setErrorMessage(registrationError);
      setIsClicked(false);
    }
  },        [registrationError]);

  const handleActiveRadioBtnIndex = (index: string) => {
    setActiveRadioBtnIndex(index);
    setErrorMessage(undefined);
    setEmailOrPhone('');
  };

  const onSubmitButtonClicked = (activeRadioBtnIndex: string, value: string) => () => {
    if (activeRadioBtnIndex === '0') setEmailOrPhone(getNumbers(value));

    if (isDataEmpty(value)) {
      setErrorMessage('Заполните данные');
      return;
    }

    if (onCreateActivation) {
      const data = {
        reason: 'password_restore',
        activation_type: activeRadioBtnIndex === '0' ? 'email' : 'sms',
      };
      if (activeRadioBtnIndex === '0') {
        data['email'] = value;
      } else {
        data['phone'] = value;
      }
      setIsClicked(true);
      onCreateActivation(data);
    }
  };

  const getEmailOrPhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(undefined);
    setEmailOrPhone(event.target.value);
  };

  const getNumbers = (value: string): string => value.replace(/\D/g, '');

  const isDataEmpty = (value: string):boolean => value.length <= 0;

  return (
    <AuthOrangeLayout>
      <Card
        backLink="/"
        classNames="fill text-left mt-24"
      >
        <Typography variant="h1">Сбросить пароль</Typography>
        <Typography
          variant="subtext"
          className="color_grey_additional_2 mt-16 text-left mb-36"
        >
          Введите адрес электронной почты или номер телефона к которому привязан ваш аккаунт.
          Мы вышлем ссылку для смены пароля.
        </Typography>
        <RadioTabs
          setActiveTabIndex={handleActiveRadioBtnIndex}
          tabOptions={tabs}
          activeIndex={activeRadioBtnIndex}
        >
          <Input
            type="text"
            placeholder="Напишите почту"
            errorMessage={activeRadioBtnIndex === '0' && errorMessage}
            onChange={getEmailOrPhone}
            onKeyDown={onKeyDown(onSubmitButtonClicked(activeRadioBtnIndex, emailOrPhone))}
          />
          <CodeSelect
            countries={countriesCode}
            errorMessage={activeRadioBtnIndex === '1' && errorMessage}
            onChange={getEmailOrPhone}
            handleEnter={onSubmitButtonClicked(activeRadioBtnIndex, emailOrPhone)}
          />
        </RadioTabs>
        <Button
          variant="textmed"
          className="mt-32 fill_w"
          onClick={onSubmitButtonClicked(activeRadioBtnIndex, emailOrPhone)}
          loading={registrationLoading}
        >
          Отправить
        </Button>
      </Card>
    </AuthOrangeLayout>
  );
}

const mapStateToProps = (state: any) => {
  return ({
    registration: state.authReducer.register.data,
    registrationLoading: state.authReducer.register.loading,
    registrationError: state.authReducer.register.errorMessage,
  });
};

const mapDispatchToProps = {
  onCreateActivation: authActions.createActivation,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(ResetPage));
