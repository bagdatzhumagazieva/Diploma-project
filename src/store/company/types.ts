export declare namespace CompaniesTypes {
  export interface IResponseProps {
    name: string;
    slug: string;
    description: string;
    is_active: string;
    is_public: string;
    created_at: string;
    updated_at: string;
    id: number;
    uuid: string;
    total_activity_percent: number;
    employee_number: number;
    address: string;
    max_users: number;
    subscription_name: string;
    subscription_end_date: string;
    mail?: string;
    notifications?: number;
    logo_url: string | null;
    logo_thumbnail_url: string | null;
  }

  export interface IRenderProps {
    name: string;
    id: number;
    uuid: string;
    activityPercent?: number;
    employeesCount: number;
    address: string;
    maxUsers: number;
    subscriptionName: string;
    subscriptionEndDate: string;
    slug: string;
    // Add this data when they appear on the back
    imageSrc?: string;
    notifications: number;
    logoUrl: string | null;
    logoThumbnailUrl: string | null;
  }
}

export declare namespace CompanyNews {
  export interface IResponseProps {
    achievement_id: number;
    achievement_uuid: string;
    achievement_image_url: string;
    achievement_image_thumbnail_url: string;
    user_id: number;
    achievement_name: string;
    entity_type: string;
    company_id: number;
    reward_amount: number;
    employee: {
      first_name: string | null;
      last_name: string | null;
      username: string | null;
      email: string | null;
      avatar_url: string | null;
      avatar_thumbnail_url: string | null;
    } | null;
    achievement_entity_id: number;
    finish_result_type: number;
  }

  export interface IRenderProps {
    achievementId: number;
    achievementUuid: string;
    achievementImageUrl: string;
    achievementImageThumbnailUrl: string;
    userId: number;
    achievementName: string;
    entityType: string;
    companyId: number;
    rewardAmount: number;
    employee: {
      firstName: string | null;
      lastName: string | null;
      username: string | null;
      email: string | null;
      avatarUrl: string | null;
      avatarThumbnailUrl: string | null;
    } | null;
    achievementEntityId: number;
    finishResultType: number;
  }
}

export const GET_COMPANIES = {
  started: 'GET_COMPANIES_START',
  success: 'GET_COMPANIES_SUCCESS',
  failed: 'GET_COMPANIES_FAILED',
};

export const GET_COMPANIES_BY_ID = {
  started: 'GET_COMPANIES_BY_ID_START',
  success: 'GET_COMPANIES_BY_ID_SUCCESS',
  failed: 'GET_COMPANIES_BY_ID_FAILED',
};

export const GET_COMPANY_EXCEL = {
  started: 'GET_COMPANY_EXCEL_START',
  success: 'GET_COMPANY_EXCEL_SUCCESS',
  failed: 'GET_COMPANY_EXCEL_FAILED',
};

export const GET_COMPANY_ADMINS = {
  started: 'GET_COMPANY_ADMINS_START',
  success: 'GET_COMPANY_ADMINS_SUCCESS',
  failed: 'GET_COMPANY_ADMINS_FAILED',
};

export const GET_COMPANY_NEWS = {
  started: 'GET_COMPANY_NEWS_START',
  success: 'GET_COMPANY_NEWS_SUCCESS',
  failed: 'GET_COMPANY_NEWS_FAILED',
};

export const SET_COMPANY_ID = 'SET_COMPANY_ID';
