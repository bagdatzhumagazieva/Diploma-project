export const CREATE_GROUP_TABS = [
  {
    value: '0',
    title: 'Целевая',
  },
  {
    value: '1',
    title: 'Параметрическая',
  },
];

export const BRANCHES = [
  {
    value: '1',
    name: 'Филиал1',
  },
  {
    value: '2',
    name: 'Филиал2',
  },
  {
    value: '3',
    name: 'Филиал3',
    children: [
      {
        value: '4',
        name: 'Филиал3_1',
      },
      {
        value: '5',
        name: 'Филиал3_2',
      },
    ],
  },
];

export const DURATION_IN_SYSTEM = [
  {
    value: 'less_than_year',
    name: 'до 1 года',
  },
  {
    value: 'year',
    name: 'от 1 до 2 лет',
  },
  {
    value: 'two_year',
    name: 'от 2 до 3 лет',
  },
  {
    value: 'three_year',
    name: 'от 3 до 4 лет',
  },
  {
    value: 'four_year',
    name: 'от 4 до 5 лет',
  },
  {
    value: 'more_than_five_year',
    name: 'Более 5 лет',
  },
];

export const GROUPS = [
  {
    value: '1',
    name: 'Группа 1',
  },
  {
    value: '2',
    name: 'Группа 2',
  },
  {
    value: '3',
    name: 'Группа 3',
  },
  {
    value: '4',
    name: 'Группа 4',
    disabled: true,
  },
  {
    value: '5',
    name: 'Группа 5',
  },
];
