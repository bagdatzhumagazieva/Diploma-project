import { ActivitiesTypes } from 'src/store/activities/types';
import { IUserTask } from 'src/components/atoms/Cards/CardTask/types';
import { USER_TASK_STATUSES } from 'src/components/atoms/Cards/CardTask/consts';

export const parseExercisesToTask = (raw: ActivitiesTypes.IRenderProps): IUserTask => ({
  status: raw.isFinished ? USER_TASK_STATUSES.COMPLETED : USER_TASK_STATUSES.AWAITING,
  imgSrc: raw.imageThumbnail,
  title: raw.name,
  type: raw.type,
  info: raw.description,
  progress: raw.progress ? raw.progress : raw.isFinished ? 100 : 0,
  lastActivity: raw.date,
  link: raw.type === 'COURSE' ? `/education/course/${raw.id}` : `/tasks-feed/${raw.id}`,
});
