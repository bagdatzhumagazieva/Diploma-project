import React from 'react';
import Typography from 'src/components/atoms/Typography';
import { ReactComponent as CoinIcon } from 'src/assets/img/icons/coin.svg';

function ModalBattleInstruction() {
  return (
    <div className="modal-battle-instruction d-flex flex-column px-32">
      <Typography variant="text" className="mb-32">
        Вызов имеет ограниченное время действия (72 часа).
        Если соперник не принял вызов, то приглашение автоматически исчезнет!
      </Typography>
      <div className="d-flex align-items-center mb-24">
        <span className="modal-battle-instruction__dot mr-12" />
        <Typography variant="text" className="mr-4">В случае вашей победы, вы получаете:</Typography>
        <Typography variant="subtext" color="main_50" className="mr-4">+ 100</Typography>
        <CoinIcon width={14} height={14} />
      </div>
      <div className="d-flex align-items-center mb-24">
        <span className="modal-battle-instruction__dot mr-12" />
        <Typography variant="text" className="mr-4">В случае поражения, вы теряете:</Typography>
        <Typography variant="subtext" color="main_50" className="mr-4">- 10</Typography>
        <CoinIcon width={14} height={14} />
      </div>
      <div className="d-flex align-items-center">
        <span className="modal-battle-instruction__dot mr-12" />
        <Typography variant="text" className="mr-4">Количество вопросов:</Typography>
        <Typography variant="subtext" color="main_50" className="mr-4">10</Typography>
      </div>
    </div>
  );
}

export default ModalBattleInstruction;
