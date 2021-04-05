import { CourseCountTypes, CourseDetailTypes, CourseTypes, ProgressStatus } from 'src/store/course/types';

export const parseCourseData = (raw: CourseTypes.IResponseProps): CourseTypes.IRenderProps => ({
  id: raw.id,
  name: raw.name,
  description: raw.description,
  companyId: raw.company_id,
  groupIds: raw.group_ids,
  rewardAmount: raw.reward_amount,
  imageUrl: raw.image_url,
  imageThumbnailUrl: raw.image_thumbnail_url,
  certificateExpirationDate: raw.certificate_expiration_date,
  certificateImageUrl: raw.certificate_image_url,
  certificateImageThumbnailUrl: raw.certificate_image_thumbnail_url,
  tagIds: raw.tag_ids,
  status: raw.status,
  isActive: raw.is_active,
  uuid: raw.uuid,
});

export const parseModuleData = (raw: CourseDetailTypes.IModuleResponse): CourseDetailTypes.IModuleRender => ({
  id: `${raw.entity_id}`,
  uuid: raw.entity_uuid,
  name: raw.name,
  description: raw.description,
  imageUrl: raw.image_url,
  imageThumbnailUrl: raw.image_thumbnail_url,
  companyId: raw.company_id,
  courseId: raw.course_id,
  cardIds: raw.card_ids,
  orderIndex: raw.order_index,
  cards: raw.cards ? raw.cards.map(item => parseCardsData(item)) : [],
  status: getModuleStatus(raw.is_finished, raw.is_current),
  testStatus: getTestStatus(raw.cards ? raw.cards.every(item => item.is_finished) : false, raw.status),
});

export const getModuleStatus = (isFinished: boolean = false, isCurrent: boolean = false) => {
  if (isFinished) return ProgressStatus.SUCCESS;
  if (isCurrent) return ProgressStatus.IN_PROGRESS;
  return ProgressStatus.NOT_STARTED;
};

export const parseDetailModuleData = (raw: CourseDetailTypes.IModuleResponse): CourseDetailTypes.IModuleDetailRender => ({
  id: `${raw.entity_id}`,
  uuid: raw.entity_uuid,
  name: raw.name,
  description: raw.description,
  imageUrl: raw.image_url,
  imageThumbnailUrl: raw.image_thumbnail_url,
  companyId: raw.company_id,
  courseId: raw.course_id,
  cardIds: raw.card_ids,
  orderIndex: raw.order_index,
  cards: raw.cards ? raw.cards.map(item => parseDetailCardData(item)) : [],
  status: getModuleStatus(raw.is_finished, raw.is_current),
  testStatus: getTestStatus(raw.cards ? raw.cards.every(item => item.is_finished) : false, raw.status),
});

const getTestStatus = (isAllCardsFinished: boolean, testStatus?: string) => {
  if ((isAllCardsFinished && !testStatus) || testStatus === 'pending') return ProgressStatus.IN_PROGRESS;
  if (testStatus === 'fail') return ProgressStatus.FAIL;
  if (testStatus === 'success') return ProgressStatus.SUCCESS;
  return ProgressStatus.NOT_STARTED;
};

const parseCardsData = (raw: CourseDetailTypes.ICardResponse): CourseDetailTypes.ICardRender => ({
  id: raw.entity_id,
  name: raw.name,
  isFinished: raw.is_finished,
  status: getCardStatus(raw.is_finished || false, raw.is_current || false),
});

export const parseDetailCardData = (raw: CourseDetailTypes.ICardResponse): CourseDetailTypes.ICardDetailRender => ({
  uuid: raw.entity_uuid || '',
  id: raw.entity_id,
  name: raw.name,
  isFinished: raw.is_finished,
  description: raw.description || '',
  imageUrl: raw.image_url || '',
  imageThumbnailUrl: raw.image_thumbnail_url || '',
  minutesToFinish: raw.minutes_to_finish || 0,
  content: raw.content || '',
  isFavorite: raw.is_favorite,
  status: getCardStatus(raw.is_finished || false, raw.is_current || false),
  createdAt: raw.created_at || '',
  rating: raw.rating || 0,
  isKnowledge: raw.is_knowledge || false,
  tags: Array.isArray(raw.tags) ? raw.tags.map(item => ({ id: item.tag_id, name: item.tag_name })) : [],
  isCurrent: raw.is_current || false,
});

export const getCardStatus = (isFinished: boolean, isCurrent: boolean) => {
  if (isFinished) return ProgressStatus.SUCCESS;
  if (isCurrent) return ProgressStatus.IN_PROGRESS;
  return ProgressStatus.NOT_STARTED;
};

// todo add course status 'published' or 'draft'
export const parseCourseAggregatorData = (raw: CourseDetailTypes.IResponseProps): CourseDetailTypes.IRenderProps => ({
  id: raw.entity_id,
  uuid: raw.entity_uuid,
  name: raw.name || '',
  description: raw.description || '',
  companyId: raw.company_id,
  groupIds: raw.group_ids || [],
  rewardAmount: raw.reward_amount || 0,
  imageUrl: raw.image_url || '',
  imageThumbnailUrl: raw.image_thumbnail_url || '',
  tags: raw.tags ? raw.tags.map(item => ({ id: item.tag_id, name: item.tag_name })) : [],
  status: raw.status,
  rating: raw.rating || 0,
  commentsAmount: raw.comments_amount || 0,
  minutesToFinish: raw.minutes_to_finish || 0,
  cardIds: raw.card_ids || [],
  isFavorite: raw.is_favorite || false,
  modules: raw.modules ? raw.modules.map(item => parseModuleData(item)) : [],
  progress: raw.progress || 0,
  isFinished: raw.is_finished || false,
  numberOfViews: raw.number_of_views || 0,
  curUrl: Array.isArray(raw.modules) && raw.modules.length > 0 ? getCurrentLessonOrTestUrl(raw.entity_id, raw.modules) : '#',
  createdAt: raw.created_at || '',
  examStatus: getExamStatus(raw.modules, raw.course_status),
  certificateExpirationDate: raw.certificate_expiration_date || 0,
  certificateImageUrl: raw.certificate_image_url || '',
  certificateImageThumbnailUrl: raw.certificate_image_thumbnail_url || '',
  tagIds: Array.isArray(raw.tag_ids) ? raw.tag_ids : [],
  groups: Array.isArray(raw.groups) ? raw.groups.map(item => parseGroupData(item)) : undefined,
  userRating: raw.user_rating,
  finalResultCertificateId: raw.final_result?.certificate_id,
});

const getExamStatus = (modules?: CourseDetailTypes.IModuleResponse[], status?: 'fail' | 'success') => {
  if (!Array.isArray(modules) || modules.length < 1) return ProgressStatus.NOT_STARTED;
  if (status === 'fail') return ProgressStatus.FAIL;
  if (status === 'success') return ProgressStatus.SUCCESS;
  if (modules.every(item => item.is_finished)) return ProgressStatus.IN_PROGRESS;
  return ProgressStatus.NOT_STARTED;
};

const getCurrentLessonOrTestUrl = (courseId: number, modules: CourseDetailTypes.IModuleResponse[]) => {
  if (modules.every(item => item.is_finished)) return `/education/course/${courseId}/exam`;
  const curModule = modules.find(item => item.is_current);
  // todo change to the exam or another, think about it
  if (!curModule) return '#';
  const curCard = curModule.cards?.find(item => item.is_current);

  // if cur card does not exist and all cards is finished
  if (!curCard && curModule.cards?.every(item => item.is_finished)) {
    return `/education/course/${courseId}/module/${curModule.entity_id}/test`;
  }

  // if cur card does not exist and all cards is not finished here is bug
  if (!curCard) return '#';

  return `/education/course/${courseId}/module/${curModule.entity_id}/card/${curCard.entity_id}`;
};

export const parseCourseStatisticsData = (raw: CourseTypes.IStatisticsResponse): CourseTypes.IStatisticsRender => ({
  groups: Array.isArray(raw.groups) ? raw.groups.map(item => ({
    id: item.group_id || -1,
    total: item.employees || 0,
    name: item.group_name || '',
  })) : [],
  users: {
    total: raw.users.total || 0,
    completed: raw.users.completed || 0,
    groups: Array.isArray(raw.users.groups) ? raw.users.groups.map(item => ({
      groupId: item.group_id || -1,
      total: item.total || 0,
      completed: item.completed || 0,
      name: item.group_name || '',
    })) : [],
  },
  average: Array.isArray(raw.average) ? raw.average.map(item => ({
    groupId: item.group_id || - 1,
    name: item.group_name || '',
    finalPercent: item.final_percent || 0,
    modules: Array.isArray(item.modules) ? item.modules.map(m => ({
      moduleId: m.module_id,
      percent: m.percent || 0,
    })) : [],
  })) : [],
});

const parseGroupData = (raw: CourseDetailTypes.IGroupResponse): CourseDetailTypes.IGroupRender => ({
  id: raw.entity_id,
  name: raw.name,
  type: raw.group_type,
});

export const parseCourseCount = (raw: CourseCountTypes.IResponseProps): CourseCountTypes.IRenderProps => ({
  totalNew: raw.total_new,
  totalMy: raw.total_my,
  totalFinished: raw.total_finished,
  totalCurrent: raw.total_current,
  totalFavorite: raw.total_favorite,
});
