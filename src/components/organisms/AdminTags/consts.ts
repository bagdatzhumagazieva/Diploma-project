import { IRenderBody } from 'src/core/components/types';
import { NotificationType } from 'src/components/molecules/Notification/types';

export const DELETE_TAG_SUCCESS: IRenderBody = {
  responseType: NotificationType.Success,
  description: 'Тег был успешно удален',
};

export const DELETE_TAG_ERROR: IRenderBody = {
  responseType: NotificationType.Danger,
  description: 'Ошибка, тег не был удален повторите попытку',
};
