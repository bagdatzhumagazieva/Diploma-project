import { Status } from 'src/store/course/types';
import { IPaginationTypes } from 'src/core/store/types';
import { ICard } from 'src/components/molecules/CardInfomationBlock/types';
import { IOption } from 'src/components/molecules/Select/types';

export declare namespace GameTypes {
  export interface Game {
    id?: number;
    name: string;
    description?: string;
    templateId: number;
    rewardAmount?: number;
    groupIds?: number[];
    tagIds?: number[];
    imageUrl?: string;
    imageThumbnailUrl?: string;
    certificateEarnMinPercent?: number;
    certificateImageUrl?: string;
    certificateImageThumbnailUrl?: string;
    certificateExpirationDays?: number;
    status: Status;
    isModifiersEnabled?: boolean;
    levels: ILevel[];
  }

  export interface GameUpdate {
    id?: number;
    name?: string;
    description?: string;
    templateId?: number;
    rewardAmount?: number;
    groupIds?: number[];
    tagIds?: number[];
    imageUrl?: string;
    imageThumbnailUrl?: string;
    certificateEarnMinPercent?: number;
    certificateImageUrl?: string;
    certificateImageThumbnailUrl?: string;
    certificateExpirationDays?: number;
    status?: Status;
    isModifiersEnabled?: boolean;
    levels?: ILevel[];
  }

  export interface ILevel {
    id: string;
    name: string;
    description: string;
    orderIndex?: number;
    tests: ITest[];
  }

  export interface ITest {
    id: string;
    name: string;
    description: string;
    cardIds?: number[];
    cards?: ICard[];
    orderIndex?: number;
  }
}

export declare namespace GameAdminTypes {
  export interface IQueryProps extends IPaginationTypes  {
    groupIds?: number[];
    keyword?: string;
    status?: string;
    startTime?: string;
    endTime?: string;
    isPublished?: boolean;
    desc?: boolean;
    sortBy?: string;
    templateId?: number;
  }

  export interface IResponseProps {
    total: number;
    games: IResponseGame[];
  }

  export interface IResponseGame {
    certificate_earn_min_percent: number;
    certificate_expiration_date: string;
    certificate_image_thumbnail_url: string;
    certificate_image_url: string;
    comments_amount: number | null;
    created_at: string;
    description: string | null;
    entity_id: number;
    entity_uuid: string;
    group_ids: number[];
    groups: {
      entity_id: number;
      name: string;
    }[];
    image_thumbnail_url: string | null;
    image_url: string | null;
    is_modifiers_enabled: boolean;
    name: string | null;
    rating: number | null;
    reward_amount: number | null;
    status: string;
    tag_ids: number[];
    template: string;
    template_id: number;
    number_of_views: number | null;
    minutes_to_finish: number | null;
    levels: IResponseLevel[];
    top_players: IResponsePlayers[];
    updated_at: string | null;
  }
  export interface IResponsePlayers {
    employment_id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    avatar_url: string;
    avatar_thumbnail_url: string;
    reward_available: number;
    reward_amount: number;
  }
  export interface IResponseLevel {
    entity_id: number;
    entity_uuid: string;
    name: string;
    reward_amount: number;
    description: string;
  }

  export interface IRenderProps {
    total: number;
    games: IRenderGame[];
  }

  export interface IRenderGame {
    certificateEarnMinPercent: number;
    certificateExpirationDate: string;
    certificateImageThumbnailUrl: string;
    certificateImageUrl: string;
    commentsAmount: number | null;
    createdAt: string;
    description: string | null;
    id: number;
    uuid: string;
    groupIds: number[];
    groups: IOption[];
    imageThumbnailUrl: string | null;
    imageUrl: string | null;
    isModifiersEnabled: boolean;
    name: string | null;
    rating: number | null;
    rewardAmount: number | null;
    status: string;
    tagIds: number[];
    template: string;
    templateId: number;
    updatedAt: string | null;
    numberOfViews: number | null;
    minutesToFinish: number | null;
    levels: IRenderLevel[];
    topPlayers: IRenderPlayers[];
  }

  export interface IRenderPlayers {
    employmentId: number;
    userId: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    avatarUrl: string;
    avatarThumbnailUrl: string;
    rewardAvailable: number;
    rewardAmount: number;
  }
  export interface IRenderLevel {
    id: number;
    uuid: string;
    name: string;
    rewardAmount: number;
    description: string;
  }
}

export declare namespace GameWebTypes {
  export interface IQueryProps extends IPaginationTypes  {
    companyId: number;
    isFavorite?: boolean;
    personalGames?: boolean;
    isNew?: boolean;
    inProgress?: boolean;
    isFinished?: boolean;
    tagIds?: number[];
    isPopular?: boolean;
  }
  export interface IResponseProps {
    total: number;
    games: IResponseGameProps[];
    tags: {
      tag_id: number;
      tag_name: string;
      total: number;
    }[];
  }

  export interface IResponseGameProps {
    entity_id:  number;
    entity_uuid: string;
    name: string;
    description: string;
    image_url: string;
    image_thumbnail_url: string;
    template_id: string;
    reward_amount: number;
    group_ids: number[];
    rating: number;
    comments_amount: number;
    tag_ids: number[];
    created_at: string;
    updated_at: string;
    status: string;
    certificate_image_thumbnail_url: string;
    certificate_image_url: string;
    certificate_expiration_date: string;
    certificate_earn_min_percent: number;
    is_modifiers_enabled: boolean;
    tags: {
      tag_id: string;
      tag_name: string;
    }[];
    progress: number;
    is_favorite: boolean;
    number_of_views: number;
    minutes_to_finish: number;
    is_finished: boolean;
    has_certificate: boolean;
    levels_data: {
      finished_levels_count: number;
      total: number;
    }
  }

  export interface IRenderProps {
    total: number;
    games: IRenderGameProps[];
    tags: {
      tagId: number;
      tagName: string;
      total: number;
    }[];
  }

  export interface IRenderGameProps {
    id:  number;
    uuid: string;
    name: string;
    description: string;
    imageUrl: string;
    imageThumbnailUrl: string;
    templateId: string;
    rewardAmount: number;
    groupIds: number[];
    rating: number;
    commentsAmount: number;
    tagIds: number[];
    createdAt: string;
    updatedAt: string;
    status: string;
    certificateImageThumbnailUrl: string;
    certificateImageUrl: string;
    certificateExpirationDate: string;
    certificateEarnMinPercent: number;
    isModifiersEnabled: boolean;
    tags: {
      tagId: string;
      tagName: string;
    }[];
    progress: number;
    isFavorite: boolean;
    numberOfViews: number;
    minutesToFinish: number;
    isFinished: boolean;
    hasCertificate: boolean;
    levelsData: {
      finishedLevelsCount: number;
      total: number;
    }
  }
}

export const CREATE_GAME = {
  started: 'CREATE_GAME_START',
  success: 'CREATE_GAME_SUCCESS',
  failed: 'CREATE_GAME_FAILED',
};

export const UPDATE_GAME = {
  started: 'UPDATE_GAME_START',
  success: 'UPDATE_GAME_SUCCESS',
  failed: 'UPDATE_GAME_FAILED',
};

export const GET_GAME_BY_ID = {
  started: 'GET_GAME_BY_ID_START',
  success: 'GET_GAME_BY_ID_SUCCESS',
  failed: 'GET_GAME_BY_ID_FAILED',
  clear: 'GET_GAME_BY_ID_CLEAR',
};

export const DELETE_GAME = {
  started: 'DELETE_GAME_START',
  success: 'DELETE_GAME_SUCCESS',
  failed: 'DELETE_GAME_FAILED',
};

export const GET_GAMES_ADMIN_AGGREGATOR = {
  started: 'GET_GAMES_ADMIN_AGGREGATOR_START',
  success: 'GET_GAMES_ADMIN_AGGREGATOR_SUCCESS',
  failed: 'GET_GAMES_ADMIN_AGGREGATOR_FAILED',
  clear: 'GET_GAMES_ADMIN_AGGREGATOR_CLEAR',
};

export const GET_GAMES_WEB_AGGREGATOR = {
  started: 'GET_GAMES_WEB_AGGREGATOR_START',
  success: 'GET_GAMES_WEB_AGGREGATOR_SUCCESS',
  failed: 'GET_GAMES_WEB_AGGREGATOR_FAILED',
  clear: 'GET_GAMES_WEB_AGGREGATOR_CLEAR',
};

export const GAME_TO_PUBLISH = {
  started: 'GAME_TO_PUBLISH_START',
  success: 'GAME_TO_PUBLISH_SUCCESS',
  failed: 'GAME_TO_PUBLISH_FAILED',
  clear: 'GAME_TO_PUBLISH_CLEAR',
};

export const GAME_TO_DRAFT = {
  started: 'GAME_TO_DRAFT_START',
  success: 'GAME_TO_DRAFT_SUCCESS',
  failed: 'GAME_TO_DRAFT_FAILED',
  clear: 'GAME_TO_DRAFT_CLEAR',
};

export const GET_POPULAR_GAMES_WEB_AGGREGATOR = {
  started: 'GET_POPULAR_GAMES_WEB_AGGREGATOR_START',
  success: 'GET_POPULAR_GAMES_WEB_AGGREGATOR_SUCCESS',
  failed: 'GET_POPULAR_GAMES_WEB_AGGREGATOR_FAILED',
  clear: 'GET_POPULAR_GAMES_WEB_AGGREGATOR_CLEAR',
};

export const GET_PLAY_GAME = {
  started: 'GET_PLAY_GAME_START',
  success: 'GET_PLAY_GAME_SUCCESS',
  failed: 'GET_PLAY_GAME_FAILED',
  clear: 'GET_PLAY_GAME_CLEAR',
};
