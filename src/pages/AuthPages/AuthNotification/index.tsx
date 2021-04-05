import React from 'react';

import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import Typography from 'src/components/atoms/Typography';
import AuthFooter from 'src/components/molecules/AuthFooter';

import Logo from 'src/assets/img/logos/orange_logo.svg';
import Done from 'src/assets/img/logos/done.svg';
import 'src/pages/AuthPages/AuthNotification/index.scss';

function AuthNotificationPage() {
  return (
    <div className="auth-notification d-flex flex-column justify-content-between vh_100 fill_w">
      <div>
        <div className="auth-notification__logo">
          <Image
            src={Logo}
            alt="gamisoft"
          />
        </div>
        <div className="auth-notification__content d-flex justify-content-center align-items-center fill_h">
          <div className="content__block d-flex flex-column text-center">
            <Image
              alt="check_icon"
              src={Done}
            />
            <Typography
              variant="h1"
              className="mt-24"
            >
              Проверьте вашу почту
            </Typography>
            <Typography
              variant="text"
              className="color_grey_additional_2 mt-8"
            >
              Ссылка для восстановления была отправлена на ваш почтовый адрес.
            </Typography>
            <Button
              to="/auth"
              variant="textmed"
              className="mt-32"
            >
              На страницу авторизации
            </Button>
            <Button
              variant="subtext"
              type="link"
              className="mt-16"
            >
              Отправить еще раз
            </Button>
          </div>
        </div>
      </div>
      <AuthFooter color="blacker" classNames="mt-64" />
    </div>
  );
}

export default AuthNotificationPage;
