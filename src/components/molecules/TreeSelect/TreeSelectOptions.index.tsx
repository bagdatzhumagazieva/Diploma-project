import React  from 'react';
import classNames from 'classnames';

import Checkbox from 'src/components/molecules/Checkbox';
import Typography from 'src/components/atoms/Typography';

import SmallArrow from 'src/components/atoms/Svg/smallArrow';
import { ITreeOption, TreeSelectOptionsTypes } from 'src/components/molecules/TreeSelect/types';

function TreeSelectOptions(props: TreeSelectOptionsTypes.IProps) {
  const {
    spacerCount,
    treeOptions,
    withCheckbox,
    openedTreeObj,
    checkedTreeObj,
    onTreeItemClick,
    selectedTreeOption,
    onTreeCollapseClick,
    onCheckboxChanges,
    selectedTreeOptions,
    isMultiSelect,
    chooseLimit,
  } = props;
  let global = 0;

  if (treeOptions) global = spacerCount + 1;
  else global = 0;

  const onCollapseClick = (value: string) => () => {
    props.onTreeCollapseClick && props.onTreeCollapseClick(value);
  };

  const onOptionClick = (option: ITreeOption) => () => {
    if (selectedTreeOptions && chooseLimit && chooseLimit === selectedTreeOptions.length &&
      selectedTreeOptions.every(item => item.value !== option.value)) return;
    props.onTreeItemClick && props.onTreeItemClick(option);
  };

  const onCheckboxClicked = (value: string) => (clickedState: boolean) => {
    props.onCheckboxChanges && props.onCheckboxChanges(value, clickedState);
  };

  return (
    <>
      {treeOptions && treeOptions.map((item: ITreeOption, index: number) => {
        const isChildrenCollapsed = (openedTreeObj && openedTreeObj[item.value]);
        const isParentChecked = (checkedTreeObj && checkedTreeObj[item.value]) || props.isParentChecked;
        return (
          <div
            ref={item.itemRef || null}
            key={index}
            className={classNames([
              'options__item d-flex flex-column',
              { 'options__item--disabled': item.disabled },
            ])}
          >
            <div className="options__node d-flex align-items-center">
              {[...Array(spacerCount)].map((_, i) => (<div key={i} className="options__item__space" />))}
              {item.children && item.children.length > 0 && (
                <SmallArrow
                  className={classNames([
                    'options__item__arrow',
                    { 'options__item__arrow--open': isChildrenCollapsed },
                  ])}
                  onClick={!item.disabled ? onCollapseClick(item.value) : undefined}
                />
              )}
              {withCheckbox && (
                <Checkbox
                  key={item.value}
                  id={item.value}
                  disabled={item.disabled}
                  isClicked={item.checkboxChecked || isParentChecked}
                  setClicked={!item.disabled ? onCheckboxClicked(item.value) : undefined}
                />
              )}
              <div className={classNames([
                'd-flex align-items-center fill_w',
                { 'px-16': item.icon },
                { 'options__item__name--active' : selectedTreeOption?.value === item.value && item.icon },
              ])}>
                {item.icon}
                <Typography
                  variant="text"
                  classNames={[
                    'options__item__name ml-8 fill_w',
                    { 'options__item__name--active' : selectedTreeOption?.value === item.value && !item.icon ||
                        selectedTreeOptions?.some(selectedOption => selectedOption.value === item.value)},
                    { 'options__item__name--disable' :
                        !item.disabled && selectedTreeOptions && chooseLimit === selectedTreeOptions.length &&
                        selectedTreeOptions.every(selectedOption => selectedOption.value !== item.value)},
                    { 'px-16 py-16': item.icon },
                  ]}
                  onClick={!item.disabled ? onOptionClick(item) : undefined}
                >
                  {item.name}
                </Typography>
              </div>
            </div>
            {item.children && Array.isArray(item.children) && item.children.length > 0 && (
              <div
                className={isChildrenCollapsed ? 'd-flex flex-column item__children-block' : 'd-none'}
              >
                <TreeSelectOptions
                  chooseLimit={chooseLimit}
                  isMultiSelect={isMultiSelect}
                  selectedTreeOption={selectedTreeOption}
                  treeOptions={item.children}
                  spacerCount={global}
                  onCheckboxChanges={onCheckboxChanges}
                  withCheckbox={withCheckbox}
                  isParentChecked={isParentChecked}
                  openedTreeObj={openedTreeObj}
                  checkedTreeObj={checkedTreeObj}
                  onTreeCollapseClick={onTreeCollapseClick}
                  onTreeItemClick={onTreeItemClick}
                  selectedTreeOptions={selectedTreeOptions}
                />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

export default TreeSelectOptions;
