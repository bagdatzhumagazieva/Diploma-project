import { API } from 'src/constants/server';
import { stdApiGET } from 'src/store/defaultApi';

const getCompaniesUrl = `${API}companies/`;
const getAggregatorCompaniesUrl = `${API}aggregator/companies/`;

export const getCompanies = (token: string) => (
  stdApiGET({ token, url: getCompaniesUrl })
);

export const getCompanyAdmins = (company_id: number, token: string) => (
  stdApiGET({ token, url: `${API}companies/${company_id}/administrators` })
);

export const getCompanyById = (companyId: number, token: string) => (
  stdApiGET({ token, url: `${getCompaniesUrl}${companyId}` })
);

export const getCompanyExcel = (companyId: number, token: string) => (
  stdApiGET({ token, url: `${getCompaniesUrl}${companyId}/download_branches` })
);

export const getCompanyNews = (companyId: number, token: string) => (
  stdApiGET({ token, url: `${getAggregatorCompaniesUrl}${companyId}/news` })
);
