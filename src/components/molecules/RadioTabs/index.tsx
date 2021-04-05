import React from 'react';
import RadioButton from 'src/components/atoms/RadioButton';
import { RadioTabsTypes } from 'src/components/molecules/RadioTabs/types';

function RadioTabs(props: RadioTabsTypes.IProps) {
  const { tabOptions, children, activeIndex } = props;

  const filterChildren = children && children.length > 0 ?
  children.filter((n: any, i: number) => n && n !== undefined) : children;
  const onClickTabIndex = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setActiveTabIndex && props.setActiveTabIndex(event.target.value);
  };

  return (
    <div>
      <div className="d-flex mb-4">
        {tabOptions.map((n: RadioTabsTypes.ITabOptions, i: number) =>
          <RadioButton
            {...n}
            key={i}
            isChecked={n.value === activeIndex}
            className="mr-48"
            setClicked={onClickTabIndex}
          />,
        )}
      </div>
      <div className="tabs__container__item">
        {filterChildren.length > 0
          ? filterChildren.map((n: any, i: number) => (`${i}` === activeIndex && n))
          : filterChildren}
      </div>
    </div>
  );
}

export default RadioTabs;
