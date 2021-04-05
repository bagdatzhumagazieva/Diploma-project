import * as React from 'react';
import AuthFooter from 'src/components/molecules/AuthFooter';
import { AuthOrangeLayoutTypes } from 'src/components/molecules/AuthOrangeLayout/types';

function AuthWhiteLayout(props: AuthOrangeLayoutTypes.IProps) {
  return (
    <div className="auth-white-layout d-flex justify-content-between align-items-center flex-column">
      <div className="auth-white-layout__content container mt-48 d-flex align-items-center flex-column">
        {props.children}
      </div>
      <AuthFooter color="blacker" classNames="mt-64" />
    </div>
  );
}

export default AuthWhiteLayout;
