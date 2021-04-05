import { API } from 'src/constants/server';
import { stdApiDELETE, stdApiGET, stdApiPOST, stdApiPUT } from 'src/store/defaultApi';
import { CategoryTypes } from 'src/store/category/types';

const categoriesUrl = `${API}categories/`;

export const getCategories = (companyId: number, page: number, pageSize: number, token: string) => (
  stdApiGET({ token, url: `${categoriesUrl}?company_id=${companyId}&page=${page}&page_size=${pageSize}` })
);

export const getCategoryById = (companyId: number, categoryId: number, token: string) => (
  stdApiGET({ token, url: `${categoriesUrl}${categoryId}?company_id=${companyId}` })
);

export const addCategory = (companyId: number, data: CategoryTypes.ICreateCategoryBody, token: string) => {
  const body = {
    name: data.name,
    description: data.description || data.name,
    parent_category_id: data.parentId,
  };
  return stdApiPOST({ token, data: body, url: `${categoriesUrl}?company_id=${companyId}` });
};

export const updateCategory = (companyId: number, data: CategoryTypes.IEditCategoryBody, token: string) => {
  const body = {
    name: data.name,
    description: data.description || data.name,
    parent_category_id: data.newParentId,
  };
  return stdApiPUT({ token, data: body, url: `${categoriesUrl}${data.categoryId}?company_id=${companyId}` });
};

export const deleteCategory = (companyId: number, data: CategoryTypes.IDeleteCategoryData, token: string) => (
  stdApiDELETE({
    token,
    url: `${categoriesUrl}${data.categoryId}?company_id=${companyId}${data.newCategoryId ? `&alternative_parent_category=${data.newCategoryId}` : '' }`,
  })
);
