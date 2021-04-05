import { IOption } from 'src/components/molecules/Select/types';

export const CardSortOptions: IOption[] = [
  {
    value: 'all',
    name: 'Все',
  },
  {
    value: 'favourite',
    name: 'Избранные',
  },
  {
    value: 'nameAsc',
    name: 'По алфавиту, А - Я',
  },
  {
    value: 'nameDesc',
    name: 'По алфавиту, Я - А',
  },
];

export const CardSortParams = {
  nameAsc: { sortBy: 'name.raw' },
  nameDesc: { sortBy: 'name.raw', desc: true },
  all: {},
  favourite: { isFavourite: true },
};
