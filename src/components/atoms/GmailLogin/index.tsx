import GoogleLogin from 'react-google-login';
import React from 'react';
import Button from 'src/components/atoms/Button';
import Image from 'src/components/atoms/Image';
import { GmailLoginTypes } from 'src/components/atoms/GmailLogin/types';
import Gmail from 'src/assets/img/socials/gmail.svg';

function GmailLogin(props: GmailLoginTypes.IProps) {
  const { onGetToken } = props;
  const responseGoogle = (response: any) => {
    if (onGetToken && response.tokenId) {
      const data = {
        token: response.tokenId,
        type: 'google_login',
      };
      onGetToken(data);
    }
  };

  return (
    <GoogleLogin
      clientId="313401704397-n46rbqq34fbmg17lpoj3p6gkf7dhi5f1.apps.googleusercontent.com"
      render={renderProps => (
        <Button
          onClick={renderProps.onClick} disabled={renderProps.disabled}
          className="social-links__items"
          type="link"
        >
          <Image
            alt="gmail"
            src={Gmail}
          />
        </Button>
      )}
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
}

export default GmailLogin;
