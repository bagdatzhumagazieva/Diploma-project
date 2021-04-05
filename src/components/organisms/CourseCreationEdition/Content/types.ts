import { ModuleTypes } from 'src/store/module/types';
import { ICard } from 'src/components/molecules/CardInfomationBlock/types';

export namespace ContentTypes {
  export interface IProps {
    companyId: number;
    handleCardCreateClick?(moduleId: string): void;
    handleCardEditClick?(id: number, cardIndex: number, moduleId: string): void;
  }
}

export namespace ModuleAdditionEditionTypes {
  export interface IProps {
    onCancelClick?(): void;
    setModuleData?(type: 'create' | 'edit', data: ModuleTypes.IRenderProps): void;
    data: ModuleTypes.IRenderProps;
    type: 'create' | 'edit';
    index: number;
  }
}

export namespace CardModuleTypes {
  export interface IProps extends ModuleTypes.IRenderProps {
    companyId: number;
    index: number;
    className?: string;
    cards?: ICard[];
    disabled?: boolean;

    onEditClick?(): void;
    onDeleteClick?(id: string): void;
    handleCardCreateClick?(moduleId: string): void;
    handleCardEditClick?(id: number, cardIndex: number, moduleId: string): void;
  }
}

export interface IEditOrCreateModule {
  module: ModuleTypes.IRenderProps;
  type: 'create' | 'edit';
}
