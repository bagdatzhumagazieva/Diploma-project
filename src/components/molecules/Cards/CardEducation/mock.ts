import { CardEducationTypes } from 'src/components/molecules/Cards/CardEducation/types';

export const ExampleCardEducation: CardEducationTypes.IProps[] = [
  {
    id: 0,
    image: '',
    title: 'Новая игра “Собери все бонусы из гипермаркета Магнит и выиграй поездку в Турцию”',
    rating: 4.5,
    time: 35,
    link: '',
    players: 12343,
    type: 'game',
    tags: [
      { id: 1, name: 'Aloha dancer' },
      { id: 2, name: 'Eboy' },
      { id: 3, name: 'Ona ne tvoya' },
    ],
    progress: 0,
  },
  {
    id: 1,
    image: '',
    title: '“Fishing hunt” игра по составлению цветной палитры (графический дизайн)',
    rating: 4,
    time: 35,
    link: '',
    players: 100,
    type: 'game',
    progress: 0,
  },
  {
    id: 2,
    image: '',
    title: '“Fishing hunt” игра по составлению цветной палитры (графический дизайн)',
    rating: 4.5,
    time: 35,
    link: '',
    players: 12343,
    type: 'game',
    progress: 0,
  },
];
