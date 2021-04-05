import { stdApiDELETE, stdApiGET, stdApiPOST, stdApiPUT } from 'src/store/defaultApi';
import Querystring from 'querystring';

import { API } from 'src/constants/server';
import { ItemTypes, ShopPrizesTypes, ShopGamePrizeTypes, ShopOrderTypes, ShopAdminOrderTypes, ItemBuyerTypes } from 'src/store/item/types';
import { parseItemBody } from 'src/store/item/parsers';

const itemUrl = `${API}shop/items`;
const shopOrderUrl = `${API}shop/orders`;
const itemAggregatorUrl = `${API}aggregator/companies/`;

export const createItem = (bodyParams: ItemTypes.IBodyProps, companyId: number, token: string) => {
  const requestBody = parseItemBody(bodyParams);
  return (
    stdApiPOST({ token, data: requestBody, url: `${itemUrl}?company_id=${companyId}` })
  );
};

export const getItem = (companyId: any, itemId: number, token: string) => {
  const queryParams = {
    company_id: companyId,
  };
  return (
    stdApiGET({ token, url: `${itemUrl}/${itemId}?${Querystring.stringify(queryParams)}` })
  );
};

export const deleteItem = (companyId: number, itemId: number, token: string) => (
  stdApiDELETE({ token, url: `${itemUrl}/${itemId}?company_id=${companyId}` })
);

export const getAdminPrizes = (params: ShopPrizesTypes.IQueryProps, companyId: number, token: string) => {
  const queryParams = {
    page_size: params.page_size,
    page: params.page,
    ...(params.groupIds ? { group_ids: params.groupIds } : {}),
    ...(params.desc ? { desc: params.desc } : {}),
    ...(params.keyword ? { keyword: params.keyword } : {}),
    ...(params.sortBy ? { sort_by: params.sortBy } : {}),
  };
  return (
    stdApiGET({ token, url: `${itemAggregatorUrl}${companyId}/shop/admin?${Querystring.stringify(queryParams)}` })
  );
};

export const updateItem = (bodyParams: ItemTypes.IBodyProps, itemId: number, companyId: number, token: string) => {
  const requestBody = parseItemBody(bodyParams);
  const queryParams = {
    company_id: companyId,
  };
  return (
    stdApiPUT({ token, data: requestBody, url: `${itemUrl}/${itemId}?${Querystring.stringify(queryParams)}` })
  );
};

export const getPrizes = (params: ShopGamePrizeTypes.IQueryProps, token: string) => {
  const queryParams = {
    ...(params.page ? { page: params.page } : {}),
    ...(params.page_size ? { page_size: params.page_size } : {}),
    ...(params.categoryIds ? { category_ids: params.categoryIds } : {}),
    ...(params.desc ? { desc: params.desc } : {}),
    ...(params.filterGroups ? { filter_groups: params.filterGroups } : {}),
    ...(params.sortBy ? { sort_by: params.sortBy } : {}),
  };
  return (
    stdApiGET({ token, url: `${itemAggregatorUrl}${params.companyId}/shop?${Querystring.stringify(queryParams)}` })
  );
};

export const createShopOrder = (bodyParams: ShopOrderTypes.IBodyProps[], companyId: number, token: string) => {
  const requestBody = {
    item_orders: bodyParams.map(e => ({
      amount: e.amount,
      item_id: e.itemId,
    })),
  };
  return (
    stdApiPOST({ token, data: requestBody, url: `${shopOrderUrl}?company_id=${companyId}` })
  );
};

export const getMyOrders = (params: ShopOrderTypes.IQueryParams, token: string) => {
  const queryParams = {
    company_id: params.companyId,
    page: params.page,
    page_size: params.page_size,
    ...(params.status ? { status: params.status } : {}),
    ...(params.orderField ? { order_field: params.orderField } : {}),
  };
  return (
    stdApiGET({ token, url: `${API}shop/my_orders?${Querystring.stringify(queryParams)}` })
  );
};

export const getAdminOrders = (params: ShopAdminOrderTypes.IQueryParams, token: string) => {
  const queryParams = {
    page_size: params.page_size,
    page: params.page,
    ...(params.keyword ? { keyword: params.keyword } : {}),
    ...(params.status ? { status: params.status } : {}),
    ...(params.creationStartTime ? { creation_start_time: params.creationStartTime } : {}),
    ...(params.creationEndTime ? { creation_end_time: params.creationEndTime } : {}),
    ...(params.shippingStartTime ? { shipping_start_time: params.shippingStartTime } : {}),
    ...(params.shippingEndTime ? { shipping_end_time: params.shippingEndTime } : {}),
    ...(params.desc ? { desc: params.desc } : {}),
    ...(params.sortBy ? { sort_by: params.sortBy } : {}),
  };
  return (
    stdApiGET({
      token,
      url: `${itemAggregatorUrl}${params.companyId}/shop/orders?${Querystring.stringify(queryParams)}`,
    })
  );
};

export const getItemByAdmin = (companyId: number, itemId: number, token: string) => {
  return (
    stdApiGET({ token, url: `${itemAggregatorUrl}${companyId}/shop/admin/${itemId}` })
  );
};

export const getItemBuyers = (params: ItemBuyerTypes.IQueryProps, companyId: number, itemId: number, token: string) => {
  const queryParams = {
    ...(params.desc ? { desc: params.desc } : {}),
    ...(params.sortBy ? { sort_by: params.sortBy } : {}),
    ...(params.page ? { page: params.page } : {}),
    ...(params.pageSize ? { page_size: params.pageSize } : {}),
  };
  return (
    stdApiGET({ token, url: `${itemAggregatorUrl}${companyId}/shop/admin/${itemId}/buyers?${Querystring.stringify(queryParams)}` })
  );
};

export const getMyOrderStatus = (companyId: number, itemId: number, token: string) => {
  return (
    stdApiGET({ token, url: `${API}shop/my_orders/statuses?company_id=${companyId}` })
  );
};

export const updateOrder = (companyId: number, orderId: number, token: string) => {
  const requestBody = {
    status: 'FINISHED',
  };
  return (
    stdApiPUT({ token, data: requestBody, url: `${shopOrderUrl}/${orderId}?company_id=${companyId}` })
  );
};

export const getDetailShop = (companyId: number, shopId: number, token: string) => {
  return (
    stdApiGET({ token, url: `${itemAggregatorUrl}${companyId}/shop/${shopId}` })
  );
};
