import QueryString from 'querystring';
import { stdApiDELETE, stdApiGET, stdApiPOST } from 'src/store/defaultApi';
import { API } from 'src/constants/server';
import { CommentTypes } from 'src/store/comment/types';

const commentUrl = `${API}feedback/comments/`;

export const createComment = (companyId: number, data: CommentTypes.ICreateBody, token: string) => {
  const body = {
    entity_type: data.entityType,
    entity_uuid: data.entityUuid,
    text: data.text,
    ...(data.rootId ? { root_id: data.rootId } : {}) ,
    ...(data.parentCommentId ? { parent_comment_id: data.parentCommentId } : {}),
  };
  return stdApiPOST({ token, data: body, url: `${commentUrl}?company_id=${companyId}` });
};

export const getComments = (uuid: string, params: CommentTypes.IQueryParams, token: string) => {
  const queryParams = {
    company_id: params.companyId,
    ...(params.rootCommentId ? { root_comment_id: params.rootCommentId } : {}) ,
    ...(params.page ? { page: params.page } : {}),
    ...(params.pageSize ? { page_size: params.pageSize } : {}),
  };
  return stdApiGET({ token, url: `${API}aggregator/entities/${uuid}/comments?${QueryString.stringify(queryParams)}` });
};

export const deleteComment = (companyId: number, commentId: number, token: string) => {
  return stdApiDELETE({ token, url: `${commentUrl}${commentId}?company_id=${companyId}` });
};
