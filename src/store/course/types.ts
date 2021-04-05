import { ITag } from 'src/components/organisms/AdminTags/types';

export declare namespace CourseTypes {
  export interface IResponseProps {
    id: number;
    name: string;
    description: string;
    company_id: number;
    group_ids: number[];
    reward_amount: number;
    image_url: string;
    image_thumbnail_url: string;
    certificate_expiration_date: number;
    certificate_image_url: string;
    certificate_image_thumbnail_url: string;
    tag_ids: number[];
    status: Status;
    is_active: boolean;
    uuid: string;
  }

  export interface IRenderProps {
    id?: number | null;
    name?: string | null;
    description?: string | null;
    companyId?: number | null;
    groupIds?: number[] | null;
    rewardAmount?: number | null;
    imageUrl?: string | null;
    imageThumbnailUrl?: string | null;
    certificateExpirationDate?: number | null;
    certificateImageUrl?: string | null;
    certificateImageThumbnailUrl?: string | null;
    tagIds?: number[] | null;
    tags?: ITag[];
    status?: Status | null;
    isActive?: boolean | null;
    uuid?: string | null;
  }

  export interface IBodyProps {
    id?: number;
    name: string | null;
    description: string | null;
    companyId: number | null;
    groupIds: number[] | null;
    rewardAmount: number | null;
    image?: string | null;
    imageThumb?: string | null;
    days: number | null;
    certificateImage?: string | null;
    certificateImageThumb?: string | null;
    tagsIds?: number[] | null;
    status: Status | null;
    isActive?: boolean | null;
  }

  export interface IStatisticsQuery {
    companyId: number;
    isGroupsImportant?: boolean;
    isUserImportant?: boolean;
    isAverageImportant?: boolean;
  }

  export interface IStatisticsResponse {
    groups: { group_id: number, employees: number, group_name?: string }[];
    users: {
      total: number,
      completed: number,
      groups: {
        group_id: number,
        total: number,
        completed: number,
        group_name: string,
      }[],
    };
    average: {
      group_id: number,
      final_percent: number,
      modules: { module_id: number, percent: number }[],
      group_name: string,
    }[];
  }

  export interface IStatisticsRender {
    groups: IGroupData[];
    users: IUserStatistics;
    average: IAverage[];
  }

  export interface IGroupData {
    id: number;
    // number of employees who passed this course
    name: string;
    total: number;
  }

  export interface IUserStatistics {
    total: number;
    completed: number;
    groups: {
      groupId: number,
      total: number,
      completed: number,
      name: string;
    }[];
  }

  export interface IAverage {
    groupId: number;
    name: string;
    finalPercent: number;
    modules: { moduleId: number, percent: number }[];
  }

}

export declare namespace CourseDetailTypes {
  export interface IResponseProps {
    entity_id: number;
    entity_uuid: string;
    name: string;
    description?: string;
    image_url?: string;
    image_thumbnail_url?: string;
    company_id: number;
    rating?: number;
    comments_amount?: number;
    group_ids?: number[];
    reward_amount?: number;
    minutes_to_finish?: number;
    card_ids?: number[];
    status: Status;
    // exam status(progress status)
    course_status?: 'fail' | 'success';
    is_favorite?: boolean;
    tags?: ITagResponse[];
    modules?: IModuleResponse[];
    progress?: number;
    is_finished?: boolean;
    number_of_views?: number;
    created_at?: string;
    certificate_expiration_date?: number;
    certificate_image_url?: string;
    certificate_image_thumbnail_url?: string;
    tag_ids?: number[];
    groups?: IGroupResponse[];
    user_rating?: number;
    final_result?: {
      certificate_id?: number;
    };
  }
  export interface IModuleResponse {
    entity_id: number;
    entity_uuid: string;
    name: string;
    description: string;
    image_url: string;
    image_thumbnail_url: string;
    company_id: number;
    course_id: number;
    card_ids: number[];
    order_index: number;
    cards?: ICardResponse[];
    is_current: boolean;
    is_finished: boolean;
    status?: string;
  }

  export interface ICardResponse {
    entity_id: number;
    entity_uuid: string;
    name: string;
    description: string;
    image_url: string;
    image_thumbnail_url: string;
    minutes_to_finish: number;
    content: string;
    question_content: string;
    tags: ITagResponse;
    is_knowledge: boolean;
    category: string;
    is_favorite: boolean;
    is_finished?: boolean;
    is_current?: boolean;
    created_at: string;
    rating: number;
  }

  export interface ITagResponse {
    tag_id: number;
    tag_name: string;
  }

  export interface IGroupResponse {
    entity_id: number;
    group_type: string;
    name: string;
  }

  export interface IRenderProps {
    id: number;
    name: string;
    description: string;
    uuid: string;
    companyId: number;
    groupIds: number[];
    imageUrl: string;
    imageThumbnailUrl: string;
    certificateExpirationDate: number;
    certificateImageUrl: string;
    certificateImageThumbnailUrl: string;
    tagIds: number[];
    status: Status;
    rating: number;
    commentsAmount: number;
    rewardAmount: number;
    minutesToFinish: number;
    cardIds: number[];
    isFavorite: boolean;
    tags: ITag[];
    modules: IModuleRender[];
    progress: number;
    isFinished: boolean;
    numberOfViews: number;
    curUrl: string;
    createdAt: string;
    examStatus: ProgressStatus;
    groups?: IGroupRender[];
    userRating?: number;
    finalResultCertificateId?: number;
  }

  export interface IModuleRender {
    id: string;
    uuid?: string;
    name: string;
    description?: string;
    imageUrl?: string;
    imageThumbnailUrl?: string;
    companyId?: number;
    courseId?: number;
    cardIds?: number[];
    orderIndex?: number;
    status?: ProgressStatus;
    testStatus?: ProgressStatus;
    cards: ICardRender[];
  }

  export interface IModuleDetailRender {
    id: string;
    uuid?: string;
    name: string;
    description?: string;
    imageUrl?: string;
    imageThumbnailUrl?: string;
    companyId?: number;
    courseId?: number;
    cardIds?: number[];
    orderIndex?: number;
    status?: ProgressStatus;
    cards: ICardDetailRender[];
    testStatus: ProgressStatus;
  }

  export interface ICardRender {
    id: number;
    name: string;
    isFinished?: boolean;
    status: ProgressStatus;
  }

  export interface ICardDetailRender {
    uuid: string;
    id: number;
    name: string;
    isFinished?: boolean;
    description: string;
    imageUrl: string;
    imageThumbnailUrl: string;
    minutesToFinish: number;
    content: string;
    status?: ProgressStatus;
    isFavorite: boolean;
    createdAt: string;
    isKnowledge: boolean;
    isCurrent: boolean;
    rating: number;
    tags: ITag[];
  }

  export interface IQueryProps {
    groupIds?: number[];
    page?: number;
    pageSize?: number;
    isFavorite?: boolean;
    isNew?: boolean;
    inProcess?: boolean;
    isFinished?: boolean;
    personalCourses?: boolean;
    sortByReward?: boolean;
    tagIds?: number[];
  }

  export interface ICardListItem {
    name: string;
    id: string;
    status: ProgressStatus;
  }

  export interface ICardListWithModuleData {
    cardList: ICardDetailRender[];
    module: IModuleShortData;
  }

  export interface IModuleShortData {
    isFinished: boolean;
    testStatus: ProgressStatus;
    name: string;
  }

  export interface IAdminQuery {
    groupIds?: number[];
    status?: string;
    keyword?: string;
    page?: number;
    pageSize?: number;
    startTime?: string;
    endTime?: string;
    orderField?: string;
    orderDirection?: string;
  }

  export interface IGroupRender {
    id: number;
    name: string;
    type: string;
  }
}

export declare namespace CourseCountTypes {
  export interface IResponseProps {
    total_new: number
    total_my: number;
    total_finished: number;
    total_current: number;
    total_favorite: number;
  }

  export interface IRenderProps {
    totalNew: number;
    totalMy: number;
    totalFinished: number;
    totalCurrent: number;
    totalFavorite: number;
  }
}

export const CREATE_COURSE = {
  started: 'CREATE_COURSE_START',
  success: 'CREATE_COURSE_SUCCESS',
  failed: 'CREATE_COURSE_FAILED',
};

export const UPDATE_COURSE = {
  started: 'UPDATE_COURSE_START',
  success: 'UPDATE_COURSE_SUCCESS',
  failed: 'UPDATE_COURSE_FAILED',
};

export const GET_COURSE = {
  started: 'GET_COURSE_START',
  success: 'GET_COURSE_SUCCESS',
  failed: 'GET_COURSE_FAILED',
  clear: 'GET_COURSE_CLEAR',
};

export const DELETE_COURSE = {
  started: 'DELETE_COURSE_START',
  success: 'DELETE_COURSE_SUCCESS',
  failed: 'DELETE_COURSE_FAILED',
};

export const DELETE_COURSES = {
  started: 'DELETE_COURSES_START',
  success: 'DELETE_COURSES_SUCCESS',
  failed: 'DELETE_COURSES_FAILED',
};

export const COURSES_TO_DRAFT = {
  started: 'COURSES_TO_DRAFT_START',
  success: 'COURSES_TO_DRAFT_SUCCESS',
  failed: 'COURSES_TO_DRAFT_FAILED',
};

export const COURSES_TO_PUBLISH = {
  started: 'COURSES_TO_PUBLISH_START',
  success: 'COURSES_TO_PUBLISH_SUCCESS',
  failed: 'COURSES_TO_PUBLISH_FAILED',
};

export const GET_ALL_COURSES = {
  started: 'GET_ALL_COURSES_START',
  success: 'GET_ALL_COURSES_SUCCESS',
  failed: 'GET_ALL_COURSES_FAILED',
};

export const GET_USER_COURSES = {
  started: 'GET_USER_COURSES_START',
  success: 'GET_USER_COURSES_SUCCESS',
  failed: 'GET_USER_COURSES_FAILED',
};

export const GET_AVAILABLE_COURSES = {
  started: 'GET_AVAILABLE_COURSES_START',
  success: 'GET_AVAILABLE_COURSES_SUCCESS',
  failed: 'GET_AVAILABLE_COURSES_FAILED',
};

export const GET_COURSE_DETAIL = {
  started: 'GET_COURSE_DETAIL_START',
  success: 'GET_COURSE_DETAIL_SUCCESS',
  failed: 'GET_COURSE_DETAIL_FAILED',
  clear:'GET_COURSE_DETAIL_CLEAR',
};

export const GET_COURSE_STATISTICS = {
  started: 'GET_COURSE_STATISTICS_START',
  success: 'GET_COURSE_STATISTICS_SUCCESS',
  failed: 'GET_COURSE_STATISTICS_FAILED',
};

export const GET_COURSE_MODULE = {
  started: 'GET_COURSE_MODULE_START',
  success: 'GET_COURSE_MODULE_SUCCESS',
  failed: 'GET_COURSE_MODULE_FAILED',
};

export const GET_CARD_LIST = {
  started: 'GET_CARD_LIST_START',
  success: 'GET_CARD_LIST_SUCCESS',
  failed: 'GET_CARD_LIST_FAILED',
};

export const GET_COURSES_BY_ADMIN = {
  started: 'GET_COURSES_BY_ADMIN_START',
  success: 'GET_COURSES_BY_ADMIN_SUCCESS',
  failed: 'GET_COURSES_BY_ADMIN_FAILED',
};

export const ADD_COURSE_TO_FAVORITE = {
  started: 'ADD_TO_FAVORITE_START',
  success: 'ADD_TO_FAVORITE_SUCCESS',
  failed: 'ADD_TO_FAVORITE_FAILED',
};

export const DELETE_COURSE_FROM_FAVORITE = {
  started: 'DELETE_FROM_FAVORITE_START',
  success: 'ADD_TO_FAVORITE_SUCCESS',
  failed: 'ADD_TO_FAVORITE_FAILED',
};

export const GET_COURSE_BY_ADMIN = {
  started: 'GET_COURSE_BY_ADMIN_START',
  success: 'GET_COURSE_BY_ADMIN_SUCCESS',
  failed: 'GET_COURSE_BY_ADMIN_FAILED',
  clear: 'GET_COURSE_BY_ADMIN_CLEAR',
};

export const GET_COURSE_COUNT = {
  started: 'GET_COURSE_COUNT_START',
  success: 'GET_COURSE_COUNT_SUCCESS',
  failed: 'GET_COURSE_COUNT_FAILED',
}

export enum ProgressStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  FAIL = 'FAIL',
  SUCCESS = 'SUCCESS',
}

export enum Status {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}
