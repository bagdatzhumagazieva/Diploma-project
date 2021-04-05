import { CategoryTypes } from 'src/store/category/types';
import { IRubric } from 'src/components/molecules/RubricTree/types';

export const parseCategoriesToRubric = (categories: CategoryTypes.ICategoryRenderProps[]): IRubric[] => (
  categories.map(n => ({
    id: `${n.id}`,
    title: n.name,
    amount: 21,
    subRubrics: parseCategoriesToRubric(n.subCategories),
  }))
);
