import { stdApiGET } from 'src/store/defaultApi';
import { API } from 'src/constants/server';
import { AchievementTypes } from 'src/store/achievement/types';
const querystring = require('querystring');

export const getAchievements = (companyId: string, params: AchievementTypes.IQueryProps, token: string) => {
  const queryParams = {
    company_id: companyId,
    page: params.page,
    page_size: params.pageSize,
    order_field: params.orderField,
  };

  return stdApiGET({ token, url: `${API}rewards/profiles/achievements?${querystring.stringify(queryParams)}` });
};

export const getAchievementsCount = (companyId: string, token: string) => {
  return stdApiGET({ token, url: `${API}aggregator/companies/${companyId}/achievements/progress_count` });
};
