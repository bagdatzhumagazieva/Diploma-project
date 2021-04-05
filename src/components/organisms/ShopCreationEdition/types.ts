import { ItemTypes } from 'src/store/item/types';

export namespace ShopCreationEditionTypes {
  export interface IProps {
    companyId: number;
    type: 'create' | 'edit';
    itemId?: number;
    item?: ItemTypes.IRenderProps;
    getItem?(companyId: any, courseId: number, callbacks?: any): void;
  }
}
