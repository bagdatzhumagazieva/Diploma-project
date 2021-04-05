import React from 'react';
import { ItemTypes } from 'src/store/item/types';
import { DEFAULT_ITEM_VALUE } from 'src/components/organisms/ShopCreationEdition/consts';
import { IOption } from 'src/components/molecules/Select/types';

const ShopContext = React.createContext({
  step: 0, setStep: (step: number) => {},
  itemData: DEFAULT_ITEM_VALUE, setItemData: (itemData: ItemTypes.IBodyProps) => {},
  itemCategoryOption: { name: '', value: '' }, setItemCategoryOption: (publication: IOption) => {},
  boughtAmount: 0, setBoughtAmount: (boughtAmount: number) => {},
},
);

export default ShopContext;
