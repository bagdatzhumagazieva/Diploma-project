import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import useNotification from 'src/components/molecules/Notification/useNotification';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';

import profileActions from 'src/store/profile/actions';

import Typography from 'src/components/atoms/Typography';
import CardProfile from 'src/components/molecules/Cards/CardProfile';
import Layout from 'src/components/organisms/Layout';
import Tabs from 'src/components/molecules/Tabs';
import TabActivity from 'src/pages/GamePages/Profile/tabAcitivity.index';
import TabCertificates from 'src/pages/GamePages/Profile/tabCertificates.index';
import TabAchievement from 'src/pages/GamePages/Profile/tabAchievement.index';
import TabSettings from 'src/pages/GamePages/Profile/tabSettings.index';

import { NotificationType } from 'src/components/molecules/Notification/types';
import { ProfilePageTypes } from 'src/pages/GamePages/Profile/types';
import { IDatePicker } from 'src/components/molecules/DatePicker/types';
import { PROFILE_TABS } from 'src/pages/GamePages/Profile/consts';
import { getMonth, Month } from 'src/components/molecules/DatePicker/enum';
import { DATE_VALIDATION } from 'src/core/validataion';
import { ProfileTypes } from 'src/store/profile/types';
import AppContext from 'src/components/AppContext';
import { getCompanyById } from 'src/store/company/actions';
import 'src/pages/GamePages/Profile/index.scss';
import queryString from 'query-string';
import { useHistory } from 'react-router';

function ProfilePage(props: ProfilePageTypes.IProps) {
  const {
    profile, successPassword, error,
    loadingPassword, onUpdateProfile, onChangePassword,
    onUploadAvatar, employment, company, getCompanyById,
  } = props;
  const history = useHistory();
  const { location } = history;
  const { pathname } = location;
  const { companyId } = useContext(AppContext);
  const { type } = queryString.parse(location.search);
  const [activeTab, setActiveTab] = useState<string>(PROFILE_TABS[0].id);
  const [tabs, setTabs] = useState<any[]>([]);

  const notification = useNotification();

  const addNotification = (type: NotificationType, description: string) => {
    notification.add(
      {
        type,
        description,
        withIcon: true,
        duration: 4000,
        size: 'small',
        width: '600px',
      });
  };
  const handleActiveTab = (id: string) => {
    setActiveTab(id);
  };

  const onClickSaveProfile = (data: ProfileTypes.IUpdateBodyProps) => {
    const { avatar, ...restData } = data;
    onUpdateProfile && onUpdateProfile(restData, {
      onSuccess: () => {
        if ((typeof avatar === 'object') && profile) {
          onUploadAvatar && onUploadAvatar(avatar, profile.uuid, {
            onSuccess: () => {
              addNotification(NotificationType.Success, 'Данные успешно изменены!');
            },
          });
        } else {
          addNotification(NotificationType.Success, 'Данные успешно изменены!');
        }
      },
    });
  };

  const onClickChangePassword = (data: any, callback?: any) => {
    onChangePassword && onChangePassword(data, callback);
  };

  const getBirthDate = (date: string | null | undefined): IDatePicker => {
    if (date && DATE_VALIDATION.test(date)) {
      const data = date.split('-');
      return {
        year: +data[0],
        month: getMonth(+data[1]),
        day: +data[2],
      };
    } return {
      day: 1,
      month: Month.JANUARY,
      year: 1950,
    };
  };

  useEffect(
    () => {
      if (!type) return;
      setActiveTab(Array.isArray(type) ? type[0] : type);
    },
    [type],
  );

  useEffect(
    () => {
      if (successPassword) {
        addNotification(NotificationType.Success, 'Пароль успешно изменен!');
      }
    },
    [successPassword],
  );

  useEffect(
    () => {
      if (profile) {
        const data = [
          <TabActivity companyId={companyId} />,
          <TabCertificates companyId={companyId} />,
          <TabAchievement companyId={companyId} />,
          <TabSettings
            userInformation={{
              firstName: profile.name || '',
              phoneNumber: profile.phone || '',
              gender: profile.gender || null,
              email: profile.email || '',
              secondName: profile.surName || '',
              date: getBirthDate(profile.birthDate),
              avatar: profile.avatarThumbnailUrl,
              countryCode: profile?.countryCode,
            }}
            errorMessage={error}
            successPassword={successPassword}
            onClickChangePassword={onClickChangePassword}
            onSaveClick={onClickSaveProfile}
            loadingPassword={loadingPassword}
          />,
        ];
        setTabs(data);
      }
    },
    [profile, companyId],
  );

  useEffect(
    () => {
      if (typeof companyId !== 'number' || (company && companyId === company.id)) return;
      getCompanyById && getCompanyById(companyId);
    },
    [company, companyId],
  );

  return (
    <Layout className="profile">
      <div className="grid py-48">
        <Typography variant="headline" className="mb-42">Профиль</Typography>
        {profile && (
          <CardProfile
            key={profile.login + profile.id}
            className="profile__card-profile"
            userName={profile?.fullName || '-'}
            userImage={profile.avatarThumbnailUrl}
            // TODO: add curPoint, linkShop when shop will be ready
            curPoints={employment?.rewardAvailable || 0}
            linkShop={''}
            branch={employment?.branch?.name || ''}
            points={employment?.rewardAmount || 0}
            groups={employment?.groups?.map(e => e.name || '') || []}
            status={''}
            companyName={company?.name || ''}
          />
        )}
      </div>
      <Tabs
        pathname={pathname}
        key={activeTab}
        tabOptions={PROFILE_TABS}
        activeId={activeTab}
        setActiveTabId={handleActiveTab}
        contentClassName="color_grey__bg pt-32 pb-48"
      >
        {tabs.map((item, index) => (
          <div
            key={PROFILE_TABS[index].id}
            className="profile__content"
          >
            {item}
          </div>
        ))}
      </Tabs>
    </Layout>
  );
}

export const mapStateToProps = (state: any) => ({
  profile: state.profileReducer.profile.data,
  error: state.profileReducer.changePassword.errorMessage,
  successPassword: state.profileReducer.changePassword.data,
  loadingPassword: state.profileReducer.changePassword.loading,
  avatar: state.profileReducer.avatar,
  employment: state.employmentReducer.employment.data,
  company: state.companyReducer.company.data,
});

export const mapDispatchToProps = {
  getCompanyById,
  onUpdateProfile: profileActions.updateProfile,
  onChangePassword: profileActions.changePassword,
  onUploadAvatar: profileActions.uploadAvatar,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withNotificationProvider(ProfilePage));
