import { combineReducers } from 'redux';
import { LOCAL_STORAGE } from 'src/core/store/values';
import { ActionType, ILoadTypes } from 'src/core/store/types';
import {
  CompaniesTypes,
  CompanyNews,
  GET_COMPANIES_BY_ID,
  GET_COMPANIES,
  SET_COMPANY_ID,
  GET_COMPANY_ADMINS,
  GET_COMPANY_NEWS,
} from './types';
import { EmploymentTypes } from 'src/store/employment/types';
import { parseEmployeesData } from 'src/store/employment/parsers';
import { parseCompanyNews, parseCompaniesData } from 'src/store/company/parsers';

const DEFAULT_STATE = { data: null, loading: false };

const companies = (state = DEFAULT_STATE, action: ActionType<CompaniesTypes.IResponseProps[]>) => {
  switch (action.type) {
    case GET_COMPANIES.started:
      return { ...DEFAULT_STATE };
    case GET_COMPANIES.failed:
      return {
        ...DEFAULT_STATE,
        errorMessage: action.errorMessage,
      };
    case GET_COMPANIES.success:
      if (!action.companies) {
        return { ...DEFAULT_STATE };
      }
      return {
        data: action.companies.map(company => parseCompaniesData(company)),
        loading: false,
      };
    default:
      return state;
  }
};

const admins = (
  state = DEFAULT_STATE,
  action: ActionType<EmploymentTypes.IResponseProps[]>,
): ILoadTypes<EmploymentTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case GET_COMPANY_ADMINS.started:
      return { data: null, loading: true };
    case GET_COMPANY_ADMINS.success:
      if (!action.admins) {
        return {
          data: null,
          loading: false,
        };
      }
      const { admins }  = action;
      const parsedAdmins = admins.map((n: EmploymentTypes.IResponseProps) => parseEmployeesData(n));
      return  {
        data: parsedAdmins,
        loading: false,
      };
    case GET_COMPANY_ADMINS.failed:
      return {
        ...DEFAULT_STATE,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

const companyId = (state = localStorage.getItem(LOCAL_STORAGE.COMPANY_ID) || '', action: any): string => {
  if (action.type === SET_COMPANY_ID) {
    if (!action.companyId) return state;
    return action.companyId;
  }
  return state;
};

const company = (
  state = { data: null, loading: true },
  action: ActionType<CompaniesTypes.IResponseProps>,
): ILoadTypes<CompaniesTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_COMPANIES_BY_ID.started:
      return {
        data: null,
        loading: true,
      };
    case GET_COMPANIES_BY_ID.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_COMPANIES_BY_ID.success:
      if (!action.company) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsed = parseCompaniesData(action.company);
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const news = (
  state = { data: null, loading: true },
  action: ActionType<CompanyNews.IResponseProps[]>,
): ILoadTypes<CompanyNews.IRenderProps[] | null> => {
  switch (action.type) {
    case GET_COMPANY_NEWS.started:
      return {
        data: null,
        loading: true,
      };
    case GET_COMPANY_NEWS.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_COMPANY_NEWS.success:
      if (!action.news) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsed = parseCompanyNews(action.news);
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const companyReducer = combineReducers({ company, admins, companies, companyId, news });

export default companyReducer;
