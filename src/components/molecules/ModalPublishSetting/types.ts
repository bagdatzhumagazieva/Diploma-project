export namespace ModalPublishTypes {
  export interface IProps {
    time?: string;
    date: Date;
    status?: string;
    setStatus?(e: string): void;
    setTime?(data: string): void;
    setDate(date: Object): void;
    onSaveClick?(): void;
    onCancelClick?(): void;
  }
}
