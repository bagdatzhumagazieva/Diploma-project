import { CardTypes } from 'src/store/card/types';
import { IPaginationTypes } from 'src/core/store/types';

export declare namespace BattlesEmployeeTypes {
  export interface IResponseProps {
    employee: {
      employment_id: number;
      first_name: string;
      last_name: string;
      username: string;
      email: string;
      avatar_url: string;
      role: string;
      avatar_thumbnail_url: string;
      reward_available: number;
      reward_amount: number;
      branch_name: string | null;
      groups: {
        entity_id: number;
        entity_uuid: string;
        name: string;
        group_type: string;
        created_at: string;
        updated_at: string;
      }[];
      finished_entities: {
        entity_id: number;
        name: string;
        entity_uuid: string;
        entity_type: string;
        image_thumbnail_url: string | null;
        image_url: string | null;
      }[];
      battles_stat: {
        win_count: number;
        lose_count: number;
        total: number
      };
      common_battles_stat: {
        win_count: number;
        lose_count: number;
        total: number;
      }
    };
    me: {
      first_name: string;
      last_name: string;
      username: string;
      email: string;
      avatar_url: string;
      role: string;
      avatar_thumbnail_url: string;
      reward_available: 0;
      reward_amount: 0
    };
  }

  export interface IRenderProps {
    employmentId: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    avatarUrl: string;
    avatarThumbnailUrl: string;
    rewardAvailable: number;
    branchName: string | null;
    role: string;
    rewardAmount: number;
    groups: {
      id: number;
      uuid: string;
      name: string;
      groupType: string;
      createdAt: string;
      updatedAt: string;
    }[];
    finishedEntities: {
      id: number;
      name: string;
      uuid: string;
      type: string;
      imageThumbnailUrl: string | null;
      imageUrl: string | null;
    }[];
    battlesStat: {
      winCount: number;
      loseCount: number;
      total: number
    };
    commonBattlesStat: {
      winCount: number;
      loseCount: number;
      total: number;
    };
    me: {
      firstName: string;
      lastName: string;
      username: string;
      role: string;
      email: string;
      avatarUrl: string;
      avatarThumbnailUrl: string;
      rewardAvailable: 0;
      rewardAmount: 0
    };
  }

  export interface IBodyParams {
    categoryIds: number[];
    userId: number;
  }
}

export declare namespace BattleTestTypes {
  export interface IResponseProps {
    cards: IResponseCard[];
    me: IResponseEmployee;
    participant: IResponseEmployee;
  }
  export interface IResponseEmployee {
    user_id: number;
    employment_id: number;
    type: string;
    status: string;
    reward_amount: number;
    spent_time_seconds: number;
    done_percent: number;
    employment: {
      avatar_thumbnail_url: string;
      avatar_url: string;
      first_name: string | null;
      last_name: string | null;
      reward_amount: number;
      reward_available: number;
      role: string;
      total_activity_percent: number;
      type: string;
    };
  }

  export interface IResponseCard {
    answer_options: {
      created_at: string;
      id: number;
      image_thumbnail_url: string | null;
      image_url: string | null;
      question_id: number;
      text: string | null
      uuid: string;
    }[];
    is_shuffled: boolean;
    card_id: number;
    card_name: string;
    content: string;
    created_at: string;
    description: string;
    id: number;
    image_thumbnail_url: string;
    is_active: boolean;
    mark_points_number: number;
    minutes_to_finish: number;
    question_text: string;
    question_type: string;
    time_limit: number;
    updated_at: string;
    uuid: string;
  }

  export interface IRenderProps {
    cards: IRenderCard[];
    me: IRenderEmployee;
    participant: IRenderEmployee;
  }

  export interface IRenderEmployee {
    userId: number;
    employmentId: number;
    type: string;
    status: string;
    rewardAmount: number;
    spentTimeSeconds: number;
    donePercent: number;
    employment: {
      avatarThumbnailUrl: string;
      avatarUrl: string;
      firstName: string | null;
      lastName: string | null;
      rewardAmount: number;
      rewardAvailable: number;
      role: string;
      totalActivityPercent: number;
      type: string;
    };
  }

  export interface IRenderCard {
    answerOptions: {
      createdAt: string;
      id: number;
      imageThumbnailUrl: string | null;
      imageUrl: string | null;
      questionId: number;
      text: string | null
      uuid: string;
    }[];
    cardId: number;
    cardName: string;
    content: string;
    isShuffled: boolean;
    createdAt: string;
    description: string;
    id: number;
    imageThumbnailUrl: string;
    isActive: boolean;
    markPointsNumber: number;
    minutesToFinish: number;
    questionText: string;
    questionType: string;
    timeLimit: number;
    updatedAt: string;
    uuid: string;
  }
}

export declare namespace AttemptBattleTypes {

  export interface IResponseProps {
    done_percent: number;
    employment_id: number;
    id: number;
    reward_amount: number;
    spent_time_seconds: number;
    status: string;
    type: string;
    user_id: number;
    uuid: string;
    questions: IResponseQuestion[];
  }
  export interface IResponseQuestion {
    answer_ids: number[];
    answer_text: string;
    card_id: number;
    correct_answer_ids: number[];
    correct_answer_text: string;
    correct_mark_points: CardTypes.ICardQuestionMarkPoint[];
    id: number;
    is_correct: boolean | null;
    mark_points: CardTypes.ICardQuestionMarkPointPosition[] | null;
    type: string;
    uuid: string;
  }
  export interface IRenderProps {
    donePercent: number;
    employmentId: number;
    id: number;
    rewardAmount: number;
    spentTimeSeconds: number;
    status: string;
    type: string;
    userId: number;
    uuid: string;
    questions: IRenderQuestion[];
  }
  export interface IRenderQuestion {
    answerIds: number[];
    answerText: string;
    cardId: number;
    correctAnswerIds: number[];
    correctAnswerText: string;
    correctMarkPoints: CardTypes.ICardQuestionMarkPoint[];
    id: number;
    isCorrect: boolean | null;
    markPoints: CardTypes.ICardQuestionMarkPointPosition[] | null;
    type: string;
    uuid: string;
  }
}

export declare namespace BattleEmployeesTypes {
  export interface IQueryParams {
    companyId: number;
    keyword?: string;
    branchId?: number;
    groupId?: number;
    branchIds?: number[];
    groupIds?: number[];
  }

  export interface IResponseProps {
    employment_id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    avatar_url: string;
    avatar_thumbnail_url: string;
    reward_available: number;
    branch_name: string | null;
    reward_amount: number;
    groups: {
      entity_id: number;
      entity_uuid: string;
      company_id: number;
      name: string;
      group_type: string;
    }[];
    battles_stat: {
      win_count: number;
      lose_count: number;
      total: number;
    };
  }

  export interface IRenderProps {
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
    branchName: string | null;
    groups: {
      id: number;
      uuid: string;
      name: string;
      groupType: string;
    }[];
    battlesStat: {
      winCount: number;
      loseCount: number;
      total: number;
    };
  }
}

export declare namespace BattleAggregatorTypes {
  export interface IQueryProps extends IPaginationTypes  {
    companyId: number;
    keyword?: string;
    sortByDate?: boolean;
    desc?: boolean;
    sortByStatus?: boolean;
    sortByRewardAmount?: boolean;
  }

  export interface IResponseProps {
    total: number;
    participants: IResponseBattle[];
  }

  export interface IResponseBattle {
    entity_id: number;
    entity_uuid: string;
    company_id: number;
    user_id: number;
    employment_id: number;
    battle_id: number;
    battle_status: string;
    battle_uuid: string;
    status: string;
    finished_battle_datetime: string;
    started_battle_datetime: string;
    is_creator: boolean | null;
    created_at: string;
    expires_at: string;
    reward_amount: number;
    categories: {
      category_id: number;
      category_name: string;
    }[];
    employment: {
      employment_id: number;
      user_id: number;
      first_name: string;
      last_name: string;
      username: string;
      email: string;
      avatar_url: string;
      avatar_thumbnail_url: string;
      reward_available: number;
      reward_amount: number
    };
    rival_employment: {
      employment_id: number;
      user_id: number;
      first_name: string;
      last_name: string;
      username: string;
      email: string;
      avatar_url: string;
      avatar_thumbnail_url: string;
      reward_available: number;
      reward_amount: number
    };
  }

  export interface IRenderProps {
    total: number;
    participants: IRenderBattle[];
  }

  export interface IRenderBattle {
    id: number;
    uuid: string;
    userId: number;
    companyId: number;
    employmentId: number;
    battleId: number;
    battleUuid: string;
    status: string;
    createdAt: string;
    finishedBattleDatetime: string;
    startedBattleDatetime: string;
    battleStatus: string;
    expiresAt: string;
    isCreator: boolean | null;
    rewardAmount: number;
    categories: {
      categoryId: number;
      categoryName: string;
    }[];
    employment: {
      employmentId: number;
      userId: number;
      firstName: string;
      lastName: string;
      username: string;
      email: string;
      avatarUrl: string;
      avatarThumbnailUrl: string;
      rewardAvailable: number;
      rewardAmount: number
    };
    rivalEmployment: {
      employmentId: number;
      userId: number;
      firstName: string;
      lastName: string;
      username: string;
      email: string;
      avatarUrl: string;
      avatarThumbnailUrl: string;
      rewardAvailable: number;
      rewardAmount: number
    };
  }
}
export const GET_EMPLOYMENT_BATTLES = {
  started: 'GET_EMPLOYMENT_BATTLES_START',
  success: 'GET_EMPLOYMENT_BATTLES_SUCCESS',
  failed: 'GET_EMPLOYMENT_BATTLES_FAILED',
};

export const CREATE_BATTLE = {
  started: 'CREATE_BATTLE_START',
  success: 'CREATE_BATTLE_SUCCESS',
  failed: 'CREATE_BATTLE_FAILED',
};

export const GET_BATTLE_TEST = {
  started: 'GET_BATTLE_TEST_START',
  success: 'GET_BATTLE_TEST_SUCCESS',
  failed: 'GET_BATTLE_TEST_FAILED',
};

export const CREATE_BATTLE_TEST = {
  started: 'CREATE_BATTLE_TEST_START',
  success: 'CREATE_BATTLE_TEST_SUCCESS',
  failed: 'CREATE_BATTLE_TEST_FAILED',
  clear: 'CREATE_BATTLE_TEST_CLEAR',
};

export const GET_BATTLE_EMPLOYEES = {
  started: 'GET_BATTLE_EMPLOYEES_START',
  success: 'GET_BATTLE_EMPLOYEES_SUCCESS',
  failed: 'GET_BATTLE_EMPLOYEES_FAILED',
};

export const GET_BATTLES_AGGREGATOR = {
  started: 'GET_BATTLES_AGGREGATOR_START',
  success: 'GET_BATTLES_AGGREGATOR_SUCCESS',
  failed: 'GET_BATTLES_AGGREGATOR_FAILED',
};

export const GET_BATTLE_STATUS = {
  started: 'GET_BATTLE_STATUS_START',
  success: 'GET_BATTLE_STATUS_SUCCESS',
  failed: 'GET_BATTLE_STATUS_FAILED',
};

export const CHANGE_BATTLE_STATUS = {
  started: 'CHANGE_BATTLE_STATUS_START',
  success: 'CHANGE_BATTLE_STATUS_SUCCESS',
  failed: 'CHANGE_BATTLE_STATUS_FAILED',
};

export const LEAVE_BATTLE = {
  started: 'LEAVE_BATTLE_START',
  success: 'LEAVE_BATTLE_SUCCESS',
  failed: 'LEAVE_BATTLE_FAILED',
};

export const GET_BATTLE_BY_ID = {
  started: 'GET_BATTLE_BY_ID_START',
  success: 'GET_BATTLE_BY_ID_SUCCESS',
  failed: 'GET_BATTLE_BY_ID_FAILED',
};
