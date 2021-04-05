import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { useLocation, withRouter } from 'react-router';
import { useWindowDimensions } from 'src/hooks/useWindowDimensions';
import { mapPropsToAttributes } from 'src/core/components';
import { LOCAL_STORAGE } from 'src/core/store/values';

// import { getCompanyById, setCompanyId, getCompanies } from 'src/store/company/actions';
// import { goToGamePage } from 'src/store/utils/actions';
// import { getEmploymentByCompanyId } from 'src/store/employment/actions';
// import { getProfile } from 'src/store/profile/actions';
// import { getMyTasks } from 'src/store/task/actions';
// import { getNotification } from 'src/store/notifications/actions';
// import { getCoursesCount } from 'src/store/course/actions';
// import { leaveBattle } from 'src/store/battles/action';

import ModalLoading from 'src/components/atoms/ModalLoading';
import AppContext from 'src/components/AppContext';
import Sidebar from 'src/components/molecules/Sidebar';
import withNotificationProvider from 'src/components/molecules/Notification/withNotificationProvider';
import Header from 'src/components/organisms/Header';

import SidebarArrowClickContext from 'src/components/organisms/Layout/SidebarArrowClickContext';
import { LayoutTypes } from 'src/components/organisms/Layout/types';
import { INavItem } from 'src/components/molecules/Nav/types';
import useNotification from 'src/components/molecules/Notification/useNotification';
import { RouterPaths } from 'src/core/enum';
import {
  cntAdminTopNavItems, fillElementsNames,
  SidebarAdminData, SidebarData,
} from 'src/components/molecules/Sidebar/consts';
import Modal from 'src/components/molecules/Modal';
import ModalCardAccount from 'src/components/molecules/Cards/CardAccount/ModalCardAccount';
import { IAccountData } from 'src/core/store/types';
import { ProfileTypes } from 'src/store/profile/types';
import { CompaniesTypes } from 'src/store/company/types';
import { NotificationType } from 'src/components/molecules/Notification/types';
import { getProfile as getProfileAPI } from 'src/store/profile/api';
import { getCompanies as getCompaniesAPI } from 'src/store/company/api';
import 'src/components/organisms/Layout/index.scss';

function Layout(props: LayoutTypes.IProps) {
  const {
    getCompanies, getEmploymentByCompanyId,
    companies, employment, isAdminRouting, setCompanyId,
    getProfile, profile, childrenClassName,
    getMyExercises, myExercisesTotal, getNotification,
    notifications, history, unauthorized,
    company, getCompanyById, getCoursesCount, coursesCount,
    leaveBattle,
  } = props;
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [isSuperUserAdmin, setIsSuperUserAdmin] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const isWindowSmall = useWindowDimensions().windowWidth <= 1400;
  const [sideBar, setSideBar] = useState<INavItem[]>(SidebarData);
  const attributes = mapPropsToAttributes<LayoutTypes.IProps>(
    props, 'layout', 'd-flex', { 'layout--minified': !collapsed && !isWindowSmall },
  );
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [isPageLoading, setPageLoading] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<Map<string, IAccountData>>(new Map<string, IAccountData>());
  const [showModal, setShowModal] = useState<boolean>(false);
  const value = { showSidebar, setShowSidebar };
  const { companyId } = useContext(AppContext);
  const location = useLocation();

  const unreadNotification = notifications ? notifications.filter(notification => !notification.isRead) : [];
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

  useEffect(() => {
    const lastPathname = localStorage.getItem(LOCAL_STORAGE.LAST_PATHNAME) || '';
    const isFinishedBattle = (localStorage.getItem(LOCAL_STORAGE.BATTLE_FINISHED) || '') === 'finished';
    const battleId = +lastPathname.slice(lastPathname.indexOf('battle/') + 7);
    localStorage.setItem(LOCAL_STORAGE.LAST_PATHNAME, location.pathname);
    if (!isFinishedBattle && lastPathname.includes('battle/') && !location.pathname.includes('battle/')) {
      localStorage.removeItem(LOCAL_STORAGE.BATTLE_FINISHED);
      window.addEventListener('beforeunload', e => alertUser(e, battleId));
      if (window.confirm('Если вы закроете приложение, вам будет засчитано поражение. Вы уверены, что хотите отдать победу сопернику? ')) {
        leaveBattle && companyId && leaveBattle(battleId, companyId);
      } else {
        history.goBack();
      }
    }
    return () => {
      if (lastPathname.includes('battle/') && !location.pathname.includes('battle/')) {
        window.removeEventListener('beforeunload', e => alertUser(e, battleId));
      }
    };
  },        [location]);

  const alertUser = (e: any, battleId: number) => {
    e.preventDefault();
    e.returnValue = '';
    if (window.confirm('Если вы закроете приложение, вам будет засчитано поражение. Вы уверены, что хотите отдать победу сопернику? ')) {
      companyId && leaveBattle && leaveBattle(battleId, companyId);
    }
  };

  useEffect(
    () => {
      const accountsStr = localStorage.getItem(LOCAL_STORAGE.ACCOUNTS);
      const accountsTokens:string[] = accountsStr ? JSON.parse(accountsStr) : [];
      const newAccounts: Map<string, IAccountData> = new Map<string, IAccountData>();
      Array.isArray(accountsTokens) &&
      accountsTokens.filter(token => token !== localStorage.getItem(LOCAL_STORAGE.TOKEN)).forEach((token) => {
        getProfileAPI(token).then((response: any) => {
          response.text().then((value: any) => {
            const profileData: ProfileTypes.IResponseProps = JSON.parse(value)?.data;
            getCompaniesAPI(token).then((response: any) => {
              response.text().then((value: any) => {
                const companies: CompaniesTypes.IResponseProps[] = JSON.parse(value)?.data?.companies;
                const accCompanies = Array.isArray(companies) ?
                  companies.map(item => ({
                    id: item?.id || -1,
                    name: item?.name || '',
                    uuid: item?.uuid || '',
                    imageThumbnail: item?.logo_thumbnail_url || '',
                  })) : [];

                const accountData: IAccountData = {
                  imageThumbnailUrl: profileData?.avatar_thumbnail_url || '',
                  fullName: [profileData?.first_name, profileData?.last_name].filter(Boolean).join(' '),
                  id: profileData?.id || -1,
                  email: profileData?.email || '',
                  companies: accCompanies,
                };
                newAccounts.set(token, accountData);
                setAccounts(newAccounts);
              });
            });
          });
        });
      });
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      if (!token) {
        history.push('/');
      }
    },
    [],
  );

  useEffect(
    () => {
      const token = localStorage.getItem(LOCAL_STORAGE.TOKEN);
      if (!token) {
        history.push('/');
      }
      if (unauthorized) {
        localStorage.removeItem(LOCAL_STORAGE.TOKEN);
        localStorage.removeItem(LOCAL_STORAGE.COMPANY_ID);
        history.push('/');
      }
    },
    [unauthorized],
  );

  useEffect(
    () => {
      getNotification && getNotification(
        {
          page_size: 6,
          page: 1,
          orderField: 'created_at_desc',
        });
      companyId && getMyExercises && getMyExercises({ companyId, page: 1, pageSize: 10 });
      companyId && getCoursesCount && getCoursesCount(companyId);
    },
    [companyId],
  );

  useEffect(
    () => {
      getProfile && getProfile();
      getCompanies && getCompanies(
        {
          onSuccess: (response: any) => {
            if (!response || !Array.isArray(response.companies) || !companyId) return;
          },
        });
    },
    [],
  );

  useEffect(
    () => {
      companyId && getEmploymentByCompanyId && getEmploymentByCompanyId(companyId);
    },
    [companyId, getEmploymentByCompanyId],
  );

  useEffect(
    () => {
      if (myExercisesTotal && coursesCount) {
        setSideBar(prevState => (
          prevState.map(n => n.name === RouterPaths.TASKS_FEED ?
            { ...n, notifications: myExercisesTotal.totalNotFinished }
            : n.name === RouterPaths.EDUCATION
              ? { ...n, notifications: coursesCount.totalNew || 0 } : n)
        ));
      }
    },
    [myExercisesTotal, coursesCount],
  );

  useEffect(
    () => {
      if (!employment) return;
      if (employment?.role === 'admin') {
        setIsUserAdmin(true);
        setCompanyId && employment.companyId && setCompanyId(`${employment.companyId}`);
      }
      const employmentData = {
        companyId: employment.companyId,
        userId: employment.userId,
        id:  employment.id,
      };
      localStorage.setItem('employment', JSON.stringify(employmentData));
    },
    [employment],
  );

  useEffect(
    () => {
      profile?.data && setIsSuperUserAdmin(profile.data.userType === 'super_admin');
      if (profile?.data && !profile.data.fullName) {
        addNotification(NotificationType.Success, 'Заполните фамилию и имя пожалуйста!');
        history.push(`${RouterPaths.PROFILE}?type=3`);
      }
    },
    [profile],
  );

  useEffect(
    () => {
      if (typeof companyId !== 'number' || (company && companyId === company.id)) return;
      getCompanyById && getCompanyById(companyId);
    },
    [company, companyId],
  );

  useEffect(
    () => {
      if (isAdminRouting && employment?.role === 'employee') {
        history.push(`/${RouterPaths.DASHBOARD}`);
      }
    },
    [history, isAdminRouting, employment],
  );

  return (
    <SidebarArrowClickContext.Provider value={value}>
      <>
        <div {...attributes}>
          {false && <Sidebar
            navItems={isAdminRouting ? SidebarAdminData : sideBar}
            cntTopNavItems={isAdminRouting ? cntAdminTopNavItems : sideBar.length - 1}
            fillElementsNames={fillElementsNames}
            getCollapsed={setCollapsed}
            isWindowSmall={isWindowSmall}
            isUserAdmin={isUserAdmin || isSuperUserAdmin}
            companyLogo={company?.logoThumbnailUrl || undefined}
          />}
          <div style={{margin: '0 auto'}} className="layout__content d-flex flex-column">
            <Header
              companies={companies}
              profile={profile}
              isHasNotifications={unreadNotification.length > 0}
              setPageLoading={setPageLoading}
              onChangeAccountClick={() => setShowModal(true)}
              className="layout__header"
            />
            <div className={classNames('layout__children flex-grow-1 d-flex flex-column', childrenClassName)}>
              {props.children}
            </div>
          </div>
        </div>
        {showModal && (
          <Modal width={496} onCloseClick={() => setShowModal(false)}>
            <ModalCardAccount
              accounts={accounts}
              onModalClose={() => setShowModal(false)}
              setPageLoading={setPageLoading}
            />
          </Modal>
        )}
        {isPageLoading && <ModalLoading />}
      </>
    </SidebarArrowClickContext.Provider>
  );
}

const mapStateToProps = (state: any) => ({
  companies: state.companyReducer.companies,
  employment: state.employmentReducer.employment.data,
  profile: state.profileReducer.profile,
  unauthorized: state.utilsReducer.unauthorized.data,
  notifications: state.notificationReducer.notification.data,
  profileLoading: state.profileReducer.profile.loading,
  myExercisesTotal: state.taskReducer.myTasksTotal.data,
  company: state.companyReducer.company.data,
  coursesCount: state.courseReducer.coursesCount.data,
});

const mapDispatchToProps = {
  // getCompanyById,
  // setCompanyId,
  // getCompanies,
  // getNotification,
  // goToGamePage,
  // getEmploymentByCompanyId,
  // getProfile,
  // getCoursesCount,
  // leaveBattle,
  // getMyExercises: getMyTasks,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(withNotificationProvider(Layout)));
