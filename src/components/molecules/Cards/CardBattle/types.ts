import { BattleStatuses } from 'src/components/molecules/Cards/CardBattle/enum';

export namespace CardBattleTypes {
  export interface IProps extends IBattleTypes {
    className?: string;
  }
}

export namespace CardBattleChildTypes {
  export interface IProps extends IBattleTypes {
  }
}

export namespace CardBattleGroupTypes {
  export interface IProps {
    battles?: IBattleTypes[];
    className?: string;
  }
}

export interface IBattleTypes {
  status: BattleStatuses;
  date: string;
  name: string;
  /**
   * Link to the player's dashboard or profile who called to the battle or
   * or of the players was called
   */
  userLink: string;
  image?: string;
  /**
   * Elapsed time from the moment THIS player called ANOTHER player(outgoing) or opposite,
   * ANOTHER player called THIS player(incoming), in hour, also battle can be active without response only 72 hours
   * (Maybe we will just calculate current date and time minus from origin date and time)
   */
  waitingTime?: number;
}
