import { IUserTaskType } from 'src/components/atoms/Cards/CardTask/types';

export const USER_TASK_STATUSES = {
  AWAITING: 'awaiting',
  CURRENT: 'current',
  COMPLETED: 'completed',
};

export const TASK_TYPES:IUserTaskType[] = [
  { type: 'LONGREAD', title: 'Лонгриды' },
  { type: 'COURSE', title: 'Курсы' },
  { type: 'QUIZ', title: 'Тест' },
  { type: 'DISCUSSION', title: 'Обсуждения' },
  { type: 'VIDEO', title: 'Видео' },
  { type: 'AUDIO', title: 'Аудио' },
  { type: 'POLL', title: 'Опросник' },
];

export const UserTaskStatuses = [
  { status: USER_TASK_STATUSES.AWAITING, title: 'В ожидании' },
  { status: USER_TASK_STATUSES.CURRENT, title: 'Текущие' },
  { status: USER_TASK_STATUSES.COMPLETED, title: 'Выполенные' },
];

export const VisibleTasksAmount = 4;
