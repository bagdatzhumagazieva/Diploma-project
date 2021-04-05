import { IBattleTypes } from 'src/components/molecules/Cards/CardBattle/types';
import { BattleStatuses } from 'src/components/molecules/Cards/CardBattle/enum';

export const ExampleCardBattle: IBattleTypes[] = [
  {
    date: '31.06.2020',
    name: 'Сания Калмухаметкызы',
    image: '',
    userLink: '',
    status: BattleStatuses.SUCCESS,
  },
  {
    date: '31.06.2020',
    name: 'Сания Калмухаметкызы',
    image: '',
    userLink: '',
    status: BattleStatuses.OUTGOING,
    waitingTime: 62,
  },
  {
    date: '31.06.2020',
    name: 'Сания Калмухаметкызы',
    image: '',
    userLink: '',
    status: BattleStatuses.LOSS,
  },
  {
    date: '31.06.2020',
    name: 'Сания Калмухаметкызы',
    image: '',
    userLink: '',
    status: BattleStatuses.INCOMING,
    waitingTime: 23,
  },
];
