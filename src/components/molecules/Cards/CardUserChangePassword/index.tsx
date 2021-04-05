import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import Input from 'src/components/molecules/Input';
import Typography from 'src/components/atoms/Typography';

import {
  CardUserChangePasswordTypes,
  IUserChangePassword,
} from 'src/components/molecules/Cards/CardUserChangePassword/types';
import { DEFAULT_VALUES } from 'src/components/molecules/Cards/CardUserChangePassword/consts';
import { USER_CHANGE_PASSWORD_TYPES } from 'src/components/molecules/Cards/CardUserChangePassword/enum';
import LeftArrow from 'src/assets/img/icons/chevron-left-solid.svg';
import 'src/components/molecules/Cards/CardUserChangePassword/index.scss';

function CardUserChangePassword(props: CardUserChangePasswordTypes.IProps) {
  const { onClickChangePassword, errorMessage, successPassword, loadingPassword, className } = props;

  const [passwords, setPasswords] = useState<IUserChangePassword>({ ...DEFAULT_VALUES });
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [wrongPassword, setWrongPassword] = useState<string>();
  const [newPassErrorMes, setNewPassErrorMes] = useState<string>();
  const [duplicatePassErrorMes, setDuplicatePassErrorMes] = useState<string>();

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (USER_CHANGE_PASSWORD_TYPES.NEW === name && newPassErrorMes) {
      setNewPassErrorMes(undefined);
    }
    if (USER_CHANGE_PASSWORD_TYPES.CURRENT === name && wrongPassword) {
      setWrongPassword(undefined);
    }
    if (USER_CHANGE_PASSWORD_TYPES.DUPLICATE === name && duplicatePassErrorMes) {
      setDuplicatePassErrorMes(undefined);
    }

    setPasswords({ ...passwords, [name]: value });
  };

  const onCancelButtonClick = () => {
    setCollapsed(false);
    setPasswords({ ...DEFAULT_VALUES });
  };

  const savePasswordByInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSavePassword();
    }
  };

  const onSavePassword = () => {
    let isError = false;
    if (passwords.current.length === 0) {
      setWrongPassword('Необходимо ввести текущий пароль');
      isError = true;
    }

    if (!isValidPassword(passwords.new)) {
      setNewPassErrorMes('Пароль должен состоять из букв на латинице и цифр. Минимум 6 символов');
      isError = true;
    }

    if (passwords.duplicate.length < 1) {
      setDuplicatePassErrorMes('Необходимо ввести пароль еще раз');
      isError = true;
    } else {
      if (passwords.duplicate !== passwords.new) {
        setDuplicatePassErrorMes('Пароли не совпадают');
        isError = true;
      }
    }

    if (isError) return;
    onClickChangePassword && onClickChangePassword({
      old_password: passwords.current,
      new_password: passwords.new },               {
        onSuccess: () => {
          onCancelButtonClick();
        },
      });
  };

  useEffect(
    () => {
      errorMessage && setWrongPassword(errorMessage);
    },
    [errorMessage],
  );

  useEffect(
    () => {
      successPassword && setCollapsed(false);
    },
    [successPassword],
  );

  const isValidPassword = (password: string) => password.length >= 8 && /[a-zA-Z]/.test(password);

  return (
    <div className={
      classNames(
        'user-change-pass p-24 d-flex justify-content-between',
        { 'cursor-pointer': !collapsed }, className,
    )}>
      {collapsed ?
        <div className="user-change-pass__form">
          <Input
            name={USER_CHANGE_PASSWORD_TYPES.CURRENT}
            type="password"
            placeholder="Пароль"
            label="Текущий пароль"
            classNames="mb-32"
            value={passwords.current}
            onChange={onInputChange}
            errorMessage={wrongPassword}
            onKeyDown={savePasswordByInput}
          />
          <Input
            name={USER_CHANGE_PASSWORD_TYPES.NEW}
            type="password"
            placeholder="Пароль"
            label="Новый пароль"
            classNames="mb-32"
            value={passwords.new}
            errorMessage={newPassErrorMes}
            onChange={onInputChange}
            onKeyDown={savePasswordByInput}
          />
          <Input
            name={USER_CHANGE_PASSWORD_TYPES.DUPLICATE}
            type="password"
            placeholder="Пароль"
            label="Повторите пароль"
            classNames="mb-32"
            value={passwords.duplicate}
            errorMessage={duplicatePassErrorMes}
            onChange={onInputChange}
            onKeyDown={savePasswordByInput}
          />
          <div className="form__button-wrapper pos_relative">
            <Button
              variant="textmed"
              classNames="fill_w"
              loading={loadingPassword}
              onClick={onSavePassword}
            >
              Сохранить
            </Button>
            <Button
              type="link"
              color="blacker"
              variant="textmed"
              classNames="form__button pos_absolute"
              onClick={onCancelButtonClick}
            >
              Отменить
            </Button>
          </div>
        </div> :
        <div
          className="d-flex align-items-center justify-content-between fill_w"
          onClick={() => setCollapsed(true)}
        >
          <Typography variant="textmed">Изменить пароль</Typography>
          <Image
            alt="left arrow"
            src={LeftArrow}
          />
        </div>
      }
    </div>
  );
}

export default CardUserChangePassword;
