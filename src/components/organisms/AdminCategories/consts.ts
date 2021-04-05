import { ITreeOption } from 'src/components/molecules/TreeSelect/types';
import { CategoryTypes } from 'src/store/category/types';
import { Queue } from 'src/core/store/queue';

export const WITHOUT_RUBRIC_VAL = 'with-out-new-rubric';
export const WITHOUT_RUBRIC: ITreeOption = {
  name: 'Без рубрики',
  value: WITHOUT_RUBRIC_VAL,
  children: undefined,
};

export const ROOT_RUBRIC_VAL = 'root-level';
export const ROOT_RUBRIC: ITreeOption = {
  name: 'Начальные рубрики',
  value: ROOT_RUBRIC_VAL,
  level: 0,
};

export const getDepth = (category: CategoryTypes.ICategoryRenderProps) => {
  const queue = new Queue<CategoryTypes.ICategoryRenderProps>();
  queue.enqueue(category);
  let cnt = 0;
  while (queue.count !== 0) {
    const curCnt = queue.count;
    cnt += 1;
    for (let i = 0; i < curCnt; i += 1) {
      const curCategory = queue.dequeue();

      if (curCategory && curCategory.subCategories.length > 0) {
        for (let j = 0; j < curCategory.subCategories.length; j += 1) {
          queue.enqueue(curCategory.subCategories[j]);
        }
      }
    }
  }
  return cnt;
};
