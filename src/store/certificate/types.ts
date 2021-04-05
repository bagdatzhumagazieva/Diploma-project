export declare namespace CertificateTypes {
  export interface IResponseProps {
    name?: string;
    description?: string;
    user_id?: number;
    company_id?: number;
    employment_id?: number;
    is_expired?: boolean;
    expiration_date?: string;
    image_url?: string;
    image_thumbnail_url?: string;
    entity_image_thumbnail_url?: string;
    percent?: number;
    game_id?: number;
    course_id?: number;
    id?: number;
    uuid?: string;
    created_at?: string;
    entity_name?: string;
  }

  export interface IRenderProps {
    userName: string;
    description: string;
    userId: number;
    companyId: number;
    employmentId: number;
    isExpired: boolean;
    expirationDate: string;
    image: string;
    imageThumbnail: string;
    entityImageThumbnail: string;
    percent: number;
    gameId: number | null;
    courseId: number | null;
    id: number;
    uuid: string;
    createdDate: string;
    courseName: string;
  }

  export interface IQueryProps {
    companyId: number;
    page?: number;
    pageSize?: number;
    orderField?: string;
  }
}

export const GET_CERTIFICATES = {
  started: 'GET_CERTIFICATES_START',
  success: 'GET_CERTIFICATES_SUCCESS',
  failed: 'GET_CERTIFICATES_FAILED',
};

export const GET_CERTIFICATES_DOWNLOAD = {
  started: 'GET_CERTIFICATES_DOWNLOAD_START',
  success: 'GET_CERTIFICATES_DOWNLOAD_SUCCESS',
  failed: 'GET_CERTIFICATES_DOWNLOAD_FAILED',
};

export const GET_CERTIFICATE_BY_ID = {
  started: 'GET_CERTIFICATE_BY_ID_START',
  success: 'GET_CERTIFICATE_BY_ID_SUCCESS',
  failed: 'GET_CERTIFICATE_BY_ID_FAILED',
};
