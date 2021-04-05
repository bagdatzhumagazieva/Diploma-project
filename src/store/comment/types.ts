export declare namespace CommentTypes {
  export interface IResponseProps {
  }

  export interface ICreateBody {
    entityType: string;
    entityUuid: string;
    text: string;
    parentCommentId?: number;
    rootId?: number;
  }

  // from aggregator
  export interface IResponse {
    entity_id: number;
    entity_uuid: string;
    user_id: number;
    employment_id: number;
    comment_entity_uuid: string;
    comment_entity_type: string;
    text: string;
    root_id?: number;
    parent_id?: number;
    created_at: string;
    updated_at: string;
    root_comments_number: number;
    sub_comments?: IResponse[];
    employee: IEmployeeResponse;
  }

  export interface IEmployeeResponse {
    first_name: string;
    last_name: string;
    username: string;
    user_id: number;
    avatar_thumbnail_url: string;
  }

  export interface IRender {
    id: number;
    uuid: string;
    userId: number;
    employmentId: number;
    type: string; // COURSE OR EXERCISE
    text: string;
    createdAt: string;
    updatedAt: string;
    subComments: IRender[];
    employee: IEmployeeRender;
    parentId?: number;
    rootId?: number;
    rootCommentsCnt: number;
  }

  export interface IEmployeeRender {
    fullName: string;
    username: string;
    userId: number;
    avatarThumbnailUrl: string;
  }

  export interface IQueryParams {
    companyId: number;
    rootCommentId?: number;
    page?: number;
    pageSize?: number;
  }

  export interface ICreatedResponse {
    entity_type: string;
    entity_uuid: string;
    text: string;
    parent_comment_id: number;
    root_id: number;
    id: number;
    uuid: string;
    company_id: number;
    user_id: number;
    employment_id: number;
    created_at: string;
    updated_at: string;
  }
}

export const CREATE_COMMENT = {
  started: 'CREATE_COMMENT_START',
  success: 'CREATE_COMMENT_SUCCESS',
  failed: 'CREATE_COMMENT_FAILED',
};

export const GET_ROOT_COMMENTS = {
  started: 'GET_ROOT_COMMENTS_START',
  success: 'GET_ROOT_COMMENTS_SUCCESS',
  failed: 'GET_ROOT_COMMENTS_FAILED',
  clear: 'GET_ROOT_COMMENTS_CLEAR',
};

export const GET_ROOT_SUB_COMMENTS = {
  started: 'GET_ROOT_SUB_COMMENTS_START',
  success: 'GET_ROOT_SUB_COMMENTS_SUCCESS',
  failed: 'GET_ROOT_SUB_COMMENTS_FAILED',
};

export const DELETE_COMMENT = {
  started: 'DELETE_COMMENT_START',
  success: 'DELETE_COMMENT_SUCCESS',
  failed: 'DELETE_COMMENT_FAILED',
};
