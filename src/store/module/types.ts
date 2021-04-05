import { ProgressStatus } from 'src/store/course/types';

export declare namespace ModuleTypes {
  export interface IResponseProps {
    id: number;
    uuid: string;
    name: string;
    description: string;
    card_ids: number[];
    image_url: string;
    image_thumbnail_url: string;
    order_index: number | null;
    is_active: boolean;
    course_id: number;
  }

  export interface IRenderProps {
    id: string;
    name: string;
    description: string;
    image?: string;
    imageThumbnail?: string;
    cardIds?: number[];
    orderIndex?: number;
    status: ModuleStatus;
  }

  export interface IBodyProps {
    name: string;
    description: string;
    cardIds?: number[];
    image?: string;
    imageThumbnail?: string;
    orderIndex?: number;
    isActive: boolean;
  }

  export interface IModuleListItem {
    name: string;
    id: string;
    status: ProgressStatus;
    cardIds: number[];
  }
}

export const CREATE_MODULES = {
  started: 'CREATE_MODULES_START',
  success: 'CREATE_MODULES_SUCCESS',
  failed: 'CREATE_MODULES_FAILED',
};

export const GET_MODULES = {
  started: 'GET_MODULES_START',
  success: 'GET_MODULES_SUCCESS',
  failed: 'GET_MODULES_FAILED',
};

export const UPDATE_MODULES = {
  started: 'UPDATE_MODULES_START',
  success: 'UPDATE_MODULES_SUCCESS',
  failed: 'UPDATE_MODULES_FAILED',
};

export const DELETE_MODULES = {
  started: 'DELETE_MODULES_START',
  success: 'DELETE_MODULES_SUCCESS',
  failed: 'DELETE_MODULES_FAILED',
};

export const GET_MODULES_LIST = {
  started: 'GET_MODULES_LIST_START',
  success: 'GET_MODULES_LIST_SUCCESS',
  failed: 'GET_MODULES_LIST_FAILED',
};

export enum ModuleStatus {
  NOT_CHANGED = 'not-changed',
  EDITED = 'edited',
  NEW = 'new',
  DELETED = 'deleted',
}
