import React, { useEffect, useState, useContext, useRef } from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router';

import { mapPropsToAttributes } from 'src/core/components';
import { useOutsideClick } from 'src/hooks/useOutsideClick';
import { deleteSlash } from 'src/core/components/router';

import Image from 'src/components/atoms/Image';
import Nav from 'src/components/molecules/Nav';
import NavItem from 'src/components/molecules/Nav/navItem.index';

import SidebarArrowClickContext from 'src/components/organisms/Layout/SidebarArrowClickContext';
import { SidebarTypes } from 'src/components/molecules/Sidebar/types';
import { INavItem } from 'src/components/molecules/Nav/types';
import Logo from 'src/assets/img/logos/default-logo.svg';
import DoubleArrow  from 'src/assets/img/icons/double-arrow.svg';
import './index.scss';

function Sidebar(props: SidebarTypes.IProps) {
  const {
    navItems, cntTopNavItems, getCollapsed, isUserAdmin, isWindowSmall,
    companyLogo, location,
  } = props;
  const pathName = deleteSlash(location.pathname);
  const ref = useRef<HTMLDivElement>(null);
  const topNavItems = navItems.slice(0, cntTopNavItems);
  const bottomNavItems = navItems.slice(cntTopNavItems);
  const [activeNav, setActiveNav] = useState<string>(pathName || '');
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const { showSidebar, setShowSidebar } = useContext(SidebarArrowClickContext);
  const navPath = activeNav.split('/').slice(0, 2).join('/');

  const attributes = mapPropsToAttributes<SidebarTypes.IProps>(
    props, 'sidebar', 'flex-column justify-content-between', 'pos_fixed',
    { 'sidebar--minified': !collapsed },
    { 'sidebar--min-window': isWindowSmall && showSidebar },
  );

  useOutsideClick(ref, () =>  {
    if (showSidebar) setShowSidebar(false);
  });

  const toggleCollapse = () => setCollapsed(!collapsed);
  const toggleShowSidebar = () => setShowSidebar(false);

  useEffect(() => getCollapsed && getCollapsed(collapsed), [collapsed]);

  const checkIsAdmin = (path: string) => {
    return path === 'admin/company' && isUserAdmin;
  };

  return (
    <div { ...attributes } ref={ref}>
      <div>
        <div className={classNames(
          'sidebar__header py-24 pl-24 pr-12 d-flex justify-content-between align-items-flex-start',
          { 'pr-24 justify-content-center flex-column': !collapsed },
        )}>
          {collapsed && <Image alt="company logo" src={companyLogo || Logo} className="header__logo" /> }
          <div
            className="header__arrow-img-wrapper d-flex align-items-center justify-content-center"
            onClick={isWindowSmall ? toggleShowSidebar : toggleCollapse}
          >
            <Image
              alt="double arrow"
              src={DoubleArrow}
              className={classNames(
                'header__arrow-img',
                { 'header__arrow-img--minified': !collapsed && !isWindowSmall },
              )}
            />
          </div>
        </div>
        <Nav>
          {topNavItems.map((navItem:INavItem) => (
            <NavItem
              key={navItem.name}
              name={navItem.name}
              collapsed={collapsed}
              icon={navItem.icon}
              title={navItem.title}
              path={navItem.path}
              isActive={navPath === navItem.name}
              notifications={navItem.notifications}
              fillElementsNames={props.fillElementsNames}
              onNavClick={(name: string) => setActiveNav(name)}
            />
          ))}
        </Nav>
      </div>
      <Nav>
        {bottomNavItems.map((navItem:INavItem) => (
          (navItem.path !== 'admin/company' || checkIsAdmin(navItem.path)) &&
          <NavItem
            key={navItem.name}
            name={navItem.name}
            collapsed={collapsed}
            icon={navItem.icon}
            title={navItem.title}
            path={navItem.path}
            isActive={navPath === navItem.name}
            notifications={navItem.notifications}
            fillElementsNames={props.fillElementsNames}
            onNavClick={(name: string) => setActiveNav(name)}
          />
        ))}
      </Nav>
    </div>
  );
}

export default withRouter(Sidebar);
