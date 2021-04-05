import { stdApiGET } from 'src/store/defaultApi';
import { API } from 'src/constants/server';
import { ActivitiesTypes } from 'src/store/activities/types';
const querystring = require('querystring');

const activityUrl = `${API}aggregator/companies/`;

export const getActivitiesCount = (companyId: string, token: string) => {
  return stdApiGET({ token, url: `${activityUrl}${companyId}/activities_count` });
};

export const getActivities = (companyId: string, params: ActivitiesTypes.IQueryProps, token: string) => {
  const queryParams = {
    page: params.page,
    page_size: params.pageSize,
    ...(params.entityType ? { activity_type: params.entityType } : {}),
    ...(params.progress ? { progress: params.progress } : {}),
  };

  return stdApiGET({ token, url: `${activityUrl}${companyId}/activities?${querystring.stringify(queryParams)}` });
};
