import { BattleResultsTypes } from 'src/components/molecules/BattleResults/types';

export interface BattleUserResultProps {
  name: string;
  position: string;
  count: number;
  avatar?: string;
  curPosition?: number;
  userResult: BattleResultsTypes.IResult[];
}
