import { IPaginationTypes } from 'src/core/store/types';
import { CardTypes } from 'src/store/card/types';

export declare namespace TaskTypes {

  export interface IGetTaskBodyParams extends IPaginationTypes {
    company_id?: number;
    keyword?: string;
    status?: string;
    publish_date_from?: string;
    publish_date_to?: string;
    group_ids?: number[];
    types?: string[];
    order_field?: string;
  }

  export interface IResponseAdmin {
    total: number;
    exercises: IResponseAdminExercise[];
  }

  export interface IRenderAdmin {
    total: number;
    exercises: IRenderAdminExercise[];
  }

  export interface IResponseAdminExercise {
    entity_id: number;
    entity_uuid: string;
    name: string | null;
    description: string | null;
    image_url: string | null;
    image_thumbnail_url: string | null;
    reward_amount: number | null;
    rating: number;
    type: string;
    card_ids: number[];
    group_ids: number[];
    groups:
      {
        entity_id: number;
        name: string;
      }[];
    minutes_to_finish: number;
    publish_datetime: string;
    created_at: string;
    updated_at: string;
    status: string;
    activity_percent: number | null;
  }

  export interface IRenderAdminExercise {
    id: number;
    uuid: string;
    name: string | null;
    description: string | null;
    imageUrl: string | null;
    imageThumbnailUrl: string | null;
    rewardAmount: number | null;
    rating: number;
    type: string;
    groupIds: number[];
    groups:
      {
        id: number;
        name: string;
      }[];
    minutesToFinish: number;
    publishDatetime: string;
    createdAt: string;
    updatedAt: string;
    status: string;
    activityPercent: number | null;
  }

  export interface IBodyProps {
    id?: number;
    uuid: string;
    groupIds: number[] | null;
    name: string | null;
    cardIds?: number[] | null;
    mainCardId?: number | null;
    rating?: number;
    mainCardContent?: string;
    mainCardDescription?: string;
    mainCardInstruction?: string;
    image?: string | null;
    imageThumb?: string | null;
    tagsIds?: number[] | null;
    tags?: ITags[];
    publishDate: string | null;
    status: string | null;
    type: string | null;
    rewardAmount: number | null;
    description: string | null;
    minutesToFinish: number | null;
  }

  export interface ITags {
    name: string | null;
    id: number;
  }
}

export declare namespace TaskAggregatorTypes {
  export interface IResponseProps {
    entity_id: number;
    name: string;
    type: string;
    description?: string;
    rating?: number;
    group_ids?: number[];
    is_favorite?: boolean;
    is_finished?: boolean;
    tag_ids?: number[];
    reward_amount?: number;
    minutes_to_finish?: number;
    image_url?: string;
    image_thumbnail_url?: string;
    publish_datetime?: string;
    comments_amount?: number;
  }

  export interface IRenderProps {
    id: number;
    name: string;
    description: string;
    image: string;
    imageThumbnail: string;
    rating: number;
    commentsAmount: number;
    type: string;
    groupIds: number[];
    isFavorite: boolean;
    isFinished: boolean;
    tagIds: number[];
    rewardAmount: number;
    minutesToFinish: number;
    publishDateTime?: string;
  }

  export interface IQueryProps {
    groupId?: number;
    branchId?: number;
    page?: number;
    pageSize?: number;
    isFinished?: boolean;
    personalExercises?: boolean;
    isFavorite?: boolean;
    sortByDate?: boolean;
    sortByReward?: boolean;
    types?: string[];
    tags?: number[];
  }

  export interface IResponseDetailProps {
    id: number;
    created_at: string;
    updated_at: string;
    group_ids: number[];
    name: string;
    card_ids: number[];
    company_id: number;
    image_url: string | null;
    image_thumbnail_url: string | null;
    tag_ids: number[];
    publish_datetime: string;
    status: string;
    type: string;
    reward_amount: number | null;
    minutes_to_finish: number | null;
    description: string | null;
    is_finished: boolean;
    uuid: string;
    rating: number;
    user_rating: number | null;
    comments_amount: number;
    is_favorite: boolean;
    is_active: boolean;
    tags: {
      tag_id: number;
      tag_name: string | null;
    } [];
    main_card: {
      description: string,
      id: number | null,
      content: string | null,
      question: {
        description: string | null;
      },
    };
    poll_results: IPollResults[];
    complete_attempt: ICompleteAttempt;
    questions: IQuestion[];
  }
  export interface ICompleteAttempt {
    id: number;
    user_id: number;
    questions: IQuestions[];
  }

  export interface IQuestions {
    created_at: string;
    updated_at: string;
    id: number;
    uuid: string;
    card_id: number;
    type: string;
    answer_text: string | null;
    answer_ids: number[] | null;
    mark_points: CardTypes.ICardQuestionMarkPointPosition[] | null;
    is_correct: boolean;
    correct_answer_ids: number[] | null;
    correct_mark_points: CardTypes.ICardQuestionMarkPoint[] | null;
    correct_answer_text: string | null;
  }

  export interface IQuestion {
    id: number;
    uuid: string;
    card_id: number;
    question_text: string;
    question_type: string;
    description: string | null;
    content: string | null;
    created_at: string;
    updated_at: string;
    card_name: string | null;
    minutes_to_finish: number | null;
    image_thumbnail_url: string | null;
    mark_points_number: number;
    answer_options: IAnswerOptions[];
  }

  export interface IAnswerOptions {
    id: number;
    uuid: string;
    question_id: number;
    image_url: string | null;
    image_thumbnail_url: string | null;
    text: string | null;
  }

  export interface IPollResults {
    card_id: number;
    answer_ids: {
      [id: number]: number;
    }[];
    answer_text: string | null;
    answer_order_ids: number[] | null;
    mark_points: CardTypes.ICardQuestionMarkPointPosition[];
  }

  export interface IRenderDetailProps {
    id: number;
    uuid: string;
    groupIds: number[];
    name: string;
    cardIds: number[];
    companyId: number;
    imageUrl: string | null;
    imageThumbnailUrl: string | null;
    tagIds: number[];
    publishDatetime: string;
    status: string;
    type: string;
    rewardAmount: number | null;
    minutesToFinish: number | null;
    description: string | null;
    isFinished: boolean;
    rating: number;
    userRating: number | null;
    commentsAmount: number;
    isFavorite: boolean;
    isActive: boolean;
    mainCardContent: string | null;
    mainCardDescription: string | null;
    mainCardInstruction: string | null;
    mainCardId: number | null;
    pollResults: IPollRenderResults[];
    userID: number;
    tags: {
      id: number;
      name: string | null;
    } [];
    completeAttempt: ICompleteAttemptRender[];
    questions: IRenderQuestion[];
  }

  export interface ICompleteAttemptRender {
    createdAt: string;
    updatedAt: string;
    id: number;
    uuid: string;
    cardId: number;
    type: string;
    answerText: string | null;
    answerIds: number[] | null;
    markPoints: CardTypes.ICardQuestionMarkPointPosition[] | null;
    isCorrect: boolean;
    correctAnswerIds: number[] | null;
    correctMarkPoints: CardTypes.ICardQuestionMarkPoint[] | null;
    correctAnswerText: string | null;
  }

  export interface IPollRenderResults {
    cardId: number;
    answerIds: {
      [id: number]: number;
    }[];
    answerText: string | null;
    answerOrderIds: number[] | null;
    markPoints: CardTypes.ICardQuestionMarkPointPosition[];
  }

  export interface IRenderQuestion {
    id: number;
    uuid: string;
    cardId: number;
    questionText: string;
    questionType: string;
    description: string | null;
    content: string | null;
    markPointsNumber: number;
    answerOptions: IRenderAnswerOptions[];
    cardName: string | null;
    minutesToFinish: number | null;
    imageThumbnailUrl: string | null;
  }

  export interface IRenderAnswerOptions {
    id: number;
    uuid: string;
    questionId: number;
    imageUrl: string | null;
    imageThumbnailUrl: string | null;
    text: string | null;
  }

}

export declare namespace TaskAggregatorAdminTypes {

  export interface IQueryProps {
    companyId: number;
    taskId: number;
    groupIds?: number[];
  }

  export interface IResponseProps {
    statistics: IStatistics[];
    users: IUser[];
  }

  export interface IStatistics {
    card_id: number;
    answer_ids: {
      [id: number]: {percent: number, amount: number};
    }[];
    answer_texts: string[] | null;
    answer_order_ids: number[][] | null;
    mark_points: CardTypes.ICardQuestionMarkPointPosition[] | null;
    card: ICard | null;
  }

  export interface ICard {
    entity_id: number;
    entity_uuid: string;
    name: string;
    description: string | null;
    content: string | null;
    question_content: string | null;
    question: IQuestion;
  }

  export interface IQuestion {
    entity_id: number;
    entity_uuid: string;
    card_id: number;
    question_text: string;
    question_type: string;
    description: string | null;
    content: string | null;
    created_at: string;
    updated_at: string;
    mark_points_number: number;
    answer_options: IAnswerOptions[];
  }

  export interface IAnswerOptions {
    entity_id: number;
    entity_uuid: string;
    question_id: number;
    image_url: string | null;
    image_thumbnail_url: string | null;
    text: string | null;
  }

  export interface IUser {
    user_id: number;
    first_name: string | null;
    last_name: string | null;
    avatar_thumbnail: string | null;
  }

  export interface IRenderProps {
    statistics: IStatisticsRender[];
    users: IUserRender[];
  }

  export interface IStatisticsRender {
    cardId: number;
    answerIds: {
      [id: number]: {percent: number, amount: number};
    }[];
    answerTexts: string[] | null;
    answerOrderIds: number[][] | null;
    markPoints: CardTypes.ICardQuestionMarkPointPosition[] | null;
    card: ICardRender | null;
  }

  export interface ICardRender {
    id: number;
    uuid: string;
    name: string;
    description: string | null;
    content: string | null;
    questionContent: string | null;
    question: IQuestionRender;
  }

  export interface IQuestionRender {
    id: number;
    uuid: string;
    cardId: number;
    questionText: string;
    questionType: string;
    description: string | null;
    content: string | null;
    createdAt: string;
    updatedAt: string;
    markPointsNumber: number;
    answerOptions: IAnswerOptionsRender[];
  }

  export interface IAnswerOptionsRender {
    id: number;
    uuid: string;
    questionId: number;
    imageUrl: string | null;
    imageThumbnailUrl: string | null;
    text: string | null;
  }

  export interface IUserRender {
    userId: number;
    firstName: string | null;
    lastName: string | null;
    avatarThumbnail: string | null;
  }
}

export declare namespace EmployeeResultTypes {
  export interface IQueryProps {
    companyId: number;
    taskId: number;
    userId?: number;
  }
}
export declare namespace TaskAggregatorGroupTypes {
  export interface IResponseProps {
    entity_id: number;
    entity_uuid: string;
    company_id: number;
    name: string | null;
    group_type: string | null;
  }
  export interface IRenderProps {
    id: number;
    uuid: string;
    companyId: number;
    name: string | null;
    groupType: string | null;
  }
}

export declare namespace TaskAttemptsStatisticsTypes {
  export interface IResponseProps {
    user_ids: number[];
    statistics: IStatisticsResponse[];
  }

  export interface IStatisticsResponse {
    card_id: number | null;
    answer_ids: {
      [id: number]: {percent: number, amount: number};
    }[];
    answer_texts: string[] | null;
  }

  export interface IRenderProps {
    userIds: number[];
    statistics: IStatisticsRender[];
  }
  export interface IStatisticsRender {
    cardId: number | null;
    answerIds: {
      [id: number]: {percent: number, amount: number};
    }[];
    answerTexts: string[] | null;
  }
}

export declare namespace CreateAttemptTask {
  export interface IResponse {
    card_id: number;
    type: string;
    answer_text: string | null;
    answer_ids: number[] | null;
    mark_points: CardTypes.ICardQuestionMarkPointPosition[] | null;
  }
  export interface IRender {
    cardId: number;
    type: string;
    answerText?: string;
    answerIds?: number[];
    markPoints?: CardTypes.ICardQuestionMarkPointPosition[];
  }

  export interface IResponseProps {
    reward_amount: number | null;
    questions: TaskAggregatorTypes.IQuestions[];
  }

  export interface IRenderProps {
    rewardAmount: number | null;
    questions: TaskAggregatorTypes.ICompleteAttemptRender[];
  }
}

export declare namespace TaskStatisticsByGroups {
  export interface IResponse {
    total_amount: number;
    finished_amount: number;
    group_amounts: IGroupResponse[];
    exercise: {
      rating: number;
    };
  }

  export interface IGroupResponse {
    group_id: number;
    finished_amount: number;
    total_amount: number;
    group_name: string;
  }

  export interface IRender {
    totalAmount: number;
    finishedAmount: number;
    groupAmounts: IGroupRender[];
    rating: number;
  }

  export interface IGroupRender {
    groupId: number;
    totalAmount: number;
    finishedAmount: number;
    groupName: string;
  }
}

export declare namespace MyTasks {
  export interface IQueryProps {
    companyId: number;
    page?: number;
    pageSize?: number;
  }

  export interface IResponseProps {
    total_not_finished: number;
  }

  export interface IRenderProps {
    totalNotFinished: number;
  }
}

export const CREATE_TASK = {
  started: 'CREATE_TASK_START',
  success: 'CREATE_TASK_SUCCESS',
  failed: 'CREATE_TASK_FAILED',
};

export const UPDATE_TASK = {
  started: 'UPDATE_TASK_START',
  success: 'UPDATE_TASK_SUCCESS',
  failed: 'UPDATE_TASK_FAILED',
};

export const DELETE_TASK = {
  started: 'DELETE_TASK_START',
  success: 'DELETE_TASK_SUCCESS',
  failed: 'DELETE_TASK_FAILED',
};

export const GET_TASKS_BY_AGGREGATOR = {
  started: 'GET_TASKS_BY_AGGREGATOR_START',
  success: 'GET_TASKS_BY_AGGREGATOR_SUCCESS',
  failed: 'GET_TASKS_BY_AGGREGATOR_FAILED',
};

export const CREATE_ATTEMPT_TASK = {
  started: 'CREATE_ATTEMPT_TASK_START',
  success: 'CREATE_ATTEMPT_TASK_SUCCESS',
  failed: 'CREATE_ATTEMPT_TASK_FAILED',
};

export const GET_DETAIL_TASK_AGGREGATOR = {
  started: 'GET_DETAIL_TASK_AGGREGATOR_START',
  success: 'GET_DETAIL_TASK_AGGREGATOR_SUCCESS',
  failed: 'GET_DETAIL_TASK_AGGREGATOR_FAILED',
  clear: 'GET_DETAIL_TASK_AGGREGATOR_CLEAR',
};

export const CREATE_FAVORITE_TASK = {
  started: 'CREATE_FAVORITE_TASK_START',
  success: 'CREATE_FAVORITE_TASK_SUCCESS',
  failed: 'CREATE_FAVORITE_TASK_FAILED',
};

export const DELETE_FAVORITE_TASK = {
  started: 'DELETE_FAVORITE_TASK_START',
  success: 'DELETE_FAVORITE_TASK_SUCCESS',
  failed: 'DELETE_FAVORITE_TASK_FAILED',
};

export const GET_MY_TASKS = {
  started: 'GET_MY_TASKS_START',
  success: 'GET_MY_TASKS_SUCCESS',
  failed: 'GET_MY_TASKS_FAILED',
};

export const GET_TASK_STATISTICS = {
  started: 'GET_TASK_STATISTICS_START',
  success: 'GET_TASK_STATISTICS_SUCCESS',
  failed: 'GET_TASK_STATISTICS_FAILED',
};

export const GET_TASK_STATISTICS_GROUPS = {
  started: 'GET_TASK_STATISTICS_GROUPS_START',
  success: 'GET_TASK_STATISTICS_GROUPS_SUCCESS',
  failed: 'GET_TASK_STATISTICS_GROUPS_FAILED',
};

export const GET_USER_RESULT = {
  started: 'GET_USER_RESULT_START',
  success: 'GET_USER_RESULT_SUCCESS',
  failed: 'GET_USER_RESULT_FAILED',
};

export const GET_STATISTICS_BY_GROUP = {
  started: 'GET_STATISTICS_BY_GROUP_START',
  success: 'GET_STATISTICS_BY_GROUP_SUCCESS',
  failed: 'GET_STATISTICS_BY_GROUP_FAILED',
};

export const GET_USER_RESULT_EXCEL = {
  started: 'GET_USER_RESULT_EXCEL_START',
  success: 'GET_USER_RESULT_EXCEL_SUCCESS',
  failed: 'GET_USER_RESULT_EXCEL_FAILED',
};

export const GET_ADMIN_TASKS = {
  started: 'GET_ADMIN_TASKS_START',
  success: 'GET_ADMIN_TASKS_SUCCESS',
  failed: 'GET_ADMIN_TASKS_FAILED',
};
