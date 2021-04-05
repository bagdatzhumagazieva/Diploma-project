export declare namespace ActivitiesTypes {
  export interface IResponseProps {
    entity_id: number;
    entity_uuid: string;
    name?: string;
    image_url?: string;
    image_thumbnail_url?: string;
    description?: string;
    reward_amount?: number;
    progress?: number;
    type?: string;
    created_at: string;
    is_finished: boolean;
  }

  export interface IResponseActivitiesCountProps {
    pending_count: number;
    current_count: number;
    finished_count: number;
  }

  export interface IRenderProps {
    name: string;
    image: string;
    imageThumbnail: string;
    description: string;
    rewardAmount: number;
    isFinished: boolean;
    id: number;
    type: string;
    date: string;
    progress: number;
    uuid: string;
  }

  export interface IRenderActivitiesCountProps {
    pendingCount: number;
    currentCount: number;
    finishedCount: number;
  }

  export interface IQueryProps {
    page?: number;
    pageSize?: number;
    entityType?: string;
    progress?: string;
  }
}

export const GET_ACTIVITIES = {
  started: 'GET_ACTIVITIES_START',
  success: 'GET_ACTIVITIES_SUCCESS',
  failed: 'GET_ACTIVITIES_FAILED',
};

export const GET_ACTIVITIES_COUNT = {
  started: 'GET_ACTIVITIES_COUNT_START',
  success: 'GET_ACTIVITIES_COUNT_SUCCESS',
  failed: 'GET_ACTIVITIES_COUNT_FAILED',
};
