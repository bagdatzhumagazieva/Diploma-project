import moment from 'moment';
import 'moment-duration-format';

export const numberToStringWithSpaces = (value: number, index?: number) =>
  value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ');

export const parseNumberToStringWithComma = (value: number, toFixed: number = 1): string =>
  Number.isInteger(value) ? `${value},0` : value.toFixed(toFixed).toString().replace('.', ',');

// formats example: 'mm:ss', 'hh:mm:ss' and etc
export const secondsToTimeFormat = (seconds: number) =>
  moment.duration(seconds, 'seconds').format('mm:ss', { trim: false });

// Removes spaces, hyphen and brackets from a string. For ex: +7 (777) 777-77-77 => +77777777777
export const formatPhoneNumber = (phone: string) => phone.replace(/[- )(]/g, '');

// produces URL query string from array and query
// For ex: ([13, 14], 'invitation_ids') => '?invitation_ids=13&invitation_ids=14'
export const getQueryStringFromArray = (arr: (number | string)[], query: string) => (
  arr.map((n, i) => `${i === 0 ? '?' : '&'}${query}=${n}`).join('')
);

// example '1' -> '01'
export const parseTo2DigitFormat = (num: number):string => `${num < 10 ? '0' : ''}${num}`;

export const getDate = (date: string) => {
  const d = moment(date).format('DD.MM.YYYY');
  if (moment(date).date() === moment().date()) {
    const duration = moment.duration(moment().diff(date));
    const hours = duration.asHours();

    return `${Math.floor(Math.abs(hours))} часов`;
  }
  return d;
};

export const getTime = (seconds: number) => {
  return `${seconds ? Math.floor(seconds / 60).toString().padStart(2, '0') : '00'} :
      ${seconds ? (Math.floor(seconds % 60)).toString().padStart(2, '0') : '00'}`;
};
