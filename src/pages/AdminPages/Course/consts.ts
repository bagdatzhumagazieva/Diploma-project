import { Action } from 'src/pages/AdminPages/Course/CourseDetailPage/types';

export const getActionText = (mode: Action) => {
  if (mode === Action.DELETE) return ' удалить ';
  if (mode === Action.PUBLISH) return ' опубликовать ';
  return ' перенести в черновик ';
};

export const getSaveButtonLabel = (mode: Action) => {
  if (mode === Action.DELETE) return undefined;
  if (mode === Action.PUBLISH) return 'Опубликовать';
  return 'В черновик';
};
