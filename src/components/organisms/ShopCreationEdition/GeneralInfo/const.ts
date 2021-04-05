import { GeneralInfoTypes } from 'src/components/organisms/ShopCreationEdition/GeneralInfo/types';
import { ItemCategoryTypes } from 'src/store/item/category/types';

export const GENERAL_DATA: GeneralInfoTypes.IData = {
  title: '',
  description: '',
  cost: 0,
  inStock: 0,
  images: [],
  tags: [],
  prizeCount: 0,
};

export const CONVERT_CATEGORIES_TO_OPTIONS = (itemCategories: ItemCategoryTypes.IRenderProps[]) =>
  (itemCategories.map(item => ({ name: item.name || '', value: `${item.id}` })));

export const DEFAULT_ERROR_MES: GeneralInfoTypes.IDataErrorMessages = {
  name: '',
  description: '',
  price: '',
  amount: '',
  images: '',
  category: '',
};
