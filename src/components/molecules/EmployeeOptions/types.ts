export namespace EmployeeOptionsTypes {
  export interface IProps {
    onUpdateActiveClick?(): void;
    onTransferBranchClick?(): void;
    onDeleteEmployeeClick?(): void;
    onGroupClick?(): void;
    onSendPasswordClick?(): void;
    isLast?: boolean;
  }
}
