import QueryString from 'querystring';
import { stdApiDELETE, stdApiGET, stdApiPOST, stdApiPUT } from 'src/store/defaultApi';
import { API } from 'src/constants/server';
import { CourseDetailTypes, CourseTypes } from 'src/store/course/types';
import {
  getCoursesSortType, convertCourseToUnderscore,
} from 'src/store/course/consts';

const coursesUrl = `${API}courses/`;
const coursesAggregatorUrl = `${API}aggregator/companies/`;

// Course CRUD
export const createCourse = (bodyParams: CourseTypes.IRenderProps, companyId: number, token: string) => (
    stdApiPOST({ token, data: convertCourseToUnderscore(bodyParams), url: coursesUrl })
);

export const updateCourse = (courseId: number, bodyParams: CourseTypes.IRenderProps, token: string) => (
  stdApiPUT({ token, data: convertCourseToUnderscore(bodyParams), url: `${coursesUrl}${courseId}` })
);

export const getCourse = (courseId: number, token: string) => (
  stdApiGET({ token, url: `${coursesUrl}${courseId}` })
);

export const deleteCourse = (courseId: number, token: string) => (
  stdApiDELETE({ token, url: `${coursesUrl}${courseId}` })
);

export const deleteCourses = (courseIds: number[], token: string) => {
  const queryParams = {
    course_ids: courseIds,
  };

  return stdApiDELETE({ token, url: `${coursesUrl}delete?${QueryString.stringify(queryParams)}` });
};

export const coursesToDraft = (courseIds: number[], token: string) => {
  const queryParams = {
    course_ids: courseIds,
  };
  return stdApiPUT({ token, data: courseIds, url: `${coursesUrl}draft?${QueryString.stringify(queryParams)}` });
};

export const coursesToPublish = (courseIds: number[], token: string) => {
  const queryParams = {
    course_ids: courseIds,
  };
  return stdApiPOST({ token, data: courseIds, url: `${coursesUrl}publish?${QueryString.stringify(queryParams)}` });
};

export const addCourseToFavorite = (courseId:number, token: string, companyId:number) => (
  stdApiPOST({ token, data: { course_id: courseId }, url: `${coursesUrl}favorite_courses/?company_id=${companyId}` })
);

export const deleteCourseFromFavorite = (courseId: number, token: string) => (
  stdApiDELETE({ token, url: `${coursesUrl}favorite_courses/${courseId}` })
);
// Aggregator
export const getDetailCourses = (companyId: string, params: CourseDetailTypes.IQueryProps, token: string, isPersonalCourses?: boolean) => {
  const queryParams = {
    ...(isPersonalCourses !== undefined ? { personal_courses: isPersonalCourses } : {}),
    ...(params.groupIds ? { group_ids: params.groupIds } : {}),
    ...(params.page ? { page: params.page } : {}),
    ...(params.pageSize ? { page_size: params.pageSize } : {}),
    ...(params.isFavorite ? { is_favorite: params.isFavorite } : {}),
    ...(params.isNew ? { is_new: params.isNew } : {}),
    ...(params.inProcess ? { in_process: params.inProcess } : {}),
    ...(params.isFinished ? { is_finished: params.isFinished } : {}),
    ...(params.sortByReward ? { sort_by_reward: params.sortByReward } : {}),
    ...(params.tagIds ? { tag_ids: params.tagIds } : {}),
  };

  return stdApiGET({ token, url: `${coursesAggregatorUrl}${companyId}/courses?${QueryString.stringify(queryParams)}` });
};

export const getDetailCourseInfo = (companyId: number, courseId: number, token: string) => (
  stdApiGET({ token, url: `${coursesAggregatorUrl}${companyId}/courses/${courseId}` })
);

export const getCourseStatistics = (courseId: number, params: CourseTypes.IStatisticsQuery, token: string) => {
  const queryParams = {
    ...(params.isAverageImportant ? { is_average_important: params.isAverageImportant } : { }),
    ...(params.isGroupsImportant ? { is_groups_important: params.isGroupsImportant } : { }),
    ...(params.isUserImportant ? { is_user_important: params.isUserImportant } : { }),
  };

  return stdApiGET(
    {
      token,
      url: `${API}aggregator/admin/companies/${params.companyId}/courses/${courseId}/statistics?${QueryString.stringify(queryParams)}`,
    });
};

export const getCourseModule = (companyId: number, moduleId: number, token: string) => (
  stdApiGET({ token, url: `${coursesAggregatorUrl}${companyId}/modules/${moduleId}` })
);

export const getCoursesByAdmin = (companyId: number, params: CourseDetailTypes.IAdminQuery, token: string) => {
  const queryParams = {
    page: params.page || 1,
    page_size: params.pageSize || 10,
    ...(params.groupIds ? { group_ids: params.groupIds } : {}),
    ...(params.status ? { status: params.status } : {}),
    ...(params.startTime ? { start_time: params.startTime } : {}),
    ...(params.endTime ? { end_time: params.endTime } : {}),
    ...(params.keyword ? { keyword: params.keyword } : {}),
    ...(params.orderField ? (getCoursesSortType(params.orderField, params.orderDirection === 'desc')) : {}),
  };

  return stdApiGET({ token, url: `${API}aggregator/admin/companies/${companyId}/courses?${QueryString.stringify(queryParams)}` });
};

export const getCourseByAdmin = (companyId: number, courseId: number, token: string) => (
  stdApiGET({ token, url: `${API}aggregator/admin/companies/${companyId}/courses/${courseId}` })
);

export const getCoursesCount = (companyId: number, token: string) => {
  return stdApiGET({ token, url: `${coursesUrl}count?company_id=${companyId}` })
};