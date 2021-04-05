import { TaskTypes } from 'src/store/task/types';
import { TASKS_TYPE } from './GeneralInformation/const';

export const TaskCreationSteps = ['Общая информация', 'Контент', 'Предпросмотр'];

export const DEFAULT_TASK_VALUE: TaskTypes.IBodyProps = {
  groupIds: null,
  name: null,
  cardIds: null,
  mainCardId: null,
  image: null,
  imageThumb: null,
  tagsIds: null,
  publishDate: null,
  status: 'DRAFT',
  type: TASKS_TYPE[0].value,
  rewardAmount: null,
  description: '',
  uuid: '',
  minutesToFinish: 0,
  mainCardDescription: '',
};
