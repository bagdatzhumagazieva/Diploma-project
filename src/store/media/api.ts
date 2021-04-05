import { stdApiGET, stdApiPOST, stdApiPUT } from 'src/store/defaultApi';
import { API } from 'src/constants/server';
import { MediaTypes } from 'src/store/media/types';
import { getQueryStringFromArray } from 'src/utils/format';

const mediaUrl = `${API}media/`;
const mediaCompanyUrl = `${mediaUrl}company/`;

export const uploadCompanyFile = (file: File, companyUuid: string, token: string) => (
  stdApiPOST({
    token,
    url: `${mediaCompanyUrl}${companyUuid}/files`,
    raw: file,
    rawHeader: 'file',
  })
);

export const getCompanyFiles = (params: MediaTypes.ICompanyFilesBodyParams, token: string) => (
  stdApiGET({ token, url: `${mediaCompanyUrl}${params.company_uuid}/files?type=${params.type}&ordering=${params.ordering}` })
);

export const uploadCompanyLogo = (file: File, coords: number[], companyUuid: string, token: string) => (
  stdApiPOST({
    token,
    url: `${mediaCompanyUrl}${companyUuid}/logo${getQueryStringFromArray(coords, 'coords')}`,
    raw: file,
    rawHeader: 'file',
  })
);

export const setCompanyLogo = (fileUuid: string, coords: number[], companyUuid: string, token: string) => (
  stdApiPUT({
    token,
    url: `${mediaCompanyUrl}${companyUuid}/logo/${fileUuid}${getQueryStringFromArray(coords, 'coords')}`,
  })
);

export const uploadCompanyBanner = (file: File, coords: number[], companyUuid: string, token: string) => (
  stdApiPOST({
    token,
    url: `${mediaCompanyUrl}${companyUuid}/banner${getQueryStringFromArray(coords, 'coords')}`,
    raw: file,
    rawHeader: 'file',
  })
);

export const setCompanyBanner = (fileUuid: string, coords: number[], companyUuid: string, token: string) => (
  stdApiPUT({
    token,
    url: `${mediaCompanyUrl}${companyUuid}/banner/${fileUuid}${getQueryStringFromArray(coords, 'coords')}`,
  })
);
