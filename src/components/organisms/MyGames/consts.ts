import { IOption } from 'src/components/molecules/Select/types';

export const StaticFilterOptions:IOption[] = [
  {
    value: 'all',
    name: 'Все',
  },
  {
    value: 'favorite',
    name: 'Избранные',
  },
  {
    value: 'completed',
    name: 'Выполненные',
  },
  {
    value: 'new',
    name: 'Новые',
  },
  {
    value: 'in_progress',
    name: 'Текущие'
  },
];
