export declare namespace ItemCategoryTypes {
  export interface IResponseProps {
    name: string;
    created_at: string;
    updated_at: string;
    id: number;
    uuid: string;
    is_active: boolean;
    company_id: number;
  }

  export interface IRenderProps {
    name: string;
    createdAt: string;
    updatedAt: string;
    id: number;
    uuid: string;
    isActive: boolean;
    companyId: number;
    checkboxChecked?: boolean;
  }

  export interface IQueryParams {
    companyId: number | undefined;
    page?: number;
    pageSize?: number;
  }
}

export const GET_ITEM_CATEGORIES = {
  started: 'GET_ITEM_CATEGORIES_START',
  success: 'GET_ITEM_CATEGORIES_SUCCESS',
  failed: 'GET_ITEM_CATEGORIES_FAILED',
};

export const CREATE_CATEGORIES = {
  started: 'CREATE_CATEGORIES_START',
  success: 'CREATE_CATEGORIES_SUCCESS',
  failed: 'CREATE_CATEGORIES_FAILED',
};
