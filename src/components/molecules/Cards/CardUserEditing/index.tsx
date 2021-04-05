import React, { createRef, useState } from 'react';
import { mapPropsToAttributes } from 'src/core/components';
import { Gender } from 'src/core/enum';

import Button from 'src/components/atoms/Button';
import Input from 'src/components/molecules/Input';
import Image from 'src/components/atoms/Image';
import RadioButton from 'src/components/atoms/RadioButton';
import Typography from 'src/components/atoms/Typography';
import DatePicker from 'src/components/molecules/DatePicker';
import Select from 'src/components/molecules/Select';

import { CardUserEditingTypes, IUserEditing } from 'src/components/molecules/Cards/CardUserEditing/types';
import { IDatePicker } from 'src/components/molecules/DatePicker/types';
import { IOption } from 'src/components/molecules/Select/types';
import { USER_DATA_TYPES, DEFAULT_VALUES, COUNTRIES, getCountry } from 'src/components/molecules/Cards/CardUserEditing/consts';
import 'src/components/molecules/Cards/CardUserEditing/index.scss';
import { parseTo2DigitFormat } from 'src/utils/format';
import { getMonthCode } from 'src/components/molecules/DatePicker/enum';
import { ProfileTypes } from 'src/store/profile/types';

function CardUserEditing(props: CardUserEditingTypes.IProps) {
  const {
    userInformation,
    onSaveClick,
  } = props;
  const attributes = mapPropsToAttributes<CardUserEditingTypes.IProps>(
    props, 'card-user-editing', 'p-24 d-flex justify-content-between');
  const defaultValues = userInformation || DEFAULT_VALUES;
  const [userData, setUserData] = useState<IUserEditing>({ ...defaultValues });
  const [avatarChange, setAvatarChange] = useState<boolean>(false);
  const [error, setError] = useState<CardUserEditingTypes.IError>();

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = /^[A-Za-z\u0400-\u04FF]+$/;
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
    if (val.test(value)) {
      setError({ ...error, [name]: '' });
    } else {
      setError({ ...error, [name]: 'Ввести можно только буквы!' });
    }
  };

  const fileInputRef = createRef<HTMLInputElement>();

  const onDateChange = (date: IDatePicker) => {
    setUserData({ ...userData, date });
  };

  const convertToUserUpdateData = (data: IUserEditing):ProfileTypes.IUpdateBodyProps => ({
    firstName: data.firstName,
    lastName: data.secondName,
    gender: data.gender || '',
    birthDate: `${data.date.year}-${parseTo2DigitFormat(getMonthCode(data.date.month))}-${parseTo2DigitFormat(data.date.day)}`,
    countryCode: userData.countryCode,
    avatar: data.avatar,
  });

  const onAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const target = event.target as HTMLInputElement;
    const file =  target.files && target.files[0];
    setAvatarChange(true);
    file && setUserData({ ...userData, changedAvatar: URL.createObjectURL(file), avatar: file });
  };

  const onCancelButtonClick = () => {
    setUserData({ ...defaultValues });
    setError(undefined);
    setAvatarChange(false);
  };

  const onClickSave = () => onSaveClick && onSaveClick(convertToUserUpdateData(userData));

  const handleSelectedCountry = (option: IOption) => {
    setUserData({ ...userData, countryCode: option.value });
  };

  return (
    <div {...attributes}>
      <div className="card-user-editing__form">
        <Input
          name={USER_DATA_TYPES.FIRST_NAME}
          type="text"
          placeholder="Ваше имя"
          label="Имя"
          classNames="mb-32"
          value={userData.firstName}
          onChange={onInputChange}
          errorMessage={error?.firstName}
        />
        <Input
          name={USER_DATA_TYPES.SECOND_NAME}
          type="text"
          placeholder="Ваша фамилия"
          label="Фамилия"
          classNames="mb-32"
          value={userData.secondName}
          onChange={onInputChange}
          errorMessage={error?.secondName}
        />
        <div className="form__date-picker d-block mb-32">
          <Typography variant="subtext" className="mb-4">Дата рождения</Typography>
          <DatePicker
            {...userData.date}
            classNames="d-flex justify-content-between"
            onChange={onDateChange}
          />
        </div>
        <div className="form__gender d-block mb-48">
          <Typography variant="subtext" className="mb-16">Ваш пол</Typography>
          <div className="d-flex">
            <RadioButton
              name="gender"
              setClicked={onInputChange}
              classNames="mr-48"
              label="Мужской"
              value={Gender.MALE}
              isChecked={Gender.MALE === userData.gender}
            />
            <RadioButton
              name="gender"
              setClicked={onInputChange}
              label="Женский"
              value={Gender.FEMALE}
              isChecked={Gender.FEMALE === userData.gender}
            />
          </div>
        </div>
        <Input
          disabled={userData.email.length > 0}
          name={USER_DATA_TYPES.EMAIL}
          type="text"
          placeholder="Ваш e-mail"
          label="E-mail"
          classNames="mb-32"
          value={userData.email}
          onChange={onInputChange}
        />
        <Input
          disabled={userData.phoneNumber.length > 0}
          name={USER_DATA_TYPES.PHONE_NUMBER}
          type="text"
          placeholder="Ваш телефон"
          label="Телефон"
          classNames="mb-32"
          value={userData.phoneNumber}
          onChange={onInputChange}
        />
        <Select
          staticWidth
          options={COUNTRIES}
          setSelectedOption={handleSelectedCountry}
          className="mb-32"
          label="Страна"
          selectedOption={{ name: getCountry(userData.countryCode), value: userData.countryCode }}
        />
        <div className="form__button-wrapper pos_relative">
          <Button
            disabled={!!error?.firstName || !!error?.secondName}
            onClick={onClickSave}
            variant="textmed"
            classNames="fill_w"
          >
            Сохранить
          </Button>
          <Button
            type="link"
            color="blacker"
            variant="textmed"
            classNames="form__button pos_absolute"
            onClick={onCancelButtonClick}
          >
            Отменить
          </Button>
        </div>
      </div>
      <div className="card-user-editing__additional d-flex flex-column align-items-center">
        {avatarChange ?
          <Image
            alt="user image"
            classNames="card-user-editing__image mb-8"
            src={userData.changedAvatar}
          />
          :
          <Image
            alt="user image"
            classNames="card-user-editing__image mb-8"
            src={userData.avatar}
          />
        }
        <Button
          type="link"
          variant="subtextunderlined"
          color="grey_additional_2"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          Редактировать
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="card-user-editing__image-input"
          onChange={onAvatarUpload}
        />
      </div>
    </div>
  );
}

export default CardUserEditing;
