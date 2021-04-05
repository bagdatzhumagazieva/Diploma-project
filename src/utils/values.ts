import { IOption } from 'src/components/molecules/Select/types';
import { ROLES } from 'src/core/store/values';

export const getRole = (role: string): IOption => {
  switch (role) {
    case ROLES.EMPLOYEE: return { value: ROLES.EMPLOYEE, name: 'Пользователь' };
    case ROLES.CONTENT_REDACTOR: return { value: ROLES.CONTENT_REDACTOR, name: 'Контент редактор' };
    case ROLES.ADMIN: return { value: ROLES.ADMIN, name: 'Админ' };
    default: return { value: '', name: '' };
  }
};

export const getGender = (gender: string): string => {
  switch (gender) {
    case 'male': return 'Мужской';
    case 'female': return 'Женский';
    default: return 'Другой';
  }
};

export const getErrorMessage = (code: number): string => {
  switch (code) {
    case 1: return 'Ошибка веб-сайта';
    case 2: return 'Ошибка авторизации';
    case 3: return 'Не найдено';
    case 4: return 'Уже существует';
    case 5: return 'Неверный адрес электронной почты';
    case 6: return 'Неверный номер телефона';
    case 7: return 'Внутренняя ошибка сервера';
    case 8: return 'Доступ запрещен';
  }
  return 'Ошибка веб-сайта';
};

export const getMoreLengthWithDots = (maxLength: number, title: string) => {
  return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
};
