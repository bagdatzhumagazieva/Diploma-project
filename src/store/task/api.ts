import { stdApiDELETE, stdApiGET, stdApiPOST, stdApiPUT } from 'src/store/defaultApi';
import {
  CreateAttemptTask,
  TaskAggregatorTypes,
  TaskTypes,
  MyTasks,
  TaskAggregatorAdminTypes,
  EmployeeResultTypes,
} from 'src/store/task/types';
import Querystring from 'querystring';
import { API } from 'src/constants/server';
const querystring = require('querystring');

const taskUrl = `${API}exercises/`;
const tasksAggregatorUrl = `${API}aggregator/companies/`;
const tasksAdminAggregatorUrl = `${API}aggregator/admin/companies/`;

const parseTaskBody = (bodyParams: TaskTypes.IBodyProps) => ({
  name: bodyParams.name,
  group_ids: bodyParams.groupIds,
  reward_amount: bodyParams.rewardAmount,
  image_url: bodyParams.image,
  image_thumbnail_url: bodyParams.imageThumb,
  main_card_id: bodyParams.mainCardId,
  card_ids: bodyParams.cardIds,
  tag_ids: bodyParams.tagsIds,
  type: bodyParams.type,
  status: bodyParams.status,
  publish_datetime: bodyParams.publishDate,
  description: bodyParams.description,
  minutes_to_finish: bodyParams.minutesToFinish,
});

const parseCreationAttempt = (bodyParams: CreateAttemptTask.IRender[]): CreateAttemptTask.IResponse[] => [
  ...bodyParams.map(item => ({
    card_id: item.cardId,
    type: item.type,
    answer_text: item.answerText || null,
    answer_ids: item.answerIds || null,
    mark_points: item.markPoints || null,
  })),
];

export const createTask = (bodyParams: TaskTypes.IBodyProps, companyId: number, token: string) => {
  const requestBody = parseTaskBody(bodyParams);
  return (
    stdApiPOST({ token, data: requestBody, url: `${taskUrl}?company_id=${companyId}` })
  );
};

export const updateTask = (bodyParams: TaskTypes.IBodyProps, taskId: number, companyId: number, token: string) => {
  const requestBody = parseTaskBody(bodyParams);
  return (
    stdApiPUT({ token, data: requestBody, url: `${taskUrl}${taskId}?company_id=${companyId}` })
  );
};

export const deleteTask = (taskIds: number[], companyId: number, token: string) => {
  const queryParams = {
    ...(taskIds ? { exercise_ids: taskIds } : {}),
  };
  return (
    stdApiDELETE({ token, url: `${taskUrl}?company_id=${companyId}&${Querystring.stringify(queryParams)}` })
  );
};

// Aggregator

export const getTasksByAggregator = (companyId: string, params: TaskAggregatorTypes.IQueryProps, token: string) => {
  const queryParams = {
    company_id: companyId,
    page_size: params.pageSize,
    page: params.page,
    ...(params.types ? { types: params.types } : {}),
    ...(params.types ? { types: params.types } : {}),
    ...(params.tags ? { tags: params.tags } : {}),
    ...(params.groupId ? { group_id: params.groupId } : {}),
    ...(params.isFinished ? { is_finished: params.isFinished } : {}),
    ...(params.personalExercises ? { personal_exercises: params.personalExercises } : {}),
    ...(params.branchId ? { branch_id: params.branchId } : {}),
    ...(params.isFinished ? { is_finished: params.isFinished } : {}),
    ...(params.isFavorite ? { is_favorite: params.isFavorite } : {}),
    ...(params.sortByReward ? { sort_by_reward: params.sortByReward } : {}),
    ...(params.sortByDate ? { sort_by_date: params.sortByDate } : {}),
  };

  return stdApiGET({
    token,
    url: `${tasksAggregatorUrl}${queryParams.company_id}/exercises?personal_exercises=true&${Querystring.stringify(queryParams)}` });
};

// Aggregator

export const getDetailTask = (taskId: number, companyId: number, token: string) => (
  stdApiGET({ token, url: `${tasksAggregatorUrl}${companyId}/exercises/${taskId}` })
);

// Aggregator

export const getStatisticsByAggregator = (params: TaskAggregatorAdminTypes.IQueryProps, token: string) => {
  const queryParams = {
    ...(params.groupIds ? { group_ids: params.groupIds } : {}),
  };
  return (
    stdApiGET({
      token,
      url: `${tasksAggregatorUrl}${params.companyId}/exercises/${params.taskId}/statistics?${Querystring.stringify(queryParams)}` })
  );
};

export const getUserResult = (params: EmployeeResultTypes.IQueryProps, token: string) => {
  const queryParams = {
    ...(params.userId ? { user_id: params.userId } : {}),
  };
  return (
    stdApiGET({
      token,
      url: `${tasksAggregatorUrl}${params.companyId}/exercises/${params.taskId}/results?${Querystring.stringify(queryParams)}` })
  );
};

// Aggregator

export const getStatisticsGroupsByAggregator = (taskId: number, companyId: number, token: string) => {
  return (
    stdApiGET({
      token,
      url: `${tasksAggregatorUrl}${companyId}/exercises/${taskId}/groups` })
  );
};

// Aggregator

export const getStatisticsByGroupsAggregator = (taskId: number, companyId: number, token: string) => {
  return (
    stdApiGET({
      token,
      url: `${tasksAggregatorUrl}${companyId}/exercises/${taskId}/statistics_by_groups` })
  );
};

export const createAttemptTask = (taskId: number, bodyParams: CreateAttemptTask.IRender[], companyId: number, token: string) => {
  const requestBody = parseCreationAttempt(bodyParams);
  return (
    stdApiPOST({ token, data: requestBody, url: `${taskUrl}${taskId}/attempts?company_id=${companyId}` })
  );
};

// Favorite exercise

export const makeFavourTask = (taskId: number, companyId: number, token: string) => (
  stdApiPOST({ token, url: `${taskUrl}favorite/?exercise_id=${taskId}&company_id=${companyId}` })
);

export const getGroupExcelResult = (taskId: number, companyId: number, groupIds: number[], token: string) => {
  const queryParams = {
    ...(groupIds ? { group_ids: groupIds } : {}),
  };
  return (
    stdApiGET({
      token,
      url: `${tasksAggregatorUrl}${companyId}/exercises/${taskId}/statistics/excel?${Querystring.stringify(queryParams)}` })
  );
};

export const deleteFavourTask = (taskId: number, companyId: number, token: string) => (
  stdApiDELETE({ token, url: `${taskUrl}favorite/?exercise_id=${taskId}&company_id=${companyId}` })
);

// My exercise

export const getMyExercise = (params: MyTasks.IQueryProps, token: string) => {
  const queryParams = {
    company_id: params.companyId,
    page_size: params.pageSize,
    page: params.page,
  };
  return (
    stdApiGET({ token, url: `${taskUrl}my?${Querystring.stringify(queryParams)}` })
  );
};

export const getAdminTasks = (bodyParam: TaskTypes.IGetTaskBodyParams, token: string) => {
  const queryParams = {
    page_size: bodyParam.page_size,
    page: bodyParam.page,
    ...(bodyParam.keyword ? { keyword: bodyParam.keyword } : {}),
    ...(bodyParam.status ? { status: bodyParam.status } : {}),
    ...(bodyParam.group_ids ? { group_ids: bodyParam.group_ids } : {}),
    ...(bodyParam.publish_date_from ? { publish_date_from: bodyParam.publish_date_from } : {}),
    ...(bodyParam.publish_date_to ? { publish_date_to: bodyParam.publish_date_to } : {}),
    ...(bodyParam.order_field ? { order_field: bodyParam.order_field } : {}),
    ...(bodyParam.types ? { types: bodyParam.types } : {}),
  };
  return (
    stdApiGET({ token, url: `${tasksAdminAggregatorUrl}${bodyParam.company_id}/exercises?${querystring.stringify(queryParams)}` })
  );
};
