import { ItemTypes } from 'src/store/item/types';

export const ShopSteps = ['Доступность', 'Общая информация'];

export const DEFAULT_ITEM_VALUE: ItemTypes.IBodyProps = {
  name: '',
  description: '',
  price: null,
  amount: null,
  branchIds: null,
  groupIds: null,
  categoryId: null,
  images: [],
};
