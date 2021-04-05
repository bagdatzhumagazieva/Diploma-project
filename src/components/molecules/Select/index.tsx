import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { mapPropsToAttributes } from 'src/core/components';
import { useOutsideClick } from 'src/hooks/useOutsideClick';

import ItemChips from 'src/components/atoms/ItemChips';
import Typography from 'src/components/atoms/Typography';
import FilterArrow from 'src/components/atoms/Svg/Table/filterArrow';
import Checkbox from 'src/components/molecules/Checkbox';

import { OPTIONS_MAX_HEIGHT } from 'src/components/molecules/Select/consts';
import { SelectTypes, IOption } from 'src/components/molecules/Select/types';
import 'src/components/molecules/Select/index.scss';

function Select(props: SelectTypes.IProps) {
  const {
    options: propsOptions,
    selectedOption,
    name,
    staticWidth,
    id,
    errorMessage,
    icon,
    withCheckbox,
    placeholder: propsPlaceholder = '',
    onCheckboxChanges,
    customTitle,
    customOption: propsCustomOption,
    onCustomOptionClick,
    label,
    prompt,
    curVariant,
    disabled,
    isPositionFixed,
    width,
    withChips,
    optionsMaxHeight,
    direction: propsDirection = 'down',
    isStaticDirection,
  } = props;
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>(propsPlaceholder);
  const [options, setOptions] = useState<IOption[]>(propsOptions);
  const [direction, setDirection] = useState<'top' | 'down'>(propsDirection);
  const [customOption, setCustomOption] = useState<IOption | undefined>(propsCustomOption);
  const attributes = mapPropsToAttributes<SelectTypes.IProps>(
    props, 'select', 'pos_relative');
  const ref = useRef<HTMLDivElement>(null);
  const curOptionRef = useRef<HTMLDivElement>(null);

  const onSelectToggle = (item: IOption) => (e: React.MouseEvent<HTMLLabelElement>) => {
    if (!withCheckbox) {
      if (name) props.setSelectedOption && props.setSelectedOption(item, name);
      else props.setSelectedOption && props.setSelectedOption(item);
      setShowOptions(false);
    }
  };

  const onCurOptionClick = () => {
    if (!isStaticDirection && window.screen.height - (ref?.current?.getBoundingClientRect().bottom || 0) < 300) {
      setDirection('top');
    }
    setShowOptions(!showOptions);
  };

  const onCustomCheckboxClicked = (option: IOption) => (clickedState: boolean) => {
    const newOption = { ...option, checkboxChecked: clickedState };
    onCustomOptionClick && onCustomOptionClick(newOption);
  };

  const onCheckboxClicked = (index: number) => (clickedState: boolean) => {
    const newOptions: IOption[] = [...options];
    newOptions[index] = { ...newOptions[index], checkboxChecked: clickedState };
    setOptions(newOptions);
    onCheckboxChanges && onCheckboxChanges(newOptions);
  };

  const handleCustomOptionClick = (option: IOption) => {
    onCustomOptionClick && onCustomOptionClick(option);
    setShowOptions(false);
  };

  const getSelectWidth = () => {
    return ref.current ? ref.current.getBoundingClientRect().width : 'auto';
  };

  const getSelectPosition = () => {
    return ref.current ? direction === 'top' ?
      ref.current.getBoundingClientRect().top : ref.current.getBoundingClientRect().bottom : 0;
  };

  useOutsideClick(ref, () => {
    if (showOptions) setShowOptions(false);
  });

  useEffect(() => setPlaceholder(propsPlaceholder), [propsPlaceholder]);

  useEffect(() => propsOptions && setOptions(propsOptions), [propsOptions]);

  useEffect(() => propsCustomOption && setCustomOption(propsCustomOption), [propsCustomOption]);

  const generateOption = (option: IOption, index: number, className?: string) => {
    return (
      <label
        htmlFor={id ? option.value + id : option.value}
        key={id ? option.value + id : option.value}
        className={classNames(
          'options__item d-flex align-items-center px-16 py-8',
          {
            'options__item--active':
              !withCheckbox && selectedOption && selectedOption.value === option.value,
            'options__item--disabled': option.disabled,
          },
          className,
        )}
        onClick={
          !option.disabled && !withCheckbox
            ? index === -1 && onCustomOptionClick
            ? () => handleCustomOptionClick(option)
            : onSelectToggle(option)
            : undefined
        }
      >
        {option.icon && <div className="options__item__icon mr-16">{option.icon}</div>}
        {withCheckbox && (
          <Checkbox
            key={option.value}
            id={id ? option.value + id : option.value}
            disabled={option.disabled}
            isClicked={option.checkboxChecked}
            setClicked={
              !option.disabled && index > -1
                ? onCheckboxClicked(index)
                : onCustomCheckboxClicked(option)
            }
          />
        )}
        <Typography variant="text" className="item__title">
          {option.name}
        </Typography>
      </label>
    );
  };

  const getOptionsHaxHeight = () => {
    if (optionsMaxHeight) return optionsMaxHeight;
    const selectPosition = getSelectPosition();
    if (direction === 'down' && isPositionFixed) {
      return window.screen.width - selectPosition < 300 ?
        `calc(100vh - ${getSelectPosition() + 20}px` : OPTIONS_MAX_HEIGHT;
    }
    if (isPositionFixed) {
      return selectPosition < 300 ? (getSelectPosition() - 20) : OPTIONS_MAX_HEIGHT;
    }
    return OPTIONS_MAX_HEIGHT;
  };

  return (
    <div ref={!disabled ? ref : null} {...attributes} style={{ width }}>
      {label && (
        <>
          <Typography variant="subtext" className="mb-4">
            {label}
          </Typography>
          <br />
        </>
      )}
      <div
        className={classNames(
          'select__cur-option px-16 pos_relative',
          { 'select__cur-option--active': showOptions },
          { 'd-inline-block': !staticWidth },
          { 'select__cur-option--error': errorMessage },
          { 'select__cur-option--disabled': disabled },
        )}
        onClick={!disabled ? onCurOptionClick : undefined}
        ref={!disabled ? curOptionRef : null}
      >
        <div className="d-flex align-items-center select__cur-option__content">
          {icon ? (
            <div className="select__cur-option__icon mr-16">{icon}</div>
          ) : selectedOption && selectedOption.icon ? (
            <div className="select__cur-option__icon mr-16">{selectedOption.icon}</div>
          ) : (
            <></>
          )}
          <Typography
            color="black"
            variant={curVariant || 'text'}
            className={classNames('cur-option__title', staticWidth ? 'mr-0 pr-16' : 'mr-8')}
          >
            {(selectedOption && selectedOption.name) || customTitle ||
            (withCheckbox && options.filter(item => item.checkboxChecked).map(item => item.name).join(', '))
            || placeholder || ''}
          </Typography>
          <FilterArrow
            isPosAbsolute={staticWidth}
            direction={showOptions ? 'up' : 'down'}
            className={
              staticWidth ? 'select-arrow cur-option__select-arrow--static pos_absolute' : ''
            }
          />
        </div>
      </div>
      <div
        className={classNames('select__options', 'py-8 mt-8', {
          'd-block': showOptions,
          pos_absolute: !isPositionFixed && !withChips,
          pos_fixed: isPositionFixed,
        })}
        style={{
          ...(direction === 'top' ?
            { bottom: isPositionFixed ? getSelectPosition()  : (curOptionRef?.current?.offsetHeight || 0) + 8 } : {}),
          width: isPositionFixed ? getSelectWidth() : '100%',
          maxHeight: getOptionsHaxHeight(),
        }}
      >
        {customOption && generateOption(customOption, -1, 'options__item--custom')}
        <div className="select__main-options">
          {options.map((item, index) => generateOption(item, index))}
        </div>
      </div>
      {!disabled && errorMessage && (
        <Typography className="color_red text-left mt-8" variant="xsmall">
          {errorMessage}
        </Typography>
      )}
      {withChips && options.some(item => item.checkboxChecked) && (
        <div className="select__chips mt-12 d-flex flex-wrap">
          {options.filter(item => item.checkboxChecked).map(item => (
            <ItemChips
              key={item.value}
              id={item.value}
              title={item.name}
              className="mr-8 mt-4"
              onDeleteClick={() => onCheckboxClicked(options.findIndex(n => n === item))(false)}
            />
          ))}
        </div>
      )}
      {prompt && (
        <Typography className="mt-8" variant="xsmall" color="grey__additional_1">
          {prompt}
        </Typography>
      )}
    </div>
  );
}

export default Select;
