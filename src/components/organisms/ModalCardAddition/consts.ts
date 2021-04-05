import React from 'react';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { CategoryTypes } from 'src/store/category/types';

export const CATEGORY_ALL_VARIANT: ITreeOption = { value: 'category#all#variant', name: 'Все' };

export const parseCategoriesToTreeSelect = (raw: CategoryTypes.ICategoryRenderProps, ref?: React.Ref<any>): ITreeOption => ({
  itemRef: ref,
  name: raw.name,
  value: `${raw.id}`,
  children: raw.subCategories ? raw.subCategories.map(n => (parseCategoriesToTreeSelect(n))) : undefined,
});
