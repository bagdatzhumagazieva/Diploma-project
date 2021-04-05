import React, { useContext } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';

import { mapPropsToAttributes } from 'src/core/components';
import { LOCAL_STORAGE } from 'src/core/store/values';

import { setCompanyId } from 'src/store/company/actions';
import { logout } from 'src/store/utils/actions';

import Image from 'src/components/atoms/Image';
import Preloader from 'src/components/atoms/Preloader';
import InputSearcher from 'src/components/molecules/InputSearcher';
import SidebarArrowClickContext from 'src/components/organisms/Layout/SidebarArrowClickContext';
import NotificationBlock from 'src/components/organisms/Header/NotificationBlock';
import AccountBlock from 'src/components/organisms/Header/AccountBlock';

import { HeaderTypes } from 'src/components/organisms/Header/types';
import DoubleArrow from 'src/assets/img/icons/double-arrow.svg';
import Logo from 'src/assets/img/logos/default-logo.svg';
import './index.scss';

function Header(props: HeaderTypes.IProps) {
  const {
    isHasNotifications, companyLogo,
    logout, companies = { data: [], loading: false },
    profile, setPageLoading, onChangeAccountClick,
  } = props;
  const history = useHistory();
  const attributes = mapPropsToAttributes<HeaderTypes.IProps>(
    props, 'header', 'd-flex justify-content-between', 'px-24', 'pos_fixed',
  );

  const onLogout = () => {
    const curAccToken = localStorage.getItem(LOCAL_STORAGE.TOKEN) || '';
    const accountsStr = localStorage.getItem(LOCAL_STORAGE.ACCOUNTS);
    const accountsTokens:string[] = accountsStr ? JSON.parse(accountsStr) : [];
    localStorage.setItem(
      LOCAL_STORAGE.ACCOUNTS,
      JSON.stringify(accountsTokens.filter(item => item !== curAccToken)),
    );
    logout && logout();
    history.push('/');
  };

  const { showSidebar, setShowSidebar } = useContext(SidebarArrowClickContext);

  return (
    <div {...attributes}>
      <div className="d-flex">
        <div className="header__company mr-48 align-items-center">
          <div
            className="header__arrow-img-wrapper d-flex align-items-center justify-content-center mr-16"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <Image
              alt="double arrow"
              src={DoubleArrow}
              className={classNames('header__arrow-img', { 'header__arrow-img--minified': !showSidebar })}
            />
          </div>
          <Image alt="orange logo gamisoft" src={companyLogo || Logo} className="header__logo"/>
        </div>
        <InputSearcher classNames="header__searcher"/>
      </div>
      <Preloader loading={profile?.loading}>
        <div className="d-flex align-items-center pos_relative">
          <NotificationBlock isHasNotifications={isHasNotifications} />
          <AccountBlock
            companies={companies}
            profile={profile}
            onClickLogout={onLogout}
            setPageLoading={setPageLoading}
            onChangeAccountClick={onChangeAccountClick}
          />
        </div>
      </Preloader>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  companyId: state.companyReducer.companyId,
});

const mapDispatchToProps = {
  setCompanyId,
  logout,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
