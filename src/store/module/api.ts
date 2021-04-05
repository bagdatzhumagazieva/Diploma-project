import { stdApiDELETE, stdApiGET, stdApiPOST, stdApiPUT } from 'src/store/defaultApi';
import { API } from 'src/constants/server';
import { ModuleTypes } from 'src/store/module/types';

const moduleUrl = `${API}courses/`;

const convertToUnderScore = (moduleBody: ModuleTypes.IRenderProps, id?: number) => ({
  ...(id ? { id } : { }),
  name: moduleBody.name,
  description: moduleBody.description,
  image_url: moduleBody.image,
  image_thumbnail_url: moduleBody.imageThumbnail,
  is_active: true,
  order_index: moduleBody.orderIndex,
  card_ids: moduleBody.cardIds,
});

export const createModules = (courseId: number, bodyParams: ModuleTypes.IRenderProps[], token: string) => {
  const modulesBody = bodyParams.map(item => convertToUnderScore(item));
  return (
    stdApiPOST({ token, data: modulesBody, url: `${moduleUrl}${courseId}/modules` })
  );
};

export const updateModules = (courseId: number, bodyParams: ModuleTypes.IRenderProps[], token: string) => {
  const modulesBody = bodyParams.map(item => convertToUnderScore(item, +item.id));
  return (
    stdApiPUT({ token, data: modulesBody, url: `${moduleUrl}${courseId}/modules` })
  );
};

export const deleteModules = (courseId: number, moduleIds: number[], token: string) => (
  stdApiDELETE({ token, data: moduleIds, url: `${moduleUrl}${courseId}/modules` })
);

export const getModules = (courseId: number, companyId: number, token: string) => (
    stdApiGET({ token, url: `${moduleUrl}${courseId}/modules/?company_id=${companyId}` })
);
