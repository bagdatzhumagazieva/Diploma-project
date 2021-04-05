export declare namespace AchievementTypes {
  export interface IResponseProps {
    id: number;
    uuid: string;
    name?: string;
    image_url?: string;
    image_thumbnail_url?: string;
    description?: string;
    reward_amount?: number;
  }

  export interface IRenderProps {
    name: string;
    image: string;
    imageThumbnail: string;
    description: string;
    rewardAmount: number;
    id: number;
    uuid: string;
  }

  export interface IQueryProps {
    page?: number;
    pageSize?: number;
    orderField?: string;
  }

  export interface IResponseAchievementCountProps {
    courses_count: number;
    spent_time: number;
    certificates_count: number;
  }

  export interface IRenderAchievementCountProps {
    coursesCount: number;
    spentTime: number;
    certificatesCount: number;
  }
}

export const GET_ACHIEVEMENTS = {
  started: 'GET_ACHIEVEMENTS_START',
  success: 'GET_ACHIEVEMENTS_SUCCESS',
  failed: 'GET_ACHIEVEMENTS_FAILED',
};

export const GET_ACHIEVEMENTS_COUNT = {
  started: 'GET_ACHIEVEMENTS_COUNT_START',
  success: 'GET_ACHIEVEMENTS_COUNT_SUCCESS',
  failed: 'GET_ACHIEVEMENTS_COUNT_FAILED',
};
