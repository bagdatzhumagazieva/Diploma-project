import QueryString from 'querystring';
import { API } from 'src/constants/server';
import { stdApiDELETE, stdApiGET, stdApiPOST, stdApiPUT } from 'src/store/defaultApi';
import { GroupDetailPageTypes } from 'src/pages/AdminPages/GroupDetailPage/types';
import { GroupTypes } from 'src/store/group/types';

const getGroupsUrl = `${API}groups/`;

export const getGroups = (params: GroupTypes.IQueryParams, token: string) => {
  const queryParams = {
    ...(params.companyId ? { company_id: params.companyId } : {}),
    ...(params.orderField ? { order_field: params.orderField } : {}),
    ...(params.keyword ? { keyword: params.keyword } : {}),
    page: params.page || 1,
    page_size: params.pageSize || 20,
  };
  return stdApiGET({ token, url: `${getGroupsUrl}?${QueryString.stringify(queryParams)}` });
};

export const getGroupById = (companyId: number, groupId: number, token: string) => (
  stdApiGET({ token, url: `${getGroupsUrl}${groupId}?company_id=${companyId}` })
);

export const updateGroup = (groupId: number, data: GroupDetailPageTypes.IGroupUpdateBody, token: string) => (
  stdApiPUT({ token, data, url: `${getGroupsUrl}${groupId}` })
);

export const deleteGroup = (companyId: string, groupIds: number[], token: string, inheritanceGroupId?: number) => {
  const queryParams = {
    company_id: companyId,
    ...(groupIds ? { group_ids: groupIds } : {}),
    ...(inheritanceGroupId ? { inheritance_group_id: inheritanceGroupId } : {}),
  };
  return (
    stdApiDELETE({ token, url: `${getGroupsUrl}?${QueryString.stringify(queryParams)}` })
  );
};

export const createGroup = (token: string, data: GroupTypes.ICreateGroupResponse) => (
  stdApiPOST({ token, data, url: `${getGroupsUrl}target` })
);

export const createParametricGroup = (token: string, data: GroupTypes.ICreateParametricGroupResponse) => (
  stdApiPOST({ token, data, url: `${getGroupsUrl}parametric` })
);

export const downloadGroupEmployees = (token: string, groupId: number) => (
  stdApiGET({ token, url: `${getGroupsUrl}${groupId}/download_group_employees` })
);

export const getGroupByIds = (companyId: number, groupIds: number[], token: string) => {
  const params = {
    company_id: companyId,
    group_ids: groupIds,
  };

  return stdApiGET({ token, url: `${getGroupsUrl}by_ids?${QueryString.stringify(params)}` });
};
