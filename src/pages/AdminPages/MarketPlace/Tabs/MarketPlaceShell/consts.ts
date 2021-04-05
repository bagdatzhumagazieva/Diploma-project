import { IOption } from 'src/components/molecules/Select/types';

export const MarketShellFilterOptions:IOption[] = [
  {
    value: 'all',
    name: 'Все',
  },
  {
    value: 'rating',
    name: 'По рейтингу',
  },
  {
    value: '+price',
    name: 'По возрастанию цены',
  },
  {
    value: '-price',
    name: 'По убыванию цены',
  },
];

export const MARKETPLACE_SHELL_TYPES = [
  {
    id: 0,
    name: 'Все',
    count: 32,
  },
  {
    id: 1,
    name: 'Диалоговый симулятор',
    count: 0,
  },
  {
    id: 2,
    name: 'Квест',
    count: 14,
  },
  {
    id: 3,
    name: 'Аркада',
    count: 18,
  },
];
