export declare namespace SearchTypes {
  export interface ISearchBodyParams {
    keyword: string;
    company_id: number;
  }

  export interface ISearchResponseProps {
    email: string;
    avatar_thumbnail_url: string;
    employment_id: number;
  }

  export interface ISearchRenderProps {
    email: string;
    avatarUrl: string;
    employmentId: number;
  }
}

export declare namespace TaskTypes {
  export interface ITaskBodyParams {
    keyword: string;
    company_id: number;
  }
}

export declare namespace SearchGlobalTypes {
  export interface IResponseProps {
    total: number;
    entities: IEntities[];
  }
  export interface IEntities {
    entity_id: number;
    entity_uuid: string;
    name: string | null;
    description: string | null;
    image_url: string | null;
    image_thumbnail_url: string | null;
    entity_type: string;
    username: string;
    group_ids: number[] | null;
    exercise_type: string | null;
    created_at: string;
    updated_at: string;
  }

  export interface IRenderProps {
    total: number;
    entities: IEntitiesRender[];
  }
  export interface IEntitiesRender {
    entityId: number;
    entityUuid: string;
    name: string | null;
    description: string | null;
    imageUrl: string | null;
    imageThumbnailUrl: string | null;
    entityType: string;
    username: string;
    groupIds: number[] | null;
    exerciseType: string | null;
    createdAt: string;
    updatedAt: string;
  }
}

export const SEARCH_EMPLOYEES = {
  started: 'SEARCH_EMPLOYEES_START',
  success: 'SEARCH_EMPLOYEES_SUCCESS',
  failed: 'SEARCH_EMPLOYEES_FAILED',
};

export const SEARCH_GLOBAL = {
  started: 'SEARCH_GLOBAL_START',
  success: 'SEARCH_GLOBAL_SUCCESS',
  failed: 'SEARCH_GLOBAL_FAILED',
};
