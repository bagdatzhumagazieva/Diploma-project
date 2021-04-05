export namespace TaskOptionsType {
  export interface IProps {
    onDraft?(): void;
    onChangePublicationDate?(): void;
    onEdit?(): void;
    onDelete?(): void;
    onPublish?(): void;
    status?: string;
    position?: string;
  }

  export interface IOptions {
    name: string;
    callback(): void;
  }
}
