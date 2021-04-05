export namespace CardInformationBlockTypes {
  export interface IProps extends ICard{
    index: number;
    className?: string;
    disabled?: boolean;
    onDeleteClick?(id: number): void;
    onEditClick?(id: number, cardIndex: number): void;
  }
}

export interface ICard {
  id: number;
  name: string;
  imageThumbnailUrl: string;
  minutesToFinish?: number;
  content?: string;
  description?: string;
}
