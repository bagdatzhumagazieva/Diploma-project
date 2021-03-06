import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { useTranslation, withTranslation } from 'react-i18next';
import moment, { Moment } from 'moment';
import { onKeyDown } from 'src/utils/helpers';

import profileActions from 'src/store/profile/actions';

import Button from 'src/components/atoms/Button';
import Input from 'src/components/molecules/Input';
import RadioButton from 'src/components/atoms/RadioButton';
import Typography from 'src/components/atoms/Typography';
import AuthWhiteLayout from 'src/components/molecules/AuthWhiteLayout';
import DatePicker from 'src/components/molecules/DatePicker';

import { RegistrationFormPageTypes } from 'src/pages/AuthPages/RegistrationForm/types';
import { DEFAULT_VALUES } from 'src/components/molecules/Cards/CardUserEditing/consts';
import 'src/pages/AuthPages/RegistrationForm/index.scss';
import { countriesCode } from 'src/components/molecules/CodeSelect/mock';
import CodeSelect from 'src/components/molecules/CodeSelect';
import { IDatePicker } from 'src/components/molecules/DatePicker/types';
import { getMonthCode } from 'src/components/molecules/DatePicker/enum';
import { parseTo2DigitFormat } from 'src/utils/format';

function RegistrationFormPage(props: RegistrationFormPageTypes.IProps) {
  const { onFinishRegistration, profile: asPropsProfile, profileError, getProfile, history } = props;
  const { t } = useTranslation('common');

  const [gender, setGender] = useState<string | null>(null);
  const [phone, setPhone] = useState<string>('');
  const [errorValidationMessage, setErrorValidationMessage] = useState<RegistrationFormPageTypes.IErrors>(
    {} as RegistrationFormPageTypes.IErrors,
  );
  const [errorMessage, setErrorMessage] = useState<string>();
  const [birthDate, setBirthDate] = useState<Moment>(moment('1997-12-13'));
  const [profile, setProfile] = useState<RegistrationFormPageTypes.IProfile>({} as RegistrationFormPageTypes.IProfile);

  useEffect(() => {
    getProfile && getProfile();
  },        []);

  useEffect(() => {
    if (asPropsProfile) {
      setProfile(prevState => ({
        ...prevState,
        name: asPropsProfile.name || '',
        surname: asPropsProfile.surName || '',
        email: asPropsProfile.email || '',
        phone: asPropsProfile.phone || '',
      }));
    }
  },        [asPropsProfile]);

  useEffect(() => {
    if (profileError) {
      setErrorMessage(profileError);
    }
  },
            [profileError]);

  const onChangeProfileData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrorValidationMessage({ ...errorValidationMessage, [name]: '' });
    setErrorMessage(undefined);
    setProfile({ ...profile, [name]: value });
  };

  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    setErrorMessage(undefined);
  };

  const radioButtonHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender(event.target.value);
    setErrorMessage(undefined);
    setErrorValidationMessage({ ...errorValidationMessage, gender: '' });
  };

  const onClickSave = () => {
    const { name, surname, checkPassword, password, email, username } = profile;
    const data = {
      phone,
      email,
      username,
      password,
      gender: gender ? +gender : 3,
      user_type: 3,
      middle_name: 'aa',
      first_name: name,
      last_name: surname,
      birth_date: birthDate.format('YYYY-MM-DD'),
    };
    setErrorValidationMessage({
      ...errorValidationMessage,
      name: !name ? t('mainField') : '',
      surname: !surname ? t('mainField') : '',
      password: !isValidPassword(password) ? t('passwordRequirement') : '',
      checkPassword: !checkPassword ? t('needToRepeatPassword') :
    password !== checkPassword ? t('passwordNotMatch') : '',
      gender: !gender ? t('chooseGender') : '',
      birthDate: !birthDate ? t('mainField') : '',
      email: !email ? t('mainField') : '',
      username: !username ? t('mainField') : '',
    });
    if (checkPassword && surname && isValidPassword(password) &&
      password === checkPassword && gender && birthDate && email && username) {
      onFinishRegistration && onFinishRegistration(data, {
        onSuccess: (res: any) => {
          if (!res.response.id) return;
          console.log(res);
          history.push('/');
        },
      });
    }
  };

  const onChangeBirthDate = (date: IDatePicker) => {
    const parseBirthDate = moment(`${date.year}-${parseTo2DigitFormat(getMonthCode(date.month))}-${parseTo2DigitFormat(date.day)}`);
    setErrorValidationMessage({ ...errorValidationMessage, birthDate: '' });
    setErrorMessage(undefined);
    setBirthDate(parseBirthDate);
  };

  const isValidPassword = (password?: string) => (
    (password && password.length >= 6) && /[a-zA-Z]/.test(password)
  );

  return (
    <div className="registration-form">
      <AuthWhiteLayout>
        <div className="registration-form__content d-flex flex-column">
          <Typography
            color="black"
            className="mb-16 text-center"
            variant="h1"
          >
            {t('fillData')}
          </Typography>
          <Typography
            color="grey_additional_2"
            className="mb-32 text-center"
            variant="subtext"
          >
            {t('dataIsNecessary')}
          </Typography>
          <div className="registration-form__form">
            <Input
              type="text"
              onChange={onChangeProfileData}
              name="username"
              placeholder={t('yourLogin')}
              label={t('login')}
              value={profile.username}
              errorMessage={errorValidationMessage.username}
              classNames="mb-28"
            />
            <Input
              type="text"
              onChange={onChangeProfileData}
              name="name"
              placeholder={t('yourName')}
              label={t('name')}
              value={profile.name}
              errorMessage={errorValidationMessage.name}
              classNames="mb-28"
            />
            <Input
              type="text"
              onChange={onChangeProfileData}
              name="surname"
              value={profile.surname}
              placeholder={t('yourLastname')}
              label={t('lastname')}
              errorMessage={errorValidationMessage.surname}
              classNames="mb-28"
            />
            <DatePicker
              {...DEFAULT_VALUES.date}
              onChange={onChangeBirthDate}
              errorMessage={errorValidationMessage.birthDate}
              classNames="d-flex justify-content-between mb-4"
            />
            <div className="form__gender d-flex flex-column mb-40 mt-24">
              <Typography className="mb-16" variant="subtext">?????? ??????</Typography>
              <div className="d-flex">
                <RadioButton
                  setClicked={radioButtonHandler}
                  classNames="mr-48"
                  label={t('male')}
                  name="gender"
                  value="1"
                  isChecked={'1' === gender}
                />
                <RadioButton
                  setClicked={radioButtonHandler}
                  label={t('female')}
                  name="gender"
                  value="2"
                  isChecked={'2' === gender}
                />
              </div>
              {errorValidationMessage.gender && (
                <Typography
                  className="color_red text-left mt-12"
                  variant="xsmall"
                >
                  {errorValidationMessage.gender}
                </Typography>
              )}
            </div>
            <Input
              type="text"
              onChange={onChangeProfileData}
              name="email"
              value={profile.email}
              placeholder="sample@mail.ru"
              label="E-mail"
              errorMessage={errorValidationMessage.email}
              classNames="mb-28"
            />
            <CodeSelect
              className="mb-28"
              label={t('phoneNumber')}
              onChange={onChangePhone}
              countries={countriesCode}
              errorMessage={errorValidationMessage.phone}
            />
            <Input
              onChange={onChangeProfileData}
              name="password"
              type="password"
              placeholder={t('writePassword')}
              label={t('createPassword')}
              classNames="mb-24"
              errorMessage={errorValidationMessage.password}
            />
            <Input
              onChange={onChangeProfileData}
              name="checkPassword"
              type="password"
              placeholder={t('writePassword')}
              label={t('repeatPassword')}
              classNames="mb-32"
              errorMessage={errorValidationMessage.checkPassword}
              onKeyDown={onKeyDown(onClickSave)}
            />
            {errorMessage && (
              <Typography
                className="color_red text-left mb-16"
                variant="xsmall"
              >
                {errorMessage}
              </Typography>
            )}
            <Button
              onClick={onClickSave}
              classNames="fill_w"
              variant="textmed"
              // loading={profileLoading}
            >
              {t('save')}
            </Button>
          </div>
        </div>
      </AuthWhiteLayout>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return ({
    profile: state.profileReducer.profile.data,
    profileLoading: state.profileReducer.profile.loading,
    profileError: state.profileReducer.profile.errorMessage,
  });
};

const mapDispatchToProps = {
  onFinishRegistration: profileActions.finishRegistration,
};

export default connect<any>(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('')(withRouter(RegistrationFormPage)));
