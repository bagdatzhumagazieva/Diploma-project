import React, { useState, useRef, useEffect } from 'react';
import { mapPropsToAttributes } from 'src/core/components';
import { useOutsideClick } from 'src/hooks/useOutsideClick';
import { onKeyDown } from 'src/utils/helpers';

import Image from 'src/components/atoms/Image';
import Arrow from 'src/components/atoms/Svg/Icons/Arrow';
import Input from 'src/components/molecules/Input';
import Typography from 'src/components/atoms/Typography';

import { CodeSelectTypes, ICountryData } from 'src/components/molecules/CodeSelect/types';
import 'src/components/molecules/CodeSelect/index.scss';

function CodeSelect(props: CodeSelectTypes.IProps) {
  const {
    errorMessage: propsErrorMessage,
    disabled, countries, label, handleEnter,
  } = props;
  const [country, setCountry] = useState<ICountryData>(countries[0]);
  const [inputValue, setInputValue] = useState<string>('');
  // states
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [inputHover, setInputHover] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined | false>(propsErrorMessage || undefined);
  const showError = errorMessage && !showOptions && !inputFocus && !disabled;
  const onHover = inputHover && !showOptions && !inputFocus && !disabled;
  const attributes = mapPropsToAttributes<CodeSelectTypes.IProps>(
    props, 'code-select', 'pos_relative',
    { 'code-select--error' : showError || propsErrorMessage },
    { 'code-select--focus' : inputFocus },
    { 'code-select--disabled' : disabled },
    { 'code-select--options' : showOptions },
    { 'code-select--hover' : onHover },
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setErrorMessage(propsErrorMessage);
  },        [propsErrorMessage]);
  const onSelectCountry = (country: ICountryData) => {
    setInputValue('');
    setCountry(country);
    setShowOptions(!showOptions);
  };

  const onOptionBlockClick = () => !disabled && setShowOptions(!showOptions);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(undefined);
    setInputValue(event.target.value);
    props.onChange && props.onChange(event);
  };

  const handleFocus = (focus: boolean) => () => setInputFocus(focus);

  const handleHover = (hover:boolean) => () => setInputHover(hover);

  useOutsideClick(ref, () => {
    showOptions && setShowOptions(false);
    setErrorMessage(undefined);
  });

  return (
    <div
      {...attributes}
      onMouseEnter={handleHover(true)}
      onMouseLeave={handleHover(false)}
    >
      {label && (
        <Typography
          variant="subtext"
          className="input-field__label mb-4"
        >
          {label}
        </Typography>
      )}
      <div className="code-select__content d-flex">
        <div
          className="code-select__cur-option"
          onClick={onOptionBlockClick}
          ref={ref}
        >
          {/*<Image*/}
          {/*  alt="cur option img"*/}
          {/*  src={country.imgSrc}*/}
          {/*  className="cur-option__img"*/}
          {/*/>*/}
          <Arrow direction={showOptions ? 'up' : 'down'} />
          <div
            className="code-select__options pos_absolute fill_w"
          >
            {countries.map((item, index) => (
              <div
                key={item.id}
                onClick={() => onSelectCountry(item)}
                className="options__item"
              >
                <Image
                  alt="country logo"
                  src={item.imgSrc}
                  className="options__img"
                />
                <Typography className="mr-12" color="grey_additional_2" variant="xsmall">{item.title}</Typography>
                <Typography color="black" variant="xsmall">{item.staticNumber}</Typography>
              </div>
            ))}
          </div>
        </div>
        <div className="code-select__input-wrapper">
          <Input
            type="text"
            disabled={disabled}
            mask={country.mask}
            value={inputValue}
            classNames="code-select__input"
            placeholder={country.placeholder}
            onFocus={handleFocus(true)}
            onBlur={handleFocus(false)}
            onChange={onChange}
            onKeyDown={onKeyDown(handleEnter)}
          />
        </div>
      </div>
      {showError && (
        <div className="code-select__error mt-8 text-left">
          <Typography
            variant="xsmall"
            color="red"
          >
            {errorMessage}
          </Typography>
        </div>
      )}
    </div>
  );
}

export default CodeSelect;
