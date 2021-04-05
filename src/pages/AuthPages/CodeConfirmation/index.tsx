import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import authActions from 'src/store/auth/actions';
import { RouterPaths } from 'src/core/enum';

import Button from 'src/components/atoms/Button';
import Card from 'src/components/atoms/Cards/Card';
import InputTextSms from 'src/components/molecules/InputTextSms';
import Typography from 'src/components/atoms/Typography';
import AuthOrangeLayout from 'src/components/molecules/AuthOrangeLayout';

import { CodeConfirmationPageTypes } from 'src/pages/AuthPages/CodeConfirmation/types';
import 'src/pages/AuthPages/CodeConfirmation/index.scss';

function CodeConfirmationPage(props: CodeConfirmationPageTypes.IProps) {
  const {
    onConfirmActivation, registration, onResendActivation,
    codeConfirmationError, codeConfirmation, codeConfirmationLoading,
  } = props;

  const { state } = useLocation<{ type: 'email' | 'phone', isChangePassword: boolean, backLink: string }>();
  const history = useHistory();

  const { type: codeType, isChangePassword, backLink } = state;
  const [code, setCode] = useState<string>();
  const [timeLeft, setTimeLeft] = useState<number>(59);
  const [errorCodeMessage, setErrorCodeMessage] = useState<string | undefined>(undefined);

  useEffect(
    () => {
      if (registration === null) {
        history.goBack();
      }
    },
    [history, registration]);

  useEffect(
    () => {
      const timeout = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      },                         1000);
      return () => clearTimeout(timeout);
    });

  useEffect(
    () => {
      if (codeConfirmationError) {
        setErrorCodeMessage(codeConfirmationError);
      }
    },
    [codeConfirmationError]);

  useEffect(
    () => {
      if (codeConfirmation) {
        isChangePassword ?
          history.push(`/${RouterPaths.RESET_BY_TOKEN}`) :
          history.push(`/${RouterPaths.REGISTRATION_FORM}`);
      }
    },
    [codeConfirmation, history, isChangePassword]);

  const onChangeSmsCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
    setErrorCodeMessage(undefined);
  };

  const onClickSendCode = () => {
    if (registration) {
      const data = {
        userCode: {
          code,
        },
        uuid: registration.uuid,
      };
      onConfirmActivation && onConfirmActivation(data);
    }
  };

  const onClickResend = () => {
    if (onResendActivation && registration) {
      onResendActivation(registration.uuid, {
        onSuccess: () => {
          setTimeLeft(59);
        },
      });
    }
  };

  return (
    <AuthOrangeLayout>
      <Card
        backLink={backLink}
        classNames="mt-24 code-confirmation"
      >
        {codeType === 'email' ?
        (<>
            <Typography variant="h1">Подтверждение почты</Typography>
            <Typography
              variant="subtext"
              color="grey_additional_2"
              className="mt-16 text-left mb-44"
            >
              На почтовый адрес отправлен код подтверждения, введите его ниже, чтобы восстановить пароль
            </Typography>
          </>)
          :
          (<>
            <Typography variant="h1">Подтверждение номера</Typography>
            <Typography
              variant="subtext"
              color="grey_additional_2"
              className="mt-16 text-left mb-44"
            >
              На номер телефона отправлен код подтверждения, введите его ниже, чтобы восстановить пароль
            </Typography>
          </>)
        }
        <div className="mt-10 mb-24 d-flex justify-content-between">
          <InputTextSms
            onChange={onChangeSmsCode}
            errorMessage={errorCodeMessage}
            wrapperClassName="code-confirmation__input-text-sms"
            handleEnter={onClickSendCode}
          />
          <Button
            onClick={onClickSendCode}
            className="code-confirmation__send-button p-0"
            variant="textmed"
            loading={codeConfirmationLoading}
          >
            Отправить
          </Button>
        </div>
        <Button
          disabled={timeLeft > 0}
          onClick={onClickResend}
          type="link"
          color="blacker"
          variant="subtext"
        >
          Отправить повторно
          {timeLeft > 0 ? ` (0:${timeLeft})` : ''}
        </Button>
      </Card>
    </AuthOrangeLayout>
  );
}

const mapStateToProps = (state: any) => {
  return ({
    registration: state.authReducer.register.data,
    codeConfirmation: state.authReducer.codeActivation.data,
    codeConfirmationError: state.authReducer.codeActivation.errorMessage,
    codeConfirmationLoading: state.authReducer.codeActivation.loading,
  });
};

const mapDispatchToProps = {
  onConfirmActivation: authActions.confirmActivation,
  onResendActivation: authActions.resendActivation,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('common')(CodeConfirmationPage));
