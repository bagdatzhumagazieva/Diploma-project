export namespace ItemChipsTypes {
  export interface IProps {
    title: string;
    id: string;
    className?: string;
    onDeleteClick?(id: string): void;
  }
}
