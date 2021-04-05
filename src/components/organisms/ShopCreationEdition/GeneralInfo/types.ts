import { ButtonImageUploadTypes } from 'src/components/organisms/ButtonImageUpload/types';
import { ITag } from 'src/components/organisms/AdminTags/types';
import { RouteComponentProps } from 'react-router';
import { ItemCategoryTypes } from 'src/store/item/category/types';
import { ItemTypes } from 'src/store/item/types';

export namespace GeneralInfoTypes {
  export interface IProps extends RouteComponentProps {
    companyId: number | undefined;
    itemState?: any;
    createItem?: any;
    itemCategories?: ItemCategoryTypes.IRenderProps[];
    type?: string;

    createCategory?(name: string, companyId: number, callback?: any): void;
    getItemCategories?(params: ItemCategoryTypes.IQueryParams): void;
    updateItem?(bodyParams: ItemTypes.IBodyProps, itemId: number, callback?: any): void;
  }
  export interface IData {
    title: string;
    description: string;
    cost: number;
    inStock: number;
    images: ButtonImageUploadTypes.IImage[];
    tags: ITag[];
    prizeCount: number;
  }
  export interface IDataErrorMessages {
    name: string;
    description: string;
    price: string;
    amount: string;
    images: string;
    category: string;
  }
}
