import React from 'react';
import classNames from 'classnames';

import Button from 'src/components/atoms/Button';
import Typography from 'src/components/atoms/Typography';

import { NavItemTypes } from 'src/components/molecules/Nav/types';
import 'src/components/molecules/Nav/index.scss';

function NavItem(props: NavItemTypes.IProps) {
  const {
    icon, title, isActive,
    notifications, name, path,
    onNavClick: propsOnNavClick,
    collapsed,
    fillElementsNames,
  } = props;

  const onNavClick = ()  => propsOnNavClick && propsOnNavClick(name);

  const getAmountNotifications = (notifications: number) => notifications < 100 ? notifications : '99+';

  return (
    <Button
      classNames={[
        'nav-item pl-24 pr-20 d-flex justify-content-between align-items-center',
        { 'nav-item--active': isActive },
        { 'pr-24 nav-item--minified flex-column': !collapsed },
      ]}
      onClick={onNavClick}
      to={`/${path}`}
    >
      <div className="d-flex justify-content-between align-items-center">
        {icon && (
          <div
            className={
              classNames(
                'nav-item__img-wrapper d-flex align-items-center justify-content-center',
                fillElementsNames && fillElementsNames.includes(name) ? 'nav-item__img-wrapper--fill' : 'nav-item__img-wrapper--stroke',
              )}
          >
            {icon}
          </div>
        )}
        {collapsed && (
          <Typography
            color="blacker"
            variant="textmed"
            classNames="nav-item__title ml-24"
          >
            {title}
          </Typography>
        )}
      </div>
      {notifications ? (
         <div
           className={classNames(
             'nav-item__notifications d-flex flex-column align-items-center justify-content-center',
             notifications > 9 && (notifications < 100 ? 'nav-item__notifications--medium' : 'nav-item__notifications--large'),
           )}>
           <Typography
             variant={collapsed ? 'textmed' : 'xsmall'}
             color="whiter"
           >
             {getAmountNotifications(notifications)}
           </Typography>
         </div>
      ) : ''}
    </Button>
  );
}

export default NavItem;
