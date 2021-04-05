export namespace ModalEmployeeRemovalManualTypes {
  export interface IProps {
    onDiscard?(): void;
    onRemoveEmployees?(employeeIds: number[]): void;
  }
}
