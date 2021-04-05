import { CompaniesTypes, CompanyNews } from 'src/store/company/types';

export const parseCompaniesData = (raw: CompaniesTypes.IResponseProps): CompaniesTypes.IRenderProps => ({
  name: raw.name,
  id: raw.id,
  uuid: raw.uuid,
  activityPercent: raw.total_activity_percent || 0,
  employeesCount: raw.employee_number || 0,
  slug: raw.slug,
  notifications: raw.notifications || 0,
  address: raw.address,
  maxUsers: raw.max_users || 0,
  subscriptionName: raw.subscription_name,
  subscriptionEndDate: raw.subscription_end_date,
  logoUrl: raw.logo_url,
  logoThumbnailUrl: raw.logo_thumbnail_url,
});

export const parseCompanyNews = (e: CompanyNews.IResponseProps[]): CompanyNews.IRenderProps[] => (
  e?.map(data => ({
    achievementId: data.achievement_id,
    achievementUuid: data.achievement_uuid,
    achievementImageUrl: data.achievement_image_url,
    achievementImageThumbnailUrl: data.achievement_image_thumbnail_url,
    userId: data.user_id,
    achievementName: data.achievement_name,
    entityType: data.entity_type,
    companyId: data.company_id,
    rewardAmount: data.reward_amount,
    employee: {
      firstName: data.employee?.first_name || '',
      lastName: data.employee?.last_name || '',
      username: data.employee?.username || '',
      email: data.employee?.email || '',
      avatarUrl: data.employee?.avatar_url || '',
      avatarThumbnailUrl: data.employee?.avatar_thumbnail_url || '',
    },
    achievementEntityId: data.achievement_entity_id,
    finishResultType: data.finish_result_type,
  }))
);
