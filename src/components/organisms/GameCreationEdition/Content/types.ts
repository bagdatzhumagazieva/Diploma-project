import { ICard } from 'src/components/molecules/CardInfomationBlock/types';

export namespace ContentTypes {
  export interface IProps {
    type: 'create' | 'edit';
    companyId: number;
  }

  export interface ICardAdditionData {
    trialIndex: number;
    levelIndex: number;
    card?: ICard;
  }
}
