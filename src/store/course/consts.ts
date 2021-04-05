import { CourseDetailTypes, CourseTypes, ProgressStatus, Status } from 'src/store/course/types';

export const DEFAULT_MODULE_SHORT_DATA = {
  isFinished: false,
  testStatus: ProgressStatus.NOT_STARTED,
  name: '',
};

export const DEFAULT_CARD_LIST_WITH_MODULE_DATA: CourseDetailTypes.ICardListWithModuleData = {
  cardList: [],
  module: { ...DEFAULT_MODULE_SHORT_DATA },
};

// must be identical with keys in table header
export const getCoursesSortType = (orderType: string, isDesc: boolean = false) => {
  if (orderType === 'name') return { sort_by_name: true, desc: isDesc };
  if (orderType === 'rewardAmount') return { sort_by_reward: true, desc: isDesc };
  if (orderType === 'groups') return { sort_by_groups: true, desc: isDesc };
  if (orderType === 'createdAt') return { sort_by_creation_date: true, desc: isDesc };
  if (orderType === 'status') return { sort_by_status: true, desc: isDesc };
  return {};
};

export const convertCourseToUnderscore = (bodyParams: CourseTypes.IRenderProps) => ({
  status: bodyParams.status || Status.DRAFT,
  name: bodyParams.name,
  description: bodyParams.description,
  company_id: bodyParams.companyId,
  group_ids: bodyParams.groupIds,
  reward_amount: bodyParams.rewardAmount,
  image_url: bodyParams.imageUrl,
  image_thumbnail_url: bodyParams.imageThumbnailUrl,
  certificate_expiration_date: bodyParams.certificateExpirationDate,
  certificate_image_url: bodyParams.certificateImageUrl,
  certificate_image_thumbnail_url: bodyParams.certificateImageThumbnailUrl,
  tag_ids: bodyParams.tagIds,
  is_active: bodyParams.isActive || true,
});

export const getModuleStatus = (isCardsFinished: boolean[], status?: string) => {
  // is status of test complete doesn't exist and all cards is finish the STATE OF THE MODULE - CURRENT
  if ((!status && isCardsFinished.every(item => item)) || status === 'pending') return ProgressStatus.IN_PROGRESS;
  if (status === 'fail') return ProgressStatus.FAIL;
  if (status === 'success') return ProgressStatus.SUCCESS;
  return ProgressStatus.NOT_STARTED;
};
