import { stdApiDELETE, stdApiGET, stdApiPOST, stdApiPUT } from 'src/store/defaultApi';
import { API } from 'src/constants/server';
import { TagsTypes } from 'src/store/tag/types';
import Querystring from 'querystring';

const tagsUrl = `${API}tags/`;
const searchTagsUrl = `${API}search/tags/list`;

export const getTags = (params: TagsTypes.IQueryParams, token: string) => {
  const queryParams = {
    company_id: params.companyId,
    page: params.page,
    page_size: params.pageSize,
  };
  return stdApiGET({ token, url: `${tagsUrl}?${Querystring.encode(queryParams)}` });
};

export const getTagsByIds = (params: TagsTypes.IQueryParams, token: string) => {
  const queryParams = {
    company_id: params.companyId,
    tag_ids: params.tagIds,
  };
  return stdApiGET({ token, url: `${tagsUrl}ids?${Querystring.encode(queryParams)}` });
};

export const createTag = (companyId: number, tagName: string, token: string) => {
  const body = {
    name: tagName,
  };
  return stdApiPOST({ token, data: body, url: `${tagsUrl}?company_id=${companyId}` });
};

export const getTagsByParams = (params: TagsTypes.IQueryParams, token: string) => {
  const queryParams = {
    keyword: params.keyword?.toLocaleLowerCase(),
    company_id: params.companyId,
    page: params.page,
    page_size: params.pageSize,
  };
  return stdApiGET({ token, url: `${searchTagsUrl}?${Querystring.encode(queryParams)}` });
};

export const deleteTag = (companyId: number, tagId: number, token: string) => (
  stdApiDELETE({ token, url: `${tagsUrl}${tagId}?company_id=${companyId}` })
);

export const editTag = (companyId: string, tagId: number, name: string, token: string) => (
  stdApiPUT({ token, url: `${tagsUrl}?company_id=${companyId}&tag_id=${tagId}&tag_name=${name}` })
);
