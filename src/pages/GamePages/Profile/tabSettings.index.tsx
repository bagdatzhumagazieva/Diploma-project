import React from 'react';

import CardUserChangePassword from 'src/components/molecules/Cards/CardUserChangePassword';
import CardUserEditing from 'src/components/molecules/Cards/CardUserEditing';
import Typography from 'src/components/atoms/Typography';

import { ProfilePageTypes } from 'src/pages/GamePages/Profile/types';

function TabSettings(props: ProfilePageTypes.TabSettingsProps) {
  const { userInformation, onSaveClick, onClickChangePassword, errorMessage, successPassword, loadingPassword } = props;

  return (
    <>
      <div className="mb-32">
        <Typography variant="h1" classNames="mb-16">Учетная запись</Typography>
        <CardUserEditing
          onSaveClick={onSaveClick}
          userInformation={userInformation}
          userImage="src"
          classNames="profile__card-user-editing"
        />
      </div>
      <CardUserChangePassword
        onClickChangePassword={onClickChangePassword}
        errorMessage={errorMessage}
        successPassword={successPassword}
        loadingPassword={loadingPassword}
        className="profile__card-user-change-pass"
      />
    </>
  );
}

export default TabSettings;
