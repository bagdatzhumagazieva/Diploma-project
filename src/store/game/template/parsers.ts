import { TemplateTypes } from 'src/store/game/template/types';

export const parseTemplateData = (data: any): TemplateTypes.ITemplate => ({
  id: data.id || -1,
  name: data.name || '',
  description: data.description || '',
  companyIds: data.company_ids,
  imageUrl: data.image_url,
  imageThumbnailUrl: data.image_thumbnail_url,
  engine: data.engine,
  width: data.width,
  height: data.height,
  createdAt: data.created_at,
  updatedAt: data.updated_at,
  uuid: data.uuid,
});
