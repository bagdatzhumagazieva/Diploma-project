import { IBranch } from 'src/components/molecules/BranchesStructure/types';
import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { CategoryTypes } from 'src/store/category/types';

export const parseBranchesToTreeSelect = (raw: IBranch, disabledBranchId?: number, exceptionId?: number): ITreeOption => ({
  name: raw.name,
  value: `${raw.id}`,
  disabled: raw.id === disabledBranchId,
  children: raw.subBranches ? raw.subBranches.filter(e => e.id !== exceptionId)
    .map(n => (parseBranchesToTreeSelect(n, disabledBranchId))) : undefined,
});

export const parseCategoriesToTreeSelect = (raw: CategoryTypes.ICategoryRenderProps): ITreeOption => ({
  name: raw.name,
  value: `${raw.id}`,
  children: raw.subCategories ? raw.subCategories.map(n => (parseCategoriesToTreeSelect(n))) : undefined,
});
