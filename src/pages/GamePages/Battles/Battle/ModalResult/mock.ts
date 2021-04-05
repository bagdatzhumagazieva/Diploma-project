import BattleWin from 'src/assets/img/battle/battle-win.svg';
import BattleDefeat from 'src/assets/img/battle/battle-defeat.svg';
import BattlePass from 'src/assets/img/battle/battle-pass.svg';

export const BattleTypes = [
  {
    title: 'Поздравляем!',
    image: BattleWin,
    coins: '+100',
    description: 'Вы одержали победу в Баттле!',
    time: '00:56',
    grade: '75%',
  },
  {
    title: 'В следующий раз повезет!',
    image: BattleDefeat,
    coins: '-10',
    description: 'Вы проиграли Баттл!',
    time: '00:56',
    grade: '25%',
  },
  {
    title: 'Спасибо за участие!',
    image: BattlePass,
    description: 'Ждите участия вашего соперника!',
  },
];
