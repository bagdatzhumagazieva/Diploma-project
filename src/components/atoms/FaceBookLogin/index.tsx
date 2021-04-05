import React from 'react';

import Image from 'src/components/atoms/Image';
import Button from 'src/components/atoms/Button';

import FaceBook from 'src/assets/img/socials/facebook.svg';
import { GmailLoginTypes } from 'src/components/atoms/GmailLogin/types';

// @ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

function FaceBookLogin(props: GmailLoginTypes.IProps) {
  const { onGetToken } = props;

  const responseFacebook = (response: any) => {
    if (onGetToken && response.accessToken) {
      const data = {
        token: response.accessToken,
        type: 'facebook_login',
      };
      onGetToken(data);
    }
  };

  return (
    <FacebookLogin
      render={(renderProps: any) => (
        <Button
          onClick={renderProps.onClick}
          className="social-links__items"
          type="link"
        >
          <Image
            alt="facebook"
            src={FaceBook}
          />
        </Button>
      )}
      appId="2561114204145290"
      callback={responseFacebook}
    />
  );
}

export default FaceBookLogin;
