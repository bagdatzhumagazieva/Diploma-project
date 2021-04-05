import { stdApiGET } from 'src/store/defaultApi';
import { API } from 'src/constants/server';
import QueryString from 'querystring';
import { TemplateTypes } from 'src/store/game/template/types';

const templateUrl = `${API}games/templates/`;

export const getTemplate = (token: string, companyId: number, params?: TemplateTypes.IQueryParams) => {
  const queryParams = {
    page: params?.page || 1,
    page_size: params?.pageSize || 20,
  };

  return stdApiGET({ token, url: `${templateUrl}?company_id=${companyId}&${QueryString.stringify(queryParams)}` });
};
