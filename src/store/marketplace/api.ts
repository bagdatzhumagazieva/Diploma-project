import { API } from 'src/constants/server';
import { stdApiGET, stdApiPOST } from 'src/store/defaultApi';
import Querystring from 'querystring';
import { MarketplaceOrderTypes, MarketplaceItemTypes, MarketplaceCategoryTypes } from "src/store/marketplace/types";

const itemAggregatorUrl = `${API}aggregator/companies/`;
const categoriesUrl = `${API}marketplace/items/categories/`;

export const getMyOrders = (params: MarketplaceOrderTypes.IQueryParams, token: string) => {
  const queryParams = {
    company_id: params.companyId,
    page: params.page || 1,
    page_size: params.page_size || 20,
    ...(params.status ? { status: params.status } : {}),
    ...(params.orderField ? { order_field: params.orderField } : {}),
    ...(params.dateFrom ? { date_from: params.dateFrom } : {}),
    ...(params.dateTo ? { date_to: params.dateTo } : {}),
    ...(params.keyword ? { keyword: params.keyword } : {}),
  };
  return (
    stdApiGET({ token, url: `${API}marketplace/my_orders?${Querystring.stringify(queryParams)}` })
  );
};

export const getMarketplaceItems = (params: MarketplaceItemTypes.IQueryParams, token: string) => {
  const queryParams = {
    entity_type: params.entityType,
    page: params.page || 1,
    page_size: params.page_size || 16,
    ...(params.categoryId ? { category_id: params.categoryId } : {}),
    ...(params.sortBy ? { sort_by: params.sortBy } : {}),
    ...(params.desc ? { desc: params.desc } : {}),
  };
  return (
    stdApiGET({ token, url: `${itemAggregatorUrl}${params.companyId}/marketplace?${Querystring.stringify(queryParams)}` })
  );
};

export const getItemDetail = (companyId: number, itemId: number, token: string) => {
  return (
    stdApiGET({ token, url: `${itemAggregatorUrl}${companyId}/marketplace/${itemId}` })
  );
};

export const createOrder = (bodyParams: MarketplaceOrderTypes.IBodyParams, companyId: number, token: string) => {
  const requestBody = {
    amount: bodyParams.amount,
    item_id: bodyParams.itemId,
  };
  return (
    stdApiPOST({ token, data: requestBody, url: `${API}marketplace/orders?company_id=${companyId}` })
  );
};

export const getFilterCategories = (params: MarketplaceCategoryTypes.IQueryParams, token: string) => {
  const queryParams = {
    type: params.type,
    company_id: params.companyId,
  };
  return (
    stdApiGET({ token, url: `${categoriesUrl}?${Querystring.stringify(queryParams)}` })
  );
};