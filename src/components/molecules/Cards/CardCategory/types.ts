export namespace CardCategoryTypes {
  export interface IProps {
    title: string;
    totalCards: number;
    active: boolean;
    id: number;
    onClick?(): void;
    showArrow?: boolean;
    onChangeClick?(): void;
    onDeleteClick?(): void;
    lastItemRef?: any;
  }
}
