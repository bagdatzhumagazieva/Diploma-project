import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import Typography from 'src/components/atoms/Typography';

import { TabsTypes, ITabOption } from 'src/components/molecules/Tabs/types';
import './index.scss';

function Tabs(props: TabsTypes.IProps) {
  const {
    children, tabOptions, activeId, setActiveTabId,
    className, contentClassName, pathname, hideLine,
  } = props;

  const onTabClick = (id: string) => setActiveTabId && setActiveTabId(id);

  const tabHeaderOption = (id: string, label: string) => (
    <div
      key={id}
      className={classNames(
        'options__item', 'px-24',
        { 'options__item--active': id === activeId },
      )}
      onClick={() => onTabClick(id)}
    >
      <Typography variant="textmed">{label}</Typography>
    </div>
  );

  return (
    <div className={classNames('tabs d-flex flex-column', className)}>
      <div
        className="tabs__options"
        style={hideLine ? { borderTop: 'none' } : {}}>
        <div className="grid d-flex">
          {tabOptions.map((item: ITabOption, index: number) => (
            pathname ? (
              <Link key={index} to={ index !== 0 ? `${pathname}?type=${item.id}` : pathname}>
                {tabHeaderOption(item.id, item.label)}
              </Link>
            ) : tabHeaderOption(item.id, item.label)
          ))}
        </div>
      </div>
      <div className={classNames('tabs__content flex-grow-1', contentClassName)}>
        {children.length > 0 ? (
          <div className={`tabs__content-inner grid tabs__content--${activeId}`}>
            {children.find((child: any) => child.key === activeId) }
          </div>
        ) : children }
      </div>
    </div>
  );
}

export default Tabs;
