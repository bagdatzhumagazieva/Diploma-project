import React from 'react';
import classNames from 'classnames';
import Image from 'src/components/atoms/Image';

import { CardBattleTypes } from 'src/components/molecules/Cards/CardBattle/types';
import { BattleStatuses } from 'src/components/molecules/Cards/CardBattle/enum';
import 'src/components/molecules/Cards/CardBattle/index.scss';
import SuccessOrLoss from 'src/components/molecules/Cards/CardBattle/SuccessOrLoss.index';
import OutgoingOrIncoming from 'src/components/molecules/Cards/CardBattle/OutgoingOrIncoming.index';

function CardBattle(props: CardBattleTypes.IProps) {
  const { image, className, status } = props;

  const getContentByStatus = () => {
    if (status === BattleStatuses.SUCCESS || status === BattleStatuses.LOSS) {
      return <SuccessOrLoss {...props} />;
    }
    return <OutgoingOrIncoming {...props} /> ;
  };

  return (
    <div className={classNames('card-battle', className)}>
      <div className="card-battle__content d-flex justify-content">
        <Image alt="avatar icon" src={image} className="card-battle__image mr-16" />
        <div className="d-flex flex-column fill_w">
          {getContentByStatus()}
        </div>
      </div>
    </div>
  );
}

export default CardBattle;
