import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { mapPropsToAttributes } from 'src/core/components';
import { useOutsideClick } from 'src/hooks/useOutsideClick';

import Loader from 'src/components/atoms/Loader';
import Typography from 'src/components/atoms/Typography';
import FilterArrow from 'src/components/atoms/Svg/Table/filterArrow';
import ItemChips from 'src/components/atoms/ItemChips';
import TreeSelectOptions from 'src/components/molecules/TreeSelect/TreeSelectOptions.index';

import { ITreeOption, TreeSelectTypes } from 'src/components/molecules/TreeSelect/types';
import 'src/components/molecules/TreeSelect/index.scss';

function TreeSelect(props: TreeSelectTypes.IProps) {
  const {
    treeOptions, selectedTreeOption, placeholder, setSelectedOption,
    staticWidth, withCheckbox, openedTreeObject: propsOpenedTreeObject,
    errorMessage, titleVariant, customTree, isPositionStatic, isMultiSelect,
    onCustomTreeOptionClick, loading, isPositionFixed, selectedTreeOptions,
    setSelectedOptions, chooseLimit, withChips, prompt, withoutRef,
  } = props;

  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [openedTreeObj, setOpenedTreeObj] = useState({ ...propsOpenedTreeObject });
  const [checkedTreeObj, setCheckedTreeObj] = useState({});
  const attributes = mapPropsToAttributes<TreeSelectTypes.IProps>(
    props, 'tree-select', 'pos_relative');

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedTreeOption) {
      setOpenedTreeObj({
        ...openedTreeObj,
        [selectedTreeOption.value]: true,
      });
    }
  },        [selectedTreeOption]);

  useOutsideClick(ref, () => {
    if (showOptions) setShowOptions(false);
  });

  const onTreeCollapseClick = (value: string) => {
    const copy = { ...openedTreeObj, [value]: !openedTreeObj[value] };
    setOpenedTreeObj(copy);
  };

  const onTreeItemClick = (option: ITreeOption) => {
    if (!isMultiSelect) {
      setSelectedOption && setSelectedOption(option);
      setShowOptions(false);
    } else {
      if (!setSelectedOptions) return;
      if (selectedTreeOptions?.some(item => item.value === option.value)) {
        selectedTreeOptions && setSelectedOptions(selectedTreeOptions.filter(item => item.value !== option.value));
      } else {
        const oldSelectedOptions = selectedTreeOptions || [];
        setSelectedOptions([...oldSelectedOptions, option]);
      }
    }
  };

  const onCustomTreeClick = (option: ITreeOption) => {
    onCustomTreeOptionClick && onCustomTreeOptionClick(option);
    setShowOptions(false);
  };

  const onCheckboxChanges = (value: string, checkboxState: boolean) => {
    const copy = { ...checkedTreeObj, [value]: checkboxState };
    setCheckedTreeObj(copy);
    props.onCheckboxChanges && props.onCheckboxChanges(copy);
  };

  const getSelectWidth = () => (ref.current && ref.current.getBoundingClientRect().width) || 'auto';

  const setMaxHeight = () => (ref.current && ref.current.getBoundingClientRect().bottom) || 0;

  const onSelectedTreeOptionDelete = (value: string) => {
    if (!setSelectedOptions || !selectedTreeOptions) return;
    setSelectedOptions(selectedTreeOptions.filter(item => item.value !== value));
  };

  return (
    <div ref={withoutRef ? null : ref} {...attributes}>
      <div
        className={classNames(
          'select__cur-option px-16 pos_relative',
          { 'select__cur-option--active': showOptions },
          { 'd-inline-block': !staticWidth },
          { 'select__cur-option--error': errorMessage },
        )}
        onClick={() => setShowOptions(!showOptions)}
      >
        <div className="d-flex justify-content-between align-items-center select__cur-option__content pos_relative">
          <div className="d-flex align-items-center flex-grow-1 text-overflow mr-8">
            {selectedTreeOption?.icon && <span className="mr-16"> {selectedTreeOption.icon} </span>}
            <Typography
              className="cur-option__title text-overflow"
              color="black"
              variant={titleVariant || 'text'}
            >
              {(selectedTreeOption && selectedTreeOption.name) ||
              (selectedTreeOptions && selectedTreeOptions.length > 0 && selectedTreeOptions.map(item => item.name).join(', '))
              || placeholder || ''}
            </Typography>
          </div>
          <FilterArrow
            className={classNames(staticWidth ? 'ml-auto' : '', 'cur-option__arrow pos_absolute')}
            direction={showOptions ? 'up' : 'down'}
          />
        </div>
      </div>
      {errorMessage && (
        <Typography
          className="color_red text-left mt-8"
          variant="xsmall"
        >
          {errorMessage}
        </Typography>
      )}
      <div
        className={classNames(
          'select__options', 'py-14 mt-8 px-16',
          { 'd-block' : showOptions, pos_absolute: !isPositionFixed && !isPositionStatic, pos_fixed: isPositionFixed })}
        style={{ width: isPositionFixed ? getSelectWidth() : '100%', maxHeight: isPositionFixed ? `calc(100vh - ${setMaxHeight()}px` : '292px' }}
      >
        <div className="select__main-options">
          {customTree && (
            <div className={classNames(
              'options__item options__item--custom options__node options__node--custom d-flex align-items-center cursor-pointer',
              { 'options__node--disable': customTree.disabled },
            )}>
              <Typography
                variant="text"
                classNames={[
                  'options__item__name ml-8 fill_w',
                ]}
                onClick={!customTree.disabled ?
                  (onCustomTreeOptionClick ? () => onCustomTreeClick(customTree) :
                    () => onTreeItemClick(customTree)) : undefined}
              >
                {customTree.name}
              </Typography>
            </div>
          )}
          <TreeSelectOptions
            chooseLimit={chooseLimit}
            isMultiSelect={isMultiSelect}
            spacerCount={0}
            withCheckbox={withCheckbox}
            treeOptions={treeOptions}
            openedTreeObj={openedTreeObj}
            checkedTreeObj={checkedTreeObj}
            selectedTreeOption={selectedTreeOption}
            onTreeCollapseClick={onTreeCollapseClick}
            onTreeItemClick={onTreeItemClick}
            onCheckboxChanges={onCheckboxChanges}
            selectedTreeOptions={selectedTreeOptions}
          />
        </div>
        {loading && <Loader />}
      </div>
      {withChips && selectedTreeOptions && (
        <div className="mt-12 d-flex flex-wrap">
          {selectedTreeOptions.map(item => (
            <ItemChips
              id={item.value}
              title={item.name}
              className="mr-8 mt-4"
              onDeleteClick={onSelectedTreeOptionDelete}
            />
          ))}
        </div>
      )}
      {prompt && (
        <Typography
          variant="xsmall"
          color="grey_additional_1"
          className="mt-8"
        >
          {prompt}
        </Typography>
      )}
    </div>
  );
}

export default TreeSelect;
