export namespace EditorTypes {
  export interface IProps {
    data: string;
    onDataChange?(data: string): void;
  }

  export interface IDataUrl {
    url: string;
    blobUrl: string;
  }
}
