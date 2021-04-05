import { VerificationQuestions } from 'src/components/organisms/CardCreation/CardVerificationQuestion/consts';
import { ITag } from 'src/components/organisms/AdminTags/types';

export declare namespace CardTypes {
  export interface IResponseProps {
    id: number;
    name: string;
    description: string;
    image_url: string | null;
    image_thumbnail_url: string | null;
    minutes_to_finish: number | null;
    content?: string;
  }

  export interface ICardResponseProps {
    entity_id: number;
    name: string;
    description: string;
    image_url: string | null;
    image_thumbnail_url: string | null;
    minutes_to_finish: number | null;
    content?: string;
  }

  export interface IFullResponseProps {
    category_id: string;
    category: IResponseCategory;
    content: string;
    description: string;
    id: number;
    is_knowledge: boolean;
    is_favorite: boolean;
    minutes_to_finish: number;
    name: string;
    question: IResponseQuestion;
    tags: ITag[];
    uuid: string;
    image_url?: string;
    image_thumbnail_url?: string;
  }

  export interface IResponseQuestion {
    content: string;
    description: string;
    id: number;
    is_shuffled: boolean;
    question_text: string;
    question_type: VerificationQuestions;
    time_limit: number;
    uuid: string;
    answer_options?: IResponseAnswerOptions[];
    answer_text?: string;
    mark_points?: { data: ICardQuestionMarkPoint[] };
    mark_points_number?: number;
  }

  export interface IResponseAnswerOptions {
    created_at: string;
    id: number;
    image_url: string | null;
    image_thumbnail_url: string | null;
    question_id: number;
    text: string;
    uuid: string;
    is_correct: boolean;
  }

  export interface IResponseCategory {
    id: number;
    uuid: string;
    name: string;
    parent_category: IResponseCategory;
  }

  export interface IRenderProps {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    imageUrlThumbnail: string;
    minutesToFinish: number;
    content: string;
  }

  export interface IFullRenderProps {
    categoryId: string;
    category: IRenderCategory;
    content: string;
    description: string;
    id: number;
    isKnowledge: boolean;
    isFavourite: boolean;
    minutesToFinish: number;
    name: string;
    question: IRenderQuestion;
    tags: ITag[];
    uuid: string;
    imageUrl: string;
    imageThumbnailUrl: string;
  }

  export interface IRenderQuestion {
    content: string;
    description: string;
    id: number;
    isShuffled: boolean;
    questionText: string;
    questionType: VerificationQuestions;
    timeLimit: number;
    uuid: string;
    answerOptions?: IRenderAnswerOptions[];
    answerText?: string;
    markPoints?: { data: ICardQuestionMarkPoint[] };
    markPointsCount?: number;
  }

  export interface IRenderAnswerOptions {
    id: number;
    imageUrl: string | null;
    imageUrlThumbnail: string | null;
    questionId: number;
    text: string;
    uuid: string;
    isCorrect: boolean;
  }

  export interface IRenderCategory {
    id: number;
    uuid: string;
    name: string;
    parentCategory: IRenderCategory;
  }

  export interface ICardBodyParams {
    name: string;
    description: string;
    category_id?: number;
    content: string;
    is_knowledge: boolean;
    minutes_to_finish?: number;
    tag_names: string[];
    question?: ICardQuestion;
    image_url?: string;
    image_thumbnail_url?: string;
  }

  export interface ICardQuestion {
    question_text: string;
    description: string;
    content: string;
    is_shuffled?: boolean;
    time_limit: number;
    answer_text?: string;
    answer_order?: number[];
    answer_options?: ICardQuestionAnswerOption[];
    mark_points?: { data: ICardQuestionMarkPoint[] };
    mark_points_mobile?: { data: ICardQuestionMarkPoint[] };
    question_type?: string;
    question_id?: number;
  }

  export interface ICardQuestionAnswerOption {
    is_correct: boolean;
    order_number?: number;
    image_url?: string;
    image_thumbnail_url?: string;
    text: string;
    answer_id?: number;
  }

  export interface ICardQuestionMarkPoint {
    // top left
    a: ICardQuestionMarkPointPosition;
    // top right
    b: ICardQuestionMarkPointPosition;
    // bottom left
    c: ICardQuestionMarkPointPosition;
    // bottom right
    d: ICardQuestionMarkPointPosition;
  }

  export interface ICardQuestionMarkPointPosition {
    x: number;
    y: number;
  }

  export interface IGetFullCardsQueryParams {
    companyId: number;
    page?: number;
    pageSize?: number;
    cardIds?: number[];
  }
}

export interface IGetCardsQueryParams {
  companyId: number;
  tagIds?: number[];
  categoryId?: number;
  sortBy?: string;
  desc?: boolean;
  keyword?: string;
  isFavourite?: boolean;
  page?: number;
  pageSize?: number;
  cardIds?: number[];
}

export const CREATE_CARD = {
  started: 'CREATE_CARD_START',
  success: 'CREATE_CARD_SUCCESS',
  failed: 'CREATE_CARD_FAILED',
};

export const UPDATE_CARD = {
  started: 'UPDATE_CARD_START',
  success: 'UPDATE_CARD_SUCCESS',
  failed: 'UPDATE_CARD_FAILED',
};

export const DELETE_CARD = {
  started: 'DELETE_CARD_START',
  success: 'DELETE_CARD_SUCCESS',
  failed: 'DELETE_CARD_FAILED',
};

export const GET_CARD_FULL = {
  started: 'GET_CARD_FULL_START',
  success: 'GET_CARD_FULL_SUCCESS',
  failed: 'GET_CARD_FULL_FAILED',
};

export const GET_ADMIN_CARD = {
  started: 'GET_ADMIN_CARD_START',
  success: 'GET_ADMIN_CARD_SUCCESS',
  failed: 'GET_ADMIN_CARD_FAILED',
};

export const GET_CARDS = {
  started: 'GET_CARDS_START',
  success: 'GET_CARDS_SUCCESS',
  failed: 'GET_CARDS_FAILED',
};

export const GET_CARDS_AGGREGATOR = {
  started: 'GET_CARDS_AGGREGATOR_START',
  success: 'GET_CARDS_AGGREGATOR_SUCCESS',
  failed: 'GET_CARDS_AGGREGATOR_FAILED',
};

export const GET_CARDS_FULL = {
  started: 'GET_CARDS_FULL_START',
  success: 'GET_CARDS_FULL_SUCCESS',
  failed: 'GET_CARDS_FULL_FAILED',
};

export const TOGGLE_CARD_FAVOURITE = {
  started: 'TOGGLE_CARD_FAVOURITE_START',
  success: 'TOGGLE_CARD_FAVOURITE_SUCCESS',
  failed: 'TOGGLE_CARD_FAVOURITE_FAILED',
};
