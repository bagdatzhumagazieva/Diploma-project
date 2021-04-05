import { CourseTypes, Status } from 'src/store/course/types';
import { NotificationType, NotificationTypes } from 'src/components/molecules/Notification/types';
import { CardTypes } from 'src/store/card/types';
import { ICard } from 'src/components/molecules/CardInfomationBlock/types';

export const CREATION_STEPS = ['Общая информация', 'Вознаграждения', 'Контент', 'Предпросмотр'];

export const DEFAULT_COURSE_DATA: CourseTypes.IRenderProps = {
  name: null,
  id: null,
  description: null,
  companyId: null,
  groupIds: null,
  rewardAmount: null,
  imageUrl: null,
  imageThumbnailUrl: null,
  certificateExpirationDate: null,
  certificateImageUrl: null,
  certificateImageThumbnailUrl: null,
  tagIds: null,
  status: Status.DRAFT,
  isActive: true,
  uuid: null,
};

export const DEFAULT_NOTIFICATION_DATA: NotificationTypes.IProps = {
  size: 'small',
  type: NotificationType.Success,
  description: '',
  withIcon: true,
  duration: 5000,
  width: '600px',
};

export const isCourseUpdated = (prevCourse: CourseTypes.IRenderProps, newCourse: CourseTypes.IRenderProps) => {
  for (const key in prevCourse) {
    if (prevCourse.hasOwnProperty(key) &&
      newCourse.hasOwnProperty(key) && (prevCourse[key] !== newCourse[key])) return true;
  }
  return false;
};

export const parseToICards = (cards: CardTypes.IResponseProps[]): ICard[] =>
  cards.map(item => ({
    id: item.id,
    name: item.name,
    imageThumbnailUrl: item.image_thumbnail_url || '',
  }));
