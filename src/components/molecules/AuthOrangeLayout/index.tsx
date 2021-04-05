import React from 'react';
import classNames from 'classnames';
import { AuthOrangeLayoutTypes } from 'src/components/molecules/AuthOrangeLayout/types';
import AuthFooter from 'src/components/molecules/AuthFooter';
import './index.scss';

function AuthOrangeLayout(props: AuthOrangeLayoutTypes.IProps) {
  const { children, className } = props;

  return (
    <div
      className={classNames(
        'auth-orange-layout', 'd-flex justify-content-between align-items-center flex-column',
        'fill', className,
      )}
    >
      <div className="auth-orange-layout__content mt-24 d-flex align-items-center flex-column">
        {children}
      </div>
      <AuthFooter classNames="mt-32" />
    </div>
  );
}

export default AuthOrangeLayout;
