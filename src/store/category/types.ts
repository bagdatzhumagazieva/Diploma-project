
export declare namespace CategoryTypes {
  export interface ICategoryResponseProps {
    name: string;
    id: number;
    sub_categories: ICategoryResponseProps[];
    parent_category_id: number;
    cards_number: number;
    parent_category: any;
  }

  export interface ICategoryRenderProps {
    name: string;
    id: number;
    subCategories: ICategoryRenderProps[];
    parentId: number;
    cardsNumber: number;
    level: number;
    total?: number;
  }

  export interface ICreateCategoryBody {
    name: string;
    description?: string;
    parentId?: number | null;
  }

  export interface IEditCategoryBody {
    categoryId?: number | null;
    name: string;
    description?: string;
    newParentId?: number | null;
  }

  export interface IDeleteCategoryData {
    categoryId: number | null;
    newCategoryId?: number;
  }
}

export const GET_CATEGORIES = {
  started: 'GET_CATEGORIES_START',
  success: 'GET_CATEGORIES_SUCCESS',
  failed: 'GET_CATEGORIES_FAILED',
  clear: 'GET_CATEGORIES_CLEAR',
};

export const CREATE_CATEGORY = {
  started: 'CREATE_CATEGORY_START',
  success: 'CREATE_CATEGORY_SUCCESS',
  failed: 'CREATE_CATEGORY_FAILED',
};

export const GET_CATEGORY_BY_ID = {
  started: 'GET_CATEGORY_BY_ID_START',
  success: 'GET_CATEGORY_BY_ID_SUCCESS',
  failed: 'GET_CATEGORY_BY_ID_FAILED',
};

export const UPDATE_CATEGORY = {
  started: 'UPDATE_CATEGORY_START',
  success: 'UPDATE_CATEGORY_SUCCESS',
  failed: 'UPDATE_CATEGORY_FAILED',
};

export const DELETE_CATEGORY = {
  started: 'DELETE_CATEGORY_START',
  success: 'DELETE_CATEGORY_SUCCESS',
  failed: 'DELETE_CATEGORY_FAILED',
};
