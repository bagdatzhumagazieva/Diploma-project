import { stdApiGET, stdApiPOST } from 'src/store/defaultApi';
import { API } from 'src/constants/server';
import { RatingTypes } from 'src/store/rate/types';

const ratingUrl = `${API}feedback/rating/`;

export const createRate = (companyId: number, data: RatingTypes.ICreateBody, token: string) => {
  const body = {
    entity_type: data.entityType,
    entity_uuid: data.entityUuid,
    value: data.value,
  };
  return stdApiPOST({ token, data: body, url: `${ratingUrl}?company_id=${companyId}` });
};

export const getMyRating = (companyId: number, uuid: string, token: string) => (
  stdApiGET({ token, url: `${ratingUrl}${uuid}/my?company_id=${companyId}` })
);
