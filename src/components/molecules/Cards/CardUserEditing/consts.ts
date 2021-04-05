import { IUserEditing } from 'src/components/molecules/Cards/CardUserEditing/types';
import { Month } from 'src/components/molecules/DatePicker/enum';

export const USER_DATA_TYPES = {
  FIRST_NAME: 'firstName',
  SECOND_NAME: 'secondName',
  GENDER: 'gender',
  EMAIL: 'email',
  PHONE_NUMBER: 'phoneNumber',
};

export const DEFAULT_VALUES: IUserEditing = {
  firstName: '',
  secondName: '',
  date: {
    day: 13,
    month: Month.DECEMBER,
    year: 1997,
  },
  gender: null,
  email: '',
  phoneNumber: '',
  countryCode: '',
};

// todo change to global country codes maybe from some global API
export const getCountry = (code: string): string => {
  switch (code) {
    case 'KAZ': return 'Казахстан';
    case 'RUS': return 'Россия';
    case 'UZB': return 'Узбекистан';
    case 'KGZ': return 'Кыргызстан';
    default: return 'Казахстан';
  }
};

export const COUNTRIES = [
  {
    name: 'Казахстан',
    value: 'KAZ',
  },
  {
    name: 'Россия',
    value: 'RUS',
  },
  {
    name: 'Узбекистан',
    value: 'UZB',
  },
  {
    name: 'Кыргызстан',
    value: 'KGZ',
  },
];
