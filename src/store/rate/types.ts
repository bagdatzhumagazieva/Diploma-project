export declare namespace RatingTypes {
  export interface IResponse {

  }
  export interface IRender {

  }

  export interface ICreateBody {
    entityType: string;
    entityUuid: string;
    value: number;
  }
}

export const CREATE_RATING = {
  started: 'CREATE_RATING_START',
  success: 'CREATE_RATING_SUCCESS',
  failed: 'CREATE_RATING_FAILED',
};

export const GET_MY_RATING = {
  started: 'GET_MY_RATING_START',
  success: 'GET_MY_RATING_SUCCESS',
  failed: 'GET_MY_RATING_FAILED',
  clear: 'GET_MY_RATING_CLEAR',
};
