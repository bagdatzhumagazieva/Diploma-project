export namespace ModalResponseModuleTypes {
  export interface IProps {
    isModuleOpen?: boolean;
    isSuccess?: boolean;
    title?: string;
    moduleImage?: string;
    messageTitle?: string;
    statistics: MessageStatistics[];
  }
  export interface MessageStatistics {
    field: string;
    data: string;
  }
}
