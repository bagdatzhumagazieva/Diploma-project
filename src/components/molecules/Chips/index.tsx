import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { generateId } from 'src/utils/generation';
import { EMAIL_VALIDATION } from 'src/core/validataion';

import Button from 'src/components/atoms/Button';
import CancelIcon from 'src/components/atoms/Svg/Icons/cancel';
import Typography from 'src/components/atoms/Typography';

import { InputChipsTypes, IEditedInput, IValue } from 'src/components/molecules/Chips/types';
import { EDITED_INPUT_RESET } from 'src/components/molecules/Chips/consts';
import 'src/components/molecules/Chips/index.scss';

function InputChips(props: InputChipsTypes.IProps) {
  const { type, mask = '', onInputsChange } = props;
  const isEmail = type === 'mail';
  const [value, setValue] = useState<string>(isEmail ? '' : '+');
  const [values, setValues] = useState<IValue[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [editedInput, setEditedInput] = useState<IEditedInput>(EDITED_INPUT_RESET);
  const numberLength = mask.length - 1;
  const re = new RegExp(`^[+][0-9]{1,${numberLength}}$`);
  const defaultErrorMes = `В списке есть неправильно введеный или уже введенный ${isEmail ? 'Email' : 'Телефон'}`;
  const inputId = `${isEmail ? 'mail' : 'phone'}-chip`;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (isEmail) setValue(value);
    if ((!isEmail && value === '+') || re.test(value)) setValue(value);
  };

  // After Handle Change
  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!value) setValue(value);
    else if (event.keyCode === 13) isEmail ? emailValidation(value) : telValidation(value);
  };

  const isValueExists = (value: string, id?: string):boolean =>
    !!values.find((item:IValue) => item.value === value && id !== item.id);

  const telValidation = (value: string) => {
    const newValues = [...values];
    const valid = value.length === mask.length && !isValueExists(value);
    setValues([...newValues, { valid, value, id: generateId() }]);
    setValue('+');
  };

  const emailValidation = (email: string) => {
    const newValues = [...values];
    const valid = EMAIL_VALIDATION.test(email) && !isValueExists(email);
    setValues([...newValues, { valid, id: generateId(), value: email }]);
    setValue('');
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => (id: string) => {
    event.stopPropagation();
    event.preventDefault();
    setValues(values.filter(item => item.id !== id));
  };

  const onChipsContentClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    const element = document.getElementById(inputId) as HTMLInputElement;
    if (element) {
      element.focus();
      element.setSelectionRange(element.value.length, element.value.length);
    }
  };

  const isValueValid = (value: string , id?: string) => {
    if (isEmail) return EMAIL_VALIDATION.test(value) && !isValueExists(value, id);
    return value[0] === '+' && value.length === mask.length && !isValueExists(value, id);
  };

  const onEditedInputBlur = (id: string, value: string) => {
    const valid = isValueValid(value, id);
    const newValues = [...values].map(item => id !== item.id ? item : { id, value, valid });
    setValues(newValues);
    setEditedInput(EDITED_INPUT_RESET);
  };

  const isValuesValid = (values: IValue[]):boolean => !values.find(item => !item.valid);

  const onPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const pasteData  = event.clipboardData.getData('text').trim().replace(/^,|,$/g , '').replace(/^;|;$/g , '');
    const splitter = isEmail ? /[\s,;]+/ : /[;+]+/;
    const arrayOfValues = pasteData.split(splitter).filter(item => item.length > 0);
    let newValues:IValue[] = [];
    for (let index = 0; index < arrayOfValues.length; index += 1) {
      const curValue = isEmail ? arrayOfValues[index] : `+${deleteCharacters(arrayOfValues[index])}`;
      const valid = isValueValid(curValue);
      newValues = [...newValues, { valid, id: generateId(), value: curValue }];
    }
    setValues([...values, ...newValues]);
  };

  const onValueClick = (event: React.MouseEvent<HTMLDivElement>) => (id: string, value: string) => {
    event.stopPropagation();
    setEditedInput({ id, value });
  };

  const deleteCharacters = (value: string) => value.replace(/[^0-9]/g, '');

  const onEditedInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (isEmail) setEditedInput({ ...editedInput, value });
    // Allow user in the edited input type more then mask length because of
    // when he copy paste data to allow him delete
    // if length is more than mask length
    if (!isEmail && /^[+]([0-9]+)?$/.test(value)) setEditedInput({ ...editedInput, value });
  };

  const handleEditedInputKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => (id: string, value: string) => {
    if (event.keyCode === 13) {
      const valid = isValueValid(value, id);
      const newValues = [...values].map(item => id !== item.id ? item : { id, value, valid });
      setValues(newValues);
      setEditedInput(EDITED_INPUT_RESET);
    }
  };

  useEffect(
    () => {
      if (!editedInput.id) return;
      const element = document.getElementById(editedInput.id) as HTMLInputElement;
      if (element) {
        element.focus();
        element.setSelectionRange(element.value.length, element.value.length);
      }
    },
    [editedInput.id],
  );

  useEffect(
    () => {
      if (isValuesValid(values)) setErrorMessage('');
      else setErrorMessage(defaultErrorMes);
      const newValues = values.filter(item => item.valid).map(item => item.value);
      const isValid = newValues.length === values.length;
      onInputsChange && onInputsChange([...newValues], isValid);
    },
    [values, errorMessage],
  );

  return (
    <div className={classNames('chips d-flex flex-column', { 'chips--error': errorMessage })}>
      <Typography variant="subtext">Список пользователей</Typography>
      <div
        className="chips__content d-flex flex-wrap align-items-center px-16 mt-4"
        onClick={onChipsContentClick}
      >
        {values.map(item => (
          editedInput.id !== item.id ? (
            <div
              key={item.id}
              className={classNames(
                'chips__value mr-8 d-flex align-items-center px-8',
                { 'chips__value--invalid' : !item.valid },
              )}
              onClick={e => onValueClick(e)(item.id, item.value)}
            >
              <Typography
                variant="xsmall"
                className="mr-8"
              >
                {item.value}
              </Typography>
              <Button
                type="link"
                className="d-flex"
                onClick={e => handleDelete(e)(item.id)}
              >
                <CancelIcon className="value__delete" color="#7A7B82" />
              </Button>
            </div>
          ) : (
            <div key={item.id}>
              <input
                id={editedInput.id}
                className="chips__input"
                value={editedInput.value}
                onChange={onEditedInputChange}
                size={editedInput.value.length + 2}
                onClick={e => e.stopPropagation()}
                onKeyUp={e => handleEditedInputKeyUp(e)(editedInput.id, editedInput.value)}
                onBlur={() => onEditedInputBlur(editedInput.id, editedInput.value)}
              />
            </div>
          )
        ))}
        <input
          id={inputId}
          value={value}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          onPaste={onPaste}
          className="chips__input"
          size={value.length + 5}
          autoComplete="off"
        />
      </div>
      <Typography
        variant="xsmall"
        color="red"
        className="chips__error-block  align-self-start mt-8"
      >
        {errorMessage}
      </Typography>
    </div>
  );
}

export default InputChips;
