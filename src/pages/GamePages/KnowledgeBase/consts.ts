import { IOption } from 'src/components/molecules/Select/types';

export const SORT_OPTIONS:IOption[] = [
  {
    value: 'all',
    name: 'Все',
  },
  {
    value: 'favorite',
    name: 'Избранные',
  },
  {
    value: 'ascend',
    name: 'По алфавиту, А-Я',
  },
  {
    value: 'descend',
    name: 'По алфавиту, Я-А',
  },
];

export const STATES = {
  INITIAL: 'initial',
  RUBRICS_SEARCH: 'rubrics-search',
  INPUT_SEARCH: 'input-search',
};
