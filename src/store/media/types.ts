export declare namespace MediaTypes {
  export interface IResponseProps {
    url: string;
    name: string;
    thumbnail: string;
    content_type: string;
    uuid: string;
    id: number;
  }

  export interface IRenderProps {
    url: string;
    uuid: string;
    thumbnail: string;
    contentType: string;
    name: string;
    id: number;
  }

  export interface ICompanyFilesBodyParams {
    company_uuid: string;
    type?: 'all' | 'image' | 'audio' | 'video' | 'other';
    ordering?: string;
  }
}

export const UPLOAD_COMPANY_FILE = {
  started: 'UPLOAD_COMPANY_FILE_START',
  success: 'UPLOAD_COMPANY_FILE_SUCCESS',
  failed: 'UPLOAD_COMPANY_FILE_FAILED',
};

export const UPLOAD_COMPANY_LOGO = {
  started: 'UPLOAD_COMPANY_LOGO_START',
  success: 'UPLOAD_COMPANY_LOGO_SUCCESS',
  failed: 'UPLOAD_COMPANY_LOGO_FAILED',
};

export const SET_COMPANY_LOGO = {
  started: 'SET_COMPANY_LOGO_START',
  success: 'SET_COMPANY_LOGO_SUCCESS',
  failed: 'SET_COMPANY_LOGO_FAILED',
};

export const UPLOAD_COMPANY_BANNER = {
  started: 'UPLOAD_COMPANY_BANNER_START',
  success: 'UPLOAD_COMPANY_BANNER_SUCCESS',
  failed: 'UPLOAD_COMPANY_BANNER_FAILED',
};

export const SET_COMPANY_BANNER = {
  started: 'SET_COMPANY_BANNER_START',
  success: 'SET_COMPANY_BANNER_SUCCESS',
  failed: 'SET_COMPANY_BANNER_FAILED',
};

export const GET_COMPANY_FILES = {
  started: 'GET_COMPANY_FILES_START',
  success: 'GET_COMPANY_FILES_SUCCESS',
  failed: 'GET_COMPANY_FILES_FAILED',
};
