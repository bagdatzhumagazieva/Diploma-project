import QueryString from 'querystring';
import { stdApiGET, stdApiPOST, stdApiPUT } from 'src/store/defaultApi';
import { API } from 'src/constants/server';
import { NotificationsTypes } from './types';

const notificationUrl = `${API}notifications/`;

export const getNotification = (companyId: string, params: NotificationsTypes.IQueryParams,  token: string) => {
  const queryParams = {
    ...(params.orderField ? { order_field: params.orderField } : {}),
    page: params.page || 1,
    page_size: params.page_size || 20,
    company_id: companyId,
  };
  return stdApiGET({
    token,
    url: `${notificationUrl}my?${QueryString.stringify(queryParams)}`,
  });
};

export const getNotificationUnread = (companyId: string, params: NotificationsTypes.IQueryParams, token: string) => {
  const queryParams = {
    ...(params.orderField ? { order_field: params.orderField } : {}),
    page: params.page || 1,
    page_size: params.page_size || 20,
    company_id: companyId,
    is_read: false,
  };
  return stdApiGET({
    token,
    url: `${notificationUrl}my?${QueryString.stringify(queryParams)}`,
  });
};

export const sendReadNotification = (companyId: string, id: number, token: string) => (
  stdApiPUT({
    token,
    url: `${notificationUrl}read?notification_ids=${id}&company_id=${companyId}`,
  })
);

export const sendFirebaseToken = (firebaseToken: string, companyId: number, token: string) => (
  stdApiPOST({ token, data: { token: firebaseToken }, url: `${notificationUrl}push_tokens/?company_id=${companyId}` })
);
