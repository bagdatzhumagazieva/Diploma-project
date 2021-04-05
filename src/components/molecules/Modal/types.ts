export namespace ModalTypes {
  export interface IProps {
    onCloseClick?(): void;
    onSaveClick?(): void;
    onDeleteClick?(): void;
    title?: string;
    width?: number;
    closeColor?: string;
    children?: JSX.Element;
    cancelLabel?: string;
    saveLabel?: string;
    deleteLabel?: string;
    top?: number;
    right?: number;
    withCloseIcon?: boolean;
    isSaveButtonDisable?: boolean;
    withSaveBtnArrow?: boolean;
    titleVariant?: string;
  }
}
