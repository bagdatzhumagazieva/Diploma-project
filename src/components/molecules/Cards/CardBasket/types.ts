export namespace CardBasketTypes {
  export interface IProps {
    id: number;
    className?: string;
    category: string;
    title: string;
    description: string;
    basketCount: number;
    isChecked?: boolean;
    rewardAmount: number;
    imgSrc?: string;
    link?: string;
    amount?: number;

    onChangeBasket?(amount: number, id: number): void;
    onDeleteCard?(id: number): void;
    onSelectItem?(id: number, state: boolean): void;
  }
}
