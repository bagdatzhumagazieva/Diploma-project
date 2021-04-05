import { IPaginationTypes } from 'src/core/store/types';

export declare namespace NotificationsTypes {
  export interface IResponseProps {
    company_id: number;
    created_at: string;
    email_address: null;
    employment_id: number;
    entity_id: null;
    entity_type: null | string;
    error_reason: null;
    id: number;
    is_read: boolean;
    notification_reason: string;
    notification_status: string;
    notification_type: string;
    phone: null;
    text: string;
    title: string;
    updated_at: string;
    user_id: number;
    uuid: string;
    sender: string;
  }

  export interface IRenderProps {
    date: string;
    isRead: boolean;
    id: number;
    title?: string;
    description?: string;
    isBattle?: boolean;
    from?: string;
    sender?: string;
    isFlag?: boolean;
    entityType?: string | null;
    notificationReason?: string;
    icon?: string;
  }

  export interface IQueryParams extends IPaginationTypes{
    orderField?: string;
  }
}

export const GET_NOTIFICATION = {
  started: 'GET_NOTIFICATION_START',
  success: 'GET_NOTIFICATION_SUCCESS',
  failed: 'GET_NOTIFICATION_FAILED',
};

export const GET_NOTIFICATION_UNREAD = {
  started: 'GET_NOTIFICATION_UNREAD_START',
  success: 'GET_NOTIFICATION_UNREAD_SUCCESS',
  failed: 'GET_NOTIFICATION_UNREAD_FAILED',
};

export const SEND_NOTIFICATION_READ = {
  started: 'SEND_NOTIFICATION_READ_START',
  success: 'SEND_NOTIFICATION_READ_SUCCESS',
  failed: 'SEND_NOTIFICATION_READ_FAILED',
};
