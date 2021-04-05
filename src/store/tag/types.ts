export declare namespace TagsTypes {
  export interface IResponseProps {
    name: string;
    id: number;
    uuid: string;
  }

  export interface IRenderProps {
    name: string;
    id: number;
    total?: number;
  }

  export interface IQueryParams {
    companyId?: number;
    tagIds?: number[];
    page?: number;
    pageSize?: number;
    keyword?: string;
  }

  export interface ISearchResponseProps {
    tag_id: number;
    tag_name: string;
  }
}

export const GET_TAGS = {
  started: 'GET_TAGS_START',
  success: 'GET_TAGS_SUCCESS',
  failed: 'GET_TAGS_FAILED',
};

export const CREATE_TAG = {
  started: 'CREATE_TAG_START',
  success: 'CREATE_TAG_SUCCESS',
  failed: 'CREATE_TAG_FAILED',
};

export const GET_TAGS_BY_PARAMS = {
  started: 'GET_TAGS_BY_PARAMS_START',
  success: 'GET_TAGS_BY_PARAMS_SUCCESS',
  failed: 'GET_TAGS_BY_PARAMS_FAILED',
};

export const DELETE_TAG = {
  started: 'DELETE_TAG_START',
  success: 'DELETE_TAG_SUCCESS',
  failed: 'DELETE_TAG_FAILED',
};

export const GET_TAGS_BY_IDS = {
  started: 'GET_TAGS_BY_IDS_START',
  success: 'GET_TAGS_BY_IDS_SUCCESS',
  failed: 'GET_TAGS_BY_IDS_FAILED',
};

export const EDIT_TAG = {
  started: 'EDIT_TAG_START',
  success: 'EDIT_TAG_SUCCESS',
  failed: 'EDIT_TAG_FAILED',
};
