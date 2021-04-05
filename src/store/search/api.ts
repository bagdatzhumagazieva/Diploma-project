import { API } from 'src/constants/server';
import { stdApiGET } from 'src/store/defaultApi';
import { SearchTypes, TaskTypes } from 'src/store/search/types';

const getSearchUrl = `${API}search/`;

export const searchEmployees = (employee: SearchTypes.ISearchBodyParams, token: string) => (
  stdApiGET({ token, url: `${getSearchUrl}employment?keyword=${employee.keyword}&company_id=${employee.company_id}` })
);

export const searchTasks = (task: TaskTypes.ITaskBodyParams, token: string) => (
  stdApiGET({ token, url: `${getSearchUrl}exercise?keyword=${task.keyword}&company_id=${task.company_id}`})
);

export const searchGlobal = (token: string, companyId: number, keyword: string) => {
  return (
    stdApiGET({
      token,
      url: `${getSearchUrl}companies/${companyId}/global?keyword=${keyword}&page=1&page_size=100`})
  );
};
