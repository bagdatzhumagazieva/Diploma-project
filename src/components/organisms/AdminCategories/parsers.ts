import { CategoryTypes } from 'src/store/category/types';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { getDepth } from 'src/components/organisms/AdminCategories/consts';

export const parseCategoriesToTreeSelect = (raw: CategoryTypes.ICategoryRenderProps): ITreeOption => ({
  level: raw.level,
  disabled: raw.level === 4,
  name: raw.name,
  value: `${raw.id}`,
  children: raw.subCategories ? raw.subCategories.map(n => parseCategoriesToTreeSelect(n)) : undefined,
});

export const parseCategoriesToTreeSelectWithDisable = (
  raw: CategoryTypes.ICategoryRenderProps, disabled: boolean, editedCategory?: CategoryTypes.ICategoryRenderProps,
): ITreeOption => {
  // child categories disabled
  const isDisabled = disabled || (editedCategory && raw.id === editedCategory.id) || false;
  const depth = (editedCategory && getDepth(editedCategory)) || 0;
  return {
    level: raw.level,
    disabled: isDisabled || depth === 3 || raw.level === 3 || (raw.level === 2 && depth === 2),
    name: raw.name,
    value: `${raw.id}`,
    children: raw?.subCategories?.map(n => (parseCategoriesToTreeSelectWithDisable(n,  isDisabled, editedCategory))),
  };
};
