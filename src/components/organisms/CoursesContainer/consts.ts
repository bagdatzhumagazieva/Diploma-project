import { IOption } from 'src/components/molecules/Select/types';

export const COURSES_FILTER_OPTIONS: IOption[] = [
  {
    value: 'all',
    name: 'Все',
  },
  {
    value: 'isFavorite',
    name: 'Избранные',
  },
  {
    value: 'isFinished',
    name: 'Выполненные',
  },
  {
    value: 'inProcess',
    name: 'Текущие',
  },
  {
    value: 'isNew',
    name: 'Новые',
  },
];
