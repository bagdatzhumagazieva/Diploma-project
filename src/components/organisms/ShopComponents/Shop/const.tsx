import { IOption } from 'src/components/molecules/Select/types';

export const PrizeSort: IOption[] = [
  {
    value: 'all',
    name: 'Все',
  },
  {
    value: 'rating',
    name: 'По рейтингу',
  },
  {
    value: 'price',
    name: 'По возрастанию цены',
  },
  {
    value: '-price',
    name: 'По убыванию цены',
  },
];
