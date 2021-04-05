import QueryString from 'querystring';
import { API } from 'src/constants/server';
import { stdApiGET, stdApiPOST } from 'src/store/defaultApi';
import { ItemCategoryTypes } from 'src/store/item/category/types';

const getItemCategoriesUrl = `${API}shop/categories`;

export const getItemCategories = (params: ItemCategoryTypes.IQueryParams, token: string) => {
  const queryParams = {
    page: params.page || 1,
    page_size: params.pageSize || 20,
    ...(params.companyId ? { company_id: params.companyId } : {}),
  };
  return stdApiGET({ token, url: `${getItemCategoriesUrl}?${QueryString.stringify(queryParams)}` });
};

export const createCategory = (name: string, companyId: number, token: string) => {
  const data = {
    name,
  };
  return stdApiPOST({ token, data, url: `${getItemCategoriesUrl}?company_id=${companyId}` });
};
