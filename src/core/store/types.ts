export interface ILoadTypes<T, U = {}> {
  data: T;
  loading: any;
  errorMessage?: string;
  total?: number;
  nextPage?: number | null;
  curPage?: number;
  withStart?: U;
}

export interface Action<T> {
  [param: string]: T;
}

export type ActionType<T, U = {}> = Action<T> & U & {
  type: string;
  errorMessage?: string;
};

export type IPaginationResponseTypes<T> = T & {
  total: number;
  next_page?: number | null;
  page?: number;
};

export interface IPaginationTypes {
  page?: number;
  page_size?: number;
}

export enum ResponseCodes {
  OK = 0,
  BAD_REQUEST = 1,
  AUTHORIZATION_ERROR = 2,
  NOT_FOUND = 3,
  ALREADY_EXISTS = 4,
  INVALID_EMAIL = 5,
  INVALID_PHONE = 6,
  INTERNAL_SERVER_ERROR = 7,
}

export interface IIcon {
  title: string;
  iconJSX: any;
  color: string;
  callback?(): void;
}

export interface IAccountData {
  imageThumbnailUrl: string;
  fullName: string;
  id: number;
  email: string;
  companies: {
    id: number,
    uuid: string,
    name: string,
    imageThumbnail: string,
  }[];
}
