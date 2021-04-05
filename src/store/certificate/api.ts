import { stdApiGET } from 'src/store/defaultApi';
import { API } from 'src/constants/server';
import { CertificateTypes } from 'src/store/certificate/types';

const querystring = require('querystring');

export const getCertificates = (params: CertificateTypes.IQueryProps, token: string) => {
  const queryParams = {
    company_id: params.companyId,
    page: params.page || 1,
    page_size: params.pageSize || 20,
    ...(params.orderField ? { order_field: params.orderField } : {}),
  };

  return stdApiGET({ token, url: `${API}rewards/profiles/certificates?${querystring.stringify(queryParams)}` });
};

export const getCertificateById = (certificateId: number, token: string) => (
  stdApiGET({ token, url: `${API}rewards/certificates/${certificateId}` })
);

export const getCertificateDownload = (certificateId: number, token: string) => (
  stdApiGET({ token, url: `${API}rewards/certificates/${certificateId}/download` })
);
