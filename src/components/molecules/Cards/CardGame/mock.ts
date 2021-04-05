import { CardGameTypes } from 'src/components/molecules/Cards/CardGame/types';

const passedLevels = [
  {
    levelNum: 1,
    title: 'Toxic Snake Cave ',
    link: '',
  },
  {
    levelNum: 2,
    title: 'Wild Cats on the Island ',
    link: '',
  },
  {
    levelNum: 3,
    title: 'Toxic Snake Cave ',
    link: '',
  },
  {
    levelNum: 4,
    title: 'Wild Cats on the Island ',
    link: '',
  },
  {
    levelNum: 5,
    title: 'Wild Cats on the Island ',
    link: '',
  },
];
const leaders = [
  {
    rank: 'Профи',
    userName: 'alohadance',
    userImage: '',
    coins: 12434,
  },
  {
    rank: 'Новичок',
    userName: 'notalohadance',
    userImage:  '',
    coins: 11212,
  },
  {
    rank: 'Продолжающий',
    userName: 'dancealoha',
    userImage:  '',
    coins: 111111,
  },
];

export const ExampleCardGames: CardGameTypes.IProps[] = [
  {
    id: 1,
    templateId: 0,
    name: 'Why pasta comes in all shapes and sizes Why pasta comes in all shapes and sizes Why pasta comes in all shapes and sizes',
    cntLevels: 5,
    template: '',
    cntPassedLevels: 5,
    numberOfViews: 23434,
    rating: 3.4,
    minutesToFinish: 5,
    createdAt: '',
    link: '',
    imageUrl: '',
    isFavorite: false,
    types: ['HR', 'Менеджмент', 'Финансовая грамотность'],
    passedLevels: [...passedLevels],
    description: '“I think one of the reasons these stories are so popular — and they’ve been very popular since long before whatever true crime boom we’re currently in “I think one of the reasons these stories are so popular — and they’ve been very popular since... “I think one of the reasons these stories are so popular — and they’ve been very popular since long before whatever true crime boom we’re currently in “I think one of the reasons these stories are so popular — and they’ve been very popular since... “I think one of the reasons these stories are so popular — and they’ve been very popular since long before whatever true crime boom we’re currently in “I think one of the reasons these stories are so popular — and they’ve been very popular since and they’ve been very popular since and they’ve been very popular since',
    rewardAmount: 2334,
    leaders: [...leaders],
  },
];
