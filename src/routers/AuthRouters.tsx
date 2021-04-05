import * as React from 'react';
import { addSlash } from 'src/core/components/router';
import { RouterPaths } from 'src/core/enum';
import ResetPasswordPage from 'src/pages/AuthPages/ResetPasswordPage';
import ResetPage from 'src/pages/AuthPages/Reset';
import CodeConfirmationPage from 'src/pages/AuthPages/CodeConfirmation';
import RegistrationPage from 'src/pages/AuthPages/Registration';
import AuthNotificationPage from 'src/pages/AuthPages/AuthNotification';
import NotificationPage from 'src/pages/GamePages/Notification';
import RegistrationFormPage from 'src/pages/AuthPages/RegistrationForm';
import CompanyChoice from 'src/pages/AuthPages/CompanyChoice';
import CheckUserActivation from 'src/pages/AuthPages/CheckUserActivation';
import UseTerms from 'src/pages/AuthPages/UseTerms';

const AUTH_ROUTERS = [
  { component: <ResetPasswordPage />, path: addSlash(RouterPaths.RESET_BY_TOKEN), exact: true },
  { component: <ResetPage />, path: addSlash(RouterPaths.RESET), exact: true },
  { component: <CheckUserActivation />, path: addSlash(RouterPaths.USER_ACTIVATION), exact: true },
  { component: <CodeConfirmationPage />, path: addSlash(RouterPaths.CODE_CONFIRMATION), exact: true },
  { component: <RegistrationPage />, path: addSlash(RouterPaths.REGISTRATION), exact: true },
  { component: <AuthNotificationPage />, path: addSlash(RouterPaths.AUTH_NOTIFICATION), exact: true },
  { component: <NotificationPage />, path: addSlash(RouterPaths.NOTIFICATION), exact: true },
  { component: <RegistrationFormPage />, path: addSlash(RouterPaths.REGISTRATION_FORM), exact: true },
  { component: <CompanyChoice />, path: addSlash(RouterPaths.COMPANY_CHOICE), exact: true },
  { component: <UseTerms />, path: addSlash(RouterPaths.USE_TERMS), exact: true },
];

export default AUTH_ROUTERS;
