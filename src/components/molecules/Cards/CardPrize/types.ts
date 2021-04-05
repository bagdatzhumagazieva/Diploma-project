export namespace CardPrizeTypes {
  export interface IProps {
    id: number;
    title: string;
    reward: number;
    basketCount?: number;
    amount?: number;
    imgSrc?: string;
    rating: number;
    className?: string;
    link?: string;
    onChangeBasket?(type: 'add' | 'drop', amount: number, id: number): void;
  }
}
