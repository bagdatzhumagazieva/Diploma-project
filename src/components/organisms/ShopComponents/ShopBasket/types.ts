import { ShopOrderTypes } from 'src/store/item/types';
import { EmploymentTypes } from 'src/store/employment/types'; 

export namespace ShopBasketTypes {
  export interface IProps {
    companyId: number;
    createdState?: ShopOrderTypes.IRenderProps[];
    createdStateError?: string;
    createShopOrder?(bodyParams: ShopOrderTypes.IBodyProps[], companyId: number, callback?: any): void;
    employment?: EmploymentTypes.IRenderProps;
    getEmploymentByCompanyId?(companyId: number, callback?: any): void;
  }

  export interface IBasket {
    category: string;
    title: string;
    description: string;
    basketCount: number;
    isChecked?: boolean;
    rewardAmount: number;
    imgSrc?: string;
  }
}
